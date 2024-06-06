document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("loginform") as HTMLFormElement;
    const usersUrl = "http://localhost:3000/User";
    const indexUrl = "http://127.0.0.1:5500/index.html";
    
    interface User {
      id: number;
      username: string;
      email: string;
      password: string;
    }
    
    loginForm.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
      
        const usernameInput = document.getElementById("username") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;
      
        const username = usernameInput.value;
        const password = passwordInput.value;
      
        try {
          const response = await fetch(usersUrl);
          const users: User[] = await response.json();
      
          const user = users.find(
            (user) => user.username === username && user.password === password
          );
          
          const admin = users.find(
            (admin) => admin.username === 'admin' && admin.password === '123456'
          );

          if (admin) {
            // Admin login successful
            alert("Admin login successful!");
            window.location.href = "admin.html";
            return;
          }
      
          if (user) {
            // Regular user login successful
            alert("Login successful!");
            setTimeout(() => {
              window.location.href = indexUrl;
            }, 2000);
          } else {
            // Username or password incorrect
            alert("Invalid username or password");
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          alert("Error fetching users. Please try again later.");
        }
    });
});
