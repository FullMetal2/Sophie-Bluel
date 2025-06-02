            /////  Afficher la page de connexion /////

    
    const btnLogin = document.querySelector("#login");

        btnLogin.addEventListener("click", () => {
            const elementMain = document.querySelector('main')
            elementMain.innerHTML="";
            const elementForm = document.querySelector(".logins");
            elementForm.style.display = "block";
        })

        
        loginForm = document.querySelector(".logins")
            loginForm.innerHTML = `
                <h2>Log In</h2>
                    <form action"submit" method="POST" id="form-login">
                        <div>
                            <label for="email">E-mail</label>
                            <input type="email" id="email" required>
                            <label for="password">Mot de passe</label>
                            <input type="password" id="password required>
                        </div>
                        <div>
                        <input type="submit" value="Se connecter"/>
                        </div>
                    </form>`;

        loginForm.appendChild(loginForm);