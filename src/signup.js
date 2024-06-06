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
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("loginform");
    const usersUrl = "http://localhost:3000/User";
    const indexUrl = "http://127.0.0.1:5500/index.html";
    loginForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        const username = usernameInput.value;
        const password = passwordInput.value;
        try {
            const response = yield fetch(usersUrl);
            const users = yield response.json();
            const user = users.find((user) => user.username === username && user.password === password);
            const admin = users.find((admin) => admin.username === 'admin' && admin.password === '123456');
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
});
