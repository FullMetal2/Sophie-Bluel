/************************************************************/
/*********** 1. Création de la page de connexion ************/
/************************************************************/

//Récupération du li "login" pour lui ajouter une class//
const allUl = document.querySelectorAll("ul");
const headerUl = allUl[0];
const liOfFirstUl = headerUl.querySelectorAll("li");
const thirdLi = liOfFirstUl[2];
thirdLi.classList.add("login");

//Rattachement de la div page de connexion en dessous du header//
const header = document.querySelector("header");
const divLogin = document.createElement("div");
divLogin.classList.add("logins");
divLogin.style.display = "none";
header.insertAdjacentElement("afterend", divLogin);

//écouteur d'événement pour afficher la page de connexion//
const btnLogin = document.querySelector(".login");
const body = document.querySelector("body");
btnLogin.addEventListener("click", () => {
  const elementMain = document.querySelector("main");
  elementMain.style.display = "none";
  divLogin.style.display = "flex";

  //Réajustement du body pour la page de connexion//
  const elementForm = document.querySelector(".logins");
  elementForm.classList.add("visible-form");
  body.classList.add("connexion-active");
});

// Création du HTML de la page de connexion//
const loginForm = document.querySelector(".logins");
loginForm.innerHTML = `
                <h2>Log In</h2>
                    <form method="POST" id="form-login">
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

/**************************************************************/
/*********** 2. Récupération des data du user ****************/
/************************************************************/

const formlogin = document.querySelector("#form-login");
const errorEmail = document.querySelector(".error");

// écouteur d'évenement sur l'input se connecter + stokage des données du formulaire //

formlogin.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Formulaire par défautl non envoyé ok");

  const formData = new FormData(formlogin);
  const dataObject = {};
  formData.forEach((value, key) => {
    dataObject[key] = value;
    console.log(key, value);
  });

  login(dataObject);
});

/**************************************************************************************************************************/
/*********** 3. Fonction fetch POST pour connexion administrateur + stokage du token dans le localStorage ****************/
/************************************************************************************************************************/

function login(dataObject) {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dataObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Problème avec la requête (code " + response.status + " )"
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Réponse connexion API :", data);

      window.localStorage.setItem("token", data.token);
      const userId = data.userId;
      if (userId === 1) {
        window.localStorage.setItem("isAdmin", JSON.stringify(true));
        console.log("Admin :", userId);
      } else {
        window.localStorage.setItem("isAdmin", JSON.stringify(false));
        console.log(userId);
      }

      const storeUser = window.localStorage.getItem("token");
      console.log("Données stokées dans le localStorage :", storeUser);

      window.location.href = "index.html";
    })
    .catch((error) => {
      errorEmail.innerText = "E-mail ou mot de passe incorrect";
      console.error("Erreur :", error.message);
    });
}
