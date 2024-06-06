const toursUrl = "http://localhost:3000/Tour"
// Interface 
interface Tour {
  id: number;
  image: string;
  name: string;
  destination: string;
  description: string;
  price: string;
}

// Class for managing tours
class TourManager {
  private toursUrl: string;

  constructor(toursUrl: string) {
      this.toursUrl = toursUrl;
      this.fetchAndDisplayTours();
      this.setupForm();
  }

  private fetchAndDisplayTours(): void {
      fetch(this.toursUrl)
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Failed to fetch tours");
              }
              return response.json();
          })
          .then((tours: Tour[]) => {
              const tourList = document.getElementById('tour-list') as HTMLElement;
              let html = "";
              tours.forEach((tour: Tour) => {
                  html += this.createTourHtml(tour);
              });
              tourList.innerHTML = html;
          })
          .catch((error: Error) => {
              console.error("Error fetching tours:", error);
          });
  }

  private setupForm(): void {
      const form = document.getElementById('add-tour-form') as HTMLFormElement;
      form.addEventListener('submit', this.handleFormSubmit.bind(this));
  }

  
  private handleFormSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const tourData: Partial<Tour> = {};
    
    // Loop through form data entries
    for (const [key, value] of formData.entries()) {
        switch (key) {
            case 'image':
            case 'name':
            case 'destination':
            case 'description':
            case 'price':
                tourData[key as keyof Tour] = value as string;
                break;
            default:
                
                break;
        }
    }
    
    this.addTour(tourData as Tour);
}

  private addTour(tourData: Partial<Tour>): void {
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
              
              const form = document.getElementById('add-tour-form') as HTMLFormElement;
              form.reset();
          })
          .catch((error: Error) => {
              console.error("Error adding tour:", error);
          });
  }
  

  private createTourHtml(tour: Tour): string {
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
function viewHotels(): void {
  window.location.href = "./hotels.html";
}

// Create an instance of TourManager and pass the tours URL
const tourManager = new TourManager("http://localhost:3000/Tour");
