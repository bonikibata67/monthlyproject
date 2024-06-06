"use strict";
const toursUrl = "http://localhost:3000/Tour";
// Class for managing tours
class TourManager {
    constructor(toursUrl) {
        this.toursUrl = toursUrl;
        this.fetchAndDisplayTours();
        this.setupForm();
    }
    fetchAndDisplayTours() {
        fetch(this.toursUrl)
            .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch tours");
            }
            return response.json();
        })
            .then((tours) => {
            const tourList = document.getElementById('tour-list');
            let html = "";
            tours.forEach((tour) => {
                html += this.createTourHtml(tour);
            });
            tourList.innerHTML = html;
        })
            .catch((error) => {
            console.error("Error fetching tours:", error);
        });
    }
    setupForm() {
        const form = document.getElementById('add-tour-form');
        form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const tourData = {};
        // Loop through form data entries
        for (const [key, value] of formData.entries()) {
            switch (key) {
                case 'image':
                case 'name':
                case 'destination':
                case 'description':
                case 'price':
                    tourData[key] = value;
                    break;
                default:
                    break;
            }
        }
        this.addTour(tourData);
    }
    addTour(tourData) {
        fetch(this.toursUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tourData),
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add tour");
            }
            return response.json();
        })
            .then(() => {
            this.fetchAndDisplayTours();
            const form = document.getElementById('add-tour-form');
            form.reset();
        })
            .catch((error) => {
            console.error("Error adding tour:", error);
        });
    }
    createTourHtml(tour) {
        return `
          <li class="Tour">
              <img src="${tour.image}" alt="${tour.name}">
              <h2>${tour.name}</h2>
              <h3>${tour.destination}</h3>
              <p>${tour.description}</p>
              <p>Price: ${tour.price}</p>
              <button id="hotelbtn" onclick="viewHotels()">View Accommodation</button>
              <button id="bookbtn"><a href="./bookings.html">BOOK TOUR</a></button>
          </li>`;
    }
}
// Function to view hotels
function viewHotels() {
    window.location.href = "./hotels.html";
}
// Create an instance of TourManager and pass the tours URL
const tourManager = new TourManager("http://localhost:3000/Tour");
