lucide.createIcons();

const apiUrl = "http://localhost:8080/api/all";
let animals = []; // Array to store the fetched animals

// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const feedingFilter = document.getElementById('feedingFilter');
const animalsGrid = document.getElementById('animalsGrid');



// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fetch animals from backend
async function fetchAnimals() {
    try {
        const response = await fetch("http://localhost:8080/api/all");
        if (response.ok) {
            animals = await response.json();
            renderAnimals(); // Render animals once fetched
        } else {
            console.error("Error fetching animals:", response.statusText);
        }
    } catch (error) {
        console.error("Failed to fetch animals:", error);
    }
}

// Filter animals based on search and filters
function filterAnimals() {
    const searchQuery = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    const feedingValue = feedingFilter.value;

    return animals.filter(animal => {
        const matchesSearch = 
            animal.name.toLowerCase().includes(searchQuery) ||
            animal.breed.toLowerCase().includes(searchQuery) ||
            animal.location.toLowerCase().includes(searchQuery);

        const matchesStatus = 
            statusValue === 'all' || animal.status === statusValue;

        const matchesFeeding = 
            feedingValue === 'all' ||
            (feedingValue === 'fed' && animal.fedToday) ||
            (feedingValue === 'unfed' && !animal.fedToday);

        return matchesSearch && matchesStatus && matchesFeeding;
    });
}

// Create HTML for an animal card
function createAnimalCard(animal) {
    const statusClass = {
        available: 'status-available',
        pending: 'status-pending',
        adopted: 'status-adopted'
    }[animal.status];

    return `
        <div class="animal-card">
            <div class="animal-image">
                <img src="${animal.imageUrl}" alt="${animal.name}">
                <span class="status-badge ${statusClass}">
                    ${animal.status.charAt(0).toUpperCase() + animal.status.slice(1)}
                </span>
            </div>
            <div class="animal-info">
                <h3>${animal.name}</h3>
                <p class="breed">${animal.breed}</p>
                <div class="animal-meta">
                    <div class="meta-item">
                        <i data-lucide="map-pin"></i>
                        <span>${animal.location}</span>
                    </div>
                    <div class="meta-item">
                        <i data-lucide="clock"></i>
                        <span>Last fed: ${new Date(animal.lastFed).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button 
                        class="btn btn-feed" 
                        ${animal.fedToday ? 'disabled' : ''} 
                        onclick="handleFeed('${animal.id}')">
                        ${animal.fedToday ? 'Fed Today' : 'Mark as Fed'}
                    </button>
                    ${animal.status === 'available' ? `
                        <button 
                            class="btn btn-adopt" 
                            onclick="handleAdopt('${animal.id}')">
                            <i data-lucide="heart"></i>
                            Adopt
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Render animals to the grid
function renderAnimals() {
    const filteredAnimals = filterAnimals();

    // Clear the grid before adding new content
    animalsGrid.innerHTML = ''; 

    filteredAnimals.forEach(animal => {
        animalsGrid.innerHTML += createAnimalCard(animal); // Append new animal card
    });

    // Reinitialize icons for new content
    lucide.createIcons(); // Reinitialize lucide icons for new content
}

// Event handlers
async function handleFeed(id) {
    const animal = animals.find(a => a.id === id);
    if (animal && !animal.fedToday) {
        animal.fedToday = true;
        animal.lastFed = new Date().toISOString();

        // Update feeding status in the backend
        try {
            const response = await fetch(`http://localhost:8080/api/feed/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fedToday: true, lastFed: animal.lastFed }),
            });

            if (response.ok) {
                renderAnimals(); // Re-render animals after feeding
            } else {
                console.error("Failed to update feeding status:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating feeding status:", error);
        }
    }
}

async function handleAdopt(id) {
    const animal = animals.find(a => a.id === id);
    if (animal && animal.status === 'available') {
        animal.status = 'pending';

        // Update adoption status in the backend
        try {
            const response = await fetch(`http://localhost:8080/api/adopt/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'pending' }),
            });

            if (response.ok) {
                renderAnimals(); // Re-render animals after adoption
            } else {
                console.error("Failed to update adoption status:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating adoption status:", error);
        }
    }
}

// Event listeners
searchInput.addEventListener('input', renderAnimals);
statusFilter.addEventListener('change', renderAnimals);
feedingFilter.addEventListener('change', renderAnimals);

// Initial fetch of animals
fetchAnimals();

