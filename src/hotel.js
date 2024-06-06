"use strict";
const hotelUrl = "http://localhost:3000/Hotel";
// Class to handle fetching and displaying hotels
class HotelManager {
    constructor(hotelUrl) {
        this.hotelUrl = hotelUrl;
        this.fetchAndDisplayHotels();
        this.setupHotelForm();
    }
    // Fetch hotels data from the server and display them
    fetchAndDisplayHotels() {
        fetch(this.hotelUrl)
            .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch hotels");
            }
            return response.json();
        })
            .then((hotels) => {
            this.displayHotels(hotels);
        })
            .catch((error) => {
            console.error("Error fetching hotels:", error);
        });
    }
    // Display hotels on the page
    displayHotels(hotels) {
        const hotelList = document.getElementById('hotel-list');
        let html = "";
        hotels.forEach((hotel) => {
            const starsHtml = this.getStarsHtml(hotel.rating);
            html += `
                <li class="hotel">
                    <img src="${hotel.image}" alt="${hotel.name}">
                    <div class="hotel-details">
                        <h2 class="hotel-name">${hotel.name}</h2>
                        <p class="hotel-location">${hotel.location}</p>
                        <div class="star-rating">
                            ${starsHtml}
                            <span>${hotel.rating} (${hotel.reviews} reviews)</span>
                        </div>
                    </div>
                    <button id="bookhotelbtn"><a href="./bookings.html">BOOK HOTEL</a></button>                  
                </li>`;
        });
        hotelList.innerHTML = html;
    }
    // Generate star rating HTML based on the rating value
    getStarsHtml(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        let starsHtml = "";
        for (let i = 0; i < fullStars; i++) {
            starsHtml += `<img src="./images/star.png" alt="Star">`;
        }
        if (halfStar) {
            starsHtml += `<img src="./images/half-star.png" alt="Half Star">`;
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += `<img src="./images/empty-star.png" alt="Empty Star">`;
        }
        return starsHtml;
    }
    setupHotelForm() {
        const form = document.getElementById('add-hotel-form');
        form.addEventListener('submit', this.handleHotelFormSubmit.bind(this));
    }
    handleHotelFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const hotelData = {};
        for (const [key, value] of formData.entries()) {
            switch (key) {
                case 'image':
                case 'name':
                case 'location':
                    hotelData[key] = value;
                    break;
                case 'rating':
                case 'reviews':
                    hotelData[key] = parseFloat(value);
                    break;
                default:
                    break;
            }
        }
        this.addHotel(hotelData);
        form.reset();
    }
    addHotel(hotelData) {
        fetch(this.hotelUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hotelData),
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add hotel");
            }
            return response.json();
        })
            .then(() => {
            // Refresh the hotel list after adding a new hotel
            this.fetchAndDisplayHotels();
        })
            .catch((error) => {
            console.error("Error adding hotel:", error);
        });
    }
}
// Initialize HotelManager with the hotel URL
const hotelManager = new HotelManager("http://localhost:3000/Hotel");
