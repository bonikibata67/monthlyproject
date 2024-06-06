const bookingsUrl: string = "http://localhost:3000/Booking";

interface Booking {
    id: number;
    user: string;
    tour: string;
    hotel: string;
    bookingdate: string;
}

class BookingManager {
    private readonly bookingsUrl: string;

    constructor(bookingsUrl: string) {
        this.bookingsUrl = bookingsUrl;
        this.displayBookings();
        this.displayCurrentUser(); // Call method to display current user
    }

    private displayBookings(): void {
        fetch(this.bookingsUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                return response.json();
            })
            .then((bookings: Booking[]) => {
                const bookingList = document.getElementById("booking-list") as HTMLElement;
                let html = "";
                bookings.forEach((booking: Booking) => {
                    html += `
                        <li class="Booking">
                            <h5>User:<br> ${booking.user}</h5>
                            <h6>Tour: <br>  ${booking.tour}</h6>
                            <h6>Hotel:<br>  ${booking.hotel}</h6>
                            <p>Date: <br> ${booking.bookingdate}</p> 
                            <button id="home"><a href="./index.html">HOME</a></button>                
                        </li>
                    `;
                });
                bookingList.innerHTML = html;
            })
            .catch((error: Error) => {
                console.error("Error fetching bookings:", error);
            });
    }

    private displayCurrentUser(): void {
        // Assuming the username is stored in localStorage after successful login
        const currentUser = localStorage.getItem("username");
        if (currentUser) {
            const currentUserElement = document.getElementById("current-user");
            if (currentUserElement) {
                currentUserElement.textContent = `Welcome, ${currentUser}`;
            }
        }
    }

    public addBooking(booking: Booking): Promise<void> {
        return fetch(this.bookingsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add booking');
                }
            });
    }

    public handleBooking(event: Event): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const tourInput = form.elements.namedItem('tour') as HTMLInputElement;
        const hotelInput = form.elements.namedItem('hotel') as HTMLInputElement;
        const dateInput = form.elements.namedItem('date') as HTMLInputElement;

        const user = localStorage.getItem("username") || 'YourUserName';
        const tour = tourInput.value;
        const hotel = hotelInput.value;
        const date = dateInput.value;

        const booking: Booking = {
            id: 0, // This should be assigned on the server side
            user,
            tour,
            hotel,
            bookingdate: date,
        };

        this.addBooking(booking)
            .then(() => {
                alert('Booking added successfully!');
                form.reset();
            })
            .catch(error => {
                console.error('Error adding booking:', error);
                alert('Failed to add booking. Please try again later.');
            });
    }

    public addEventListeners(): void {
     
        const bookingForm = document.getElementById('booking-form') as HTMLFormElement;

        if (bookingForm) {
            bookingForm.addEventListener('submit', this.handleBooking.bind(this));
        }
        
    }
}

const bookingManager = new BookingManager(bookingsUrl);
bookingManager.addEventListeners();
