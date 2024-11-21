# Animal Welfare Website

An animal welfare platform that enables users to report stray animals and view their details. The site provides a seamless interface to register stray animals' details, integrated with Google Maps for geolocation functionality.

---

## Features
- **Index Page**: Displays a summary of reported animals.
- **Animals Page**: Provides a detailed view of reported animals, including their names, images, breed, and last seen location. Includes a mini-map showing the exact location of each reported animal.
- **Report Animal Page**: Allows users to report a stray animal by submitting:
  - Last seen location (converted to latitude and longitude using Google Maps API).
  - Image URL of the animal.
  - Name of the animal (user can name them if they want).
  - Breed of the animal (stray , default is "NA").

---

## Technology Stack
### Frontend
- **HTML**
- **CSS**
- **JavaScript**

### Backend
- **Spring Boot**

### Database
- **MySQL**

### APIs
- **Google Maps API**: Used to convert addresses to geographical coordinates (latitude and longitude) and display the location on the map.
