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

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorMsg = "Não foi possível fazer login.";

                try {
                    const errorData = await response.json();

                    if (errorData?.message) {
                        errorMsg = errorData.message;
                    } else if (Array.isArray(errorData?.errors) && errorData.errors.length > 0) {
                        errorMsg = errorData.errors[0];
                    }
                } catch (_) {
                }

                mensagem.textContent = errorMsg;
                mensagem.style.color = "red";
                return;
            }

            const data = await response.json();

            if (data && data.token) {
                localStorage.setItem("authToken", data.token);
            }

            mensagem.textContent = "Login realizado com sucesso!";
            mensagem.style.color = "green";

        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            mensagem.textContent = "Erro ao conectar ao servidor. Tente novamente.";
            mensagem.style.color = "red";
        }
    });
});
