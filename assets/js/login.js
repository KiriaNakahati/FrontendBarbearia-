const API_URL = "http://localhost:8080/auth/login";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const mensagem = document.getElementById("mensagem");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("login").value.trim();
        const senha = document.getElementById("senha").value.trim();

        mensagem.textContent = "";
        mensagem.style.color = "";

        if (!email || !senha) {
            mensagem.textContent = "Preencha email e senha.";
            mensagem.style.color = "red";
            return;
        }
        const payload = {
            email: email,
            password: senha,
        };
    });
});
