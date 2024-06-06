const hotelUrl="http://localhost:3000/Hotel"
// Interface for Hotel
interface Hotel {
    id: number;
    image: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
}

// Class to handle fetching and displaying hotels
class HotelManager {
    private hotelUrl: string;

    constructor(hotelUrl: string) {
        this.hotelUrl = hotelUrl;
        this.fetchAndDisplayHotels();
        this.setupHotelForm();
    }

    // Fetch hotels data from the server and display them
    private fetchAndDisplayHotels(): void {
        fetch(this.hotelUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch hotels");
                }
                return response.json();
            })
            .then((hotels: Hotel[]) => {
                this.displayHotels(hotels);
            })
            .catch((error: Error) => {
                console.error("Error fetching hotels:", error);
            });
    }

    // Display hotels on the page
    private displayHotels(hotels: Hotel[]): void {
        const hotelList = document.getElementById('hotel-list') as HTMLElement;
        let html = "";
        hotels.forEach((hotel: Hotel) => {
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
    private getStarsHtml(rating: number): string {
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

    private setupHotelForm(): void {
        const form = document.getElementById('add-hotel-form') as HTMLFormElement;
        form.addEventListener('submit', this.handleHotelFormSubmit.bind(this));
    }

    private handleHotelFormSubmit(event: Event): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const hotelData: Partial<Hotel> = {};
        
        for (const [key, value] of formData.entries()) {
            switch (key) {
                case 'image':
                case 'name':
                case 'location':
                    hotelData[key as keyof Hotel] = value as string;
                    break;
                case 'rating':
                case 'reviews':
                    hotelData[key as keyof Hotel] = parseFloat(value as string);
                    break;
                default:
                    break;
            }
        }
        
        this.addHotel(hotelData as Hotel);
        form.reset();
    }

    private addHotel(hotelData: Partial<Hotel>): void {
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
            .catch((error: Error) => {
                console.error("Error adding hotel:", error);
            });
    }
}

// Initialize HotelManager with the hotel URL
const hotelManager = new HotelManager("http://localhost:3000/Hotel");
