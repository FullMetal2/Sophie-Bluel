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

        logins.appendChild(loginForm);