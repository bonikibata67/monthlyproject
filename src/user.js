"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const usersUrl = "http://localhost:3000/User";
const indexUrl = "http://127.0.0.1:5500/index.html";
class Authentication {
    constructor(usersUrl, indexUrl) {
        this.usersUrl = usersUrl;
        this.indexUrl = indexUrl;
    }
    signup(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = { username, email, password };
            try {
                const response = yield fetch(this.usersUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                });
                if (response.ok) {
                    console.log("User added successfully:", yield response.json());
                    alert("Sign up successful! You can now login.");
                    window.location.href = "login.html";
                }
                else {
                    console.error("Error adding user:", response.statusText);
                    alert("Error adding user. Please try again later.");
                }
            }
            catch (error) {
                console.error("Error signing up:", error);
                alert("Error signing up. Please try again later.");
            }
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.usersUrl);
                const users = yield response.json();
                const user = users.find((user) => user.username === username && user.password === password);
                if (user) {
                    // Login successful
                    alert("Login successful!");
                    setTimeout(() => {
                        window.location.href = this.indexUrl;
                    }, 3000);
                }
                else {
                    // Username or password incorrect
                    alert("Invalid username or password");
                }
            }
            catch (error) {
                console.error("Error fetching users:", error);
                alert("Error fetching users. Please try again later.");
            }
        });
    }
}
const auth = new Authentication("http://localhost:3000/User", "http://127.0.0.1:5500/index.html");
const signupForm = document.getElementById("signupform");
signupForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    yield auth.signup(username, email, password);
}));
// const loginForm = document.getElementById("loginform") as HTMLFormElement;
// loginForm.addEventListener("submit", async (e: Event) => {
//   e.preventDefault();
//   const usernameInput = document.getElementById("login-username") as HTMLInputElement;
//   const passwordInput = document.getElementById("login-password") as HTMLInputElement;
//   const username = usernameInput.value;
//   const password = passwordInput.value;
//   await auth.login(username, password);
// });
const loginForm = document.getElementById("loginform");
loginForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const username = usernameInput.value;
    const password = passwordInput.value;
    const existingUser = {
        username,
        password,
    };
    try {
        const response = yield fetch(usersUrl);
        const users = yield response.json();
        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
            // Login successful
            alert("Login successful!");
            window.location.href = indexUrl;
            // setTimeout(() => {
            //   window.location.href = indexUrl;
            // }, 3000);
        }
        else {
            // Username or password incorrect
            alert("Invalid username or password");
        }
    }
    catch (error) {
        console.error("Error fetching users:", error);
        alert("Error fetching users. Please try again later.");
    }
}));
