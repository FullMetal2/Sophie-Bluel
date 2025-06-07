            /////  Afficher la page de connexion /////
        
        const btnLogin = document.querySelector("#login");
        const body = document.querySelector("body");        
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

        
        const loginForm = document.querySelector(".logins")
            loginForm.innerHTML = `
                <h2>Log In</h2>
                    <form action"#" method="POST" id="form-login">
                        <div>
                                <div class="error"></div>
                            <div>
                                <label for="email" class="label-co">E-mail</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            
                            <div>
                                <label for="password" class="label-co">Mot de passe</label>
                                <input type="password" id="password" name="password" required>
                            </div>
                            <div>
                                <input type="submit" value="Se connecter"/>
                            </div>
                            <div class="password">
                                <a href="#">Mot de passe oublié</a>
                            </div>
                        </div>
                    </form>`;

            
        ///// Récupération des data user /////

        
        const formlogin = document.querySelector("#form-login");
        const errorEmail = document.querySelector(".error");
        
        // écouteur d'évenement sur l'input se connecter //

            formlogin.addEventListener("submit", (event) => {
                event.preventDefault();
                console.log("Formulaire par défautl non envoyé ok");
                
                const formData = new FormData(formlogin);
                const dataObject = {};
                formData.forEach((value, key) => {
                    dataObject[key] = value;
                    console.log(key ,value);
                });

            login(dataObject);
        });
        
            
        ///// Connexion User /////
function login(dataObject) {

            fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(dataObject)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Problème avec la requête");
               }
                 return response.json();
            })
            .then (data => {
                    console.log("Réponse connexion API :", data);

                        window.localStorage.setItem("Token", JSON.stringify(data.token));
                        const userId = data.userId;
                            if (userId === 1) {
                                window.localStorage.setItem("isAdmin", true);
                                console.log("Admin :", userId)
                            } else {
                                window.localStorage.setItem("isAdmin", false);
                                console.log(userId)
                            }

                        const storeUser = window.localStorage.getItem("Token");
                        console.log("Données stokées dans le localstorage :", JSON.parse(storeUser));
                        
                        document.location.href = "index.html"
                        document.addEventListener("DOMContentLoaded", function() {
                            const isAdmin = window.localStorage.getItem("isAdmin") === "true";

                            if (isAdmin) {
                                console.log("Bienvenue admin sur index.html");
                                const filter = document.querySelector(".btn-filtre");
                                if (filter) {
                                    filter.innerHTML = "";
                                }
                            } else {
                                console.log("Bienvenue utilisateur sur index.html");
                            }
                        });
                        
                        


                             
                           

                                    
                            
            })
            .catch(error =>  {
                    errorEmail.innerText = "E-mail ou mot de passe incorrect";
                    console.error("Erreur :", error.message);
            });
        }

                            
                              

                            

            
            
            



           

    