document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.getElementById("animalCards");
    const API_URL = "http://localhost:8080/api/all"; 

    const API_KEY = "AIzaSyCNixADahD0nxPF_1tFF3tRMVLmTYJ903s"; // YOUR GOOGLE MAPS JS API KEY HERE

    try {
        // Fetch animals from the backend
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch animals: ${response.status}`);
        }
        const animals = await response.json();

        // Render each animal as a card
        animals.forEach((animal) => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
    <div class="new_animal-card">
        <div class="neww_animal-info">
            <img class="neww_animal-image" src="${animal.imageUrl}" alt="${animal.name}">
            
            <h3>${animal.name}</h3>
            <p><strong>Breed:</strong> ${animal.breed}</p>
            <p><strong>Location:</strong> ${animal.location}</p>
            <p><strong>Reported By:</strong> ${animal.reportedBy}</p>
            
            <div class="new_card-footer">
                <p><strong>Status:</strong> ${animal.status}</p>
            </div>
        </div>
        
        <div class="new_map-container">
            <iframe 
                class="new_map-frame"
                src="https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${animal.lat},${animal.lng}&zoom=14"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
    </div>
`;


            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching animals:", error);
        cardsContainer.innerHTML = `<p class="error">Unable to load animals. Please try again later.</p>`;
    }
});
