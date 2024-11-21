lucide.createIcons();

document.getElementById("reportForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const animalName = document.getElementById("animalName").value.trim();
    const breed = document.getElementById("breed").value.trim();
    const location = document.getElementById("location").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();
    const reporterName = document.getElementById("reporterName").value.trim();

    // YOUR GOOGLE MAPS JS API KEY HERE
    const API_KEY = "AIzaSyCNixADahD0nxPF_1tFF3tRMVLmTYJ903s";

    try {
        // Convert location to lat/lng using Geocoding API
        const geocodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${API_KEY}`);
        
        if (!geocodeResponse.ok) {
            throw new Error(`Failed to fetch geocode data: ${geocodeResponse.status}`);
        }

        const geocodeData = await geocodeResponse.json();

        if (geocodeData.status !== "OK" || geocodeData.results.length === 0) {
            throw new Error("Invalid location provided or no results found.");
        }

        // Extract latitude and longitude
        const { lat, lng } = geocodeData.results[0].geometry.location;

        // Prepare the data payload
        const animalData = {
            name: animalName,
            breed: breed,
            location: location,
            lat: lat,
            lng: lng,
            imageUrl: imageUrl, // Ensure this matches backend field names
            fedToday: false, // Ensure this matches backend field names
            lastFed: null,
            status: "reported",
            reportedBy: reporterName,
            reportedAt: null // Will be set by the backend
        };

        // Send data to the backend
        const response = await fetch("http://localhost:8080/api/animals/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(animalData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const savedAnimal = await response.json();
        alert(`Animal reported successfully! ID: ${savedAnimal.id}`);
        document.getElementById("reportForm").reset(); // Reset the form
    } catch (error) {
        console.error("Error reporting animal:", error);
        alert("Failed to report the animal. Please try again.");
    }
});


// Google Maps initialization
let map, geocoder, marker;

// Initialize the map and add existing animal markers
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 22.572645, lng: 88.363892 },
        zoom: 13,
    });

    geocoder = new google.maps.Geocoder();
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
    });

    // Fetch existing animals and add markers
    fetchExistingAnimals();

    // Update map on location input change
    document.getElementById("location").addEventListener("input", async (event) => {
        const location = event.target.value;
        if (location.length > 3) {
            try {
                const geocodeResponse = await geocoder.geocode({ address: location });
                if (geocodeResponse.results && geocodeResponse.results.length > 0) {
                    const { lat, lng } = geocodeResponse.results[0].geometry.location;
                    map.setCenter({ lat: lat(), lng: lng });
                    marker.setPosition({ lat: lat(), lng: lng });
                }
            } catch (error) {
                console.error("Geocoding error:", error);
            }
        }
    });
}

// Fetch existing animals from the backend
async function fetchExistingAnimals() {
    try {
        const response = await fetch("http://localhost:8080/api/all"); // Adjust endpoint
        if (!response.ok) {
            throw new Error(`Failed to fetch animals: ${response.status}`);
        }

        const animals = await response.json();

        animals.forEach((animal) => {
            const animalMarker = new google.maps.Marker({
                position: { lat: animal.lat, lng: animal.lng },
                map: map,
                title: animal.name,
            });

            // Add info window (popup card) to the marker
            const infoWindow = new google.maps.InfoWindow({
                content: createAnimalCard(animal),
            });

            animalMarker.addListener("click", () => {
                infoWindow.open(map, animalMarker);
            });
        });
    } catch (error) {
        console.error("Error fetching animals:", error);
    }
}

// Create popup card HTML for an animal
function createAnimalCard(animal) {
    return `
        <div class="neww_animal-card">
            <h3>${animal.name}</h3>
            <p><strong>Breed:</strong> ${animal.breed || "Unknown"}</p>
            <p><strong>Location:</strong> ${animal.location}</p>
            <img src="${animal.imageUrl || "placeholder.jpg"}" alt="${animal.name}" style="width: 100%; max-height: 150px; object-fit: cover; margin-top: 10px;">
            <p><strong>Reported By:</strong> ${animal.reportedBy || "Anonymous"}</p>
            <p><strong>Status:</strong> ${animal.status}</p>
        </div>
    `;
}
