
const usersUrl = "http://localhost:3000/User";
const indexUrl = "http://127.0.0.1:5500/index.html";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}
class Authentication {
    private usersUrl: string;
    private indexUrl: string;
  
    constructor(usersUrl: string, indexUrl: string) {
      this.usersUrl = usersUrl;
      this.indexUrl = indexUrl;
    }
  
    async signup(username: string, email: string, password: string): Promise<void> {
      const newUser = { username, email, password };
  
      try {
        const response = await fetch(this.usersUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
  
        if (response.ok) {
          console.log("User added successfully:", await response.json());
          alert("Sign up successful! You can now login.");
          window.location.href = "login.html";
        } else {
          console.error("Error adding user:", response.statusText);
          alert("Error adding user. Please try again later.");
        }
      } catch (error) {
        console.error("Error signing up:", error);
        alert("Error signing up. Please try again later.");
      }
    }
  
    async login(username: string, password: string): Promise<void> {
      try {
        const response = await fetch(this.usersUrl);
        const users: User[] = await response.json();
  
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
  
        if (user) {
          // Login successful
          alert("Login successful!");
          setTimeout(() => {
            window.location.href = this.indexUrl;
          }, 3000);
        } else {
          // Username or password incorrect
          alert("Invalid username or password");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error fetching users. Please try again later.");
      }
    }
  }
  
  const auth = new Authentication("http://localhost:3000/User", "http://127.0.0.1:5500/index.html");
  
  const signupForm = document.getElementById("signupform") as HTMLFormElement;
  signupForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
  
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
  
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
  
    await auth.signup(username, email, password);
  });

// const loginForm = document.getElementById("loginform") as HTMLFormElement;
// loginForm.addEventListener("submit", async (e: Event) => {
//   e.preventDefault();

//   const usernameInput = document.getElementById("login-username") as HTMLInputElement;
//   const passwordInput = document.getElementById("login-password") as HTMLInputElement;

//   const username = usernameInput.value;
//   const password = passwordInput.value;

//   await auth.login(username, password);
// });
const loginForm = document.getElementById("loginform") as HTMLFormElement
loginForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
  
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
  
    const username = usernameInput.value;
    const password = passwordInput.value;
  
    const existingUser = {
      username,
      password,
    };
  
    try {
      const response = await fetch(usersUrl);
      const users: User[] = await response.json();
  
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
  
      if (user) {
        // Login successful
        alert("Login successful!");
        window.location.href = indexUrl;
        // setTimeout(() => {
        //   window.location.href = indexUrl;
        // }, 3000);
      } else {
        // Username or password incorrect
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error fetching users. Please try again later.");
    }
  });
  

  
  