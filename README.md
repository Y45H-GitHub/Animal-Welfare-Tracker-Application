# Animal Welfare Website

An animal welfare platform that enables users to report stray animals and view their details. The site provides a  interface to register stray animals' details, integrated with Google Maps for geolocation functionality.
YouTube Demo : https://youtu.be/adf_QWzhnDY
---

## Features
- **Index Page**: Displays a summary of reported animals.
  ![image](https://github.com/user-attachments/assets/87f107bd-8d1e-4528-bcee-bcff5850cf1a)

- **Animals Page**: Provides a detailed view of reported animals, including their names, images, breed, and last seen location. Includes a mini-map showing the exact location of each reported animal.
  ![image](https://github.com/user-attachments/assets/99aea7ed-7ea7-4b87-abff-91801a8bb86e)

- **Report Animal Page**: Allows users to report a stray animal by submitting:
  ![image](https://github.com/user-attachments/assets/c3cee2f8-95f0-4e59-a5ff-949a016e7bbe)

  - Last seen location (converted to latitude and longitude using Google Maps API).
  - Image URL of the animal.
  - Name of the animal (user can name them if they want).
  - Breed of the animal (stray , default is "NA").
  - Contains a mini map with pop up cards of reported animals based on the locaiton.

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
- **Google Maps API**: 
  - Used to convert addresses to geographical coordinates (latitude and longitude) 
  - Display the location on the map.
---
 Note make sure to replace the API key with your Google Maps JavaScript API key and enable the Geolocation API feature in it.
API key used in these files: animals.js , report_animal.html , report_animal.js
---
Future Updates : Collaborate with animal shelters and hospitals to fully utilize the website.
