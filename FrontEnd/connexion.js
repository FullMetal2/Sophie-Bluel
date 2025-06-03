            /////  Afficher la page de connexion /////

    
    const btnLogin = document.querySelector("#login");
    const body =document.querySelector("body");        
        btnLogin.addEventListener("click", () => {
            const elementMain = document.querySelector('main')
            elementMain.style.display = 'none';
            const elementForm = document.querySelector(".logins");
            elementForm.classList.add("visible-form");
            body.style.display = "flex";
            body.style.justifyContent = "center";
            body.style.flexDirection = "column";
            body.style.height = "100vh";
        })

        
        loginForm = document.querySelector(".logins")
            loginForm.innerHTML = `
                <h2>Log In</h2>
                    <form action"#" method="POST" id="form-login">
                        <div>
                            <div>
                                <label for="email" class="label-co">E-mail</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div>
                                <label for="password" class="label-co">Mot de passe</label>
                                <input type="password" id="password" name="password" required>
                            </div>
                        </div>
                            <div>
                                <input type="submit" value="Se connecter"/>
                            </div>
                            <div class="password">
                                <a href="#">Mot de passe oublié</a>
                            </div>
                    </form>`;

            
        ///// Récupération des data user /////

        const emailInput = document.querySelector("#email")
        const passwordInput = document.querySelector("#password")
        const formlogin = document.querySelector("#form-login")

        // écouteur d'évenement sur l'input se connecter //

            formlogin.addEventListener("submit", (event) => {
                event.preventDefault();
                console.log("Formulaire non envoyé ok")

            const email = emailInput.value;
            const password = passwordInput.value;
            console.log(email, password)

            login(email, password);
        });
            
        ///// Connexion User /////
async function login(email, password) {
    try {
            const response = await fetch ("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
        });
            if (!response.ok) {
                throw new Error("Erreur lors de la connexion");
            }
            const user = await response.json();
                console.log("Réponse connexion API :", user);
            document.location.href = "index.html";
    } catch (error) {
            console.error("Erreur :", error.message);
    }
}
            


            
            
            



           

    