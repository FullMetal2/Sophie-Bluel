/**************************************/
/* 1. Variable globales + fetch init */
/**************************************/
const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
const token = window.localStorage.getItem("token");
let data = [];

/* Récupération des travaux depuis l'API */

async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works"); // Serveur API //
    console.log("Réponse brute de l'API :", response);
    const works = await response.json();
    data = works;
    console.log(
      "Transformation de la réponse API en tableau utilisable en JS",
      works
    ); // works = tableau de données (Works) //
    return works;
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux :", error);
    return [];
  }
}

/**************************************/
/* 2. Chargement du DOM + logique admin */
/**************************************/

/* écouteur d'évenement si admin connecté ou pas, changement de DOM pour ajouter des projets */

document.addEventListener("DOMContentLoaded", async function () {
  /* Token stoké dans le localeStorage */

  console.log("Token", token);

  /* Récupération du tableau data avec toutes les données de l'API */

  data = await getWorks();
  genereWorks(data);

  /* Si ce n'est pas l'admin on génère les bouton filtre pour la HOMEPAGE */

  if (!isAdmin) {
    const worksCategory = trierCategory(data);
    genereFiltre(worksCategory, data);
  }

  /* Si admin fonction pour ajouter et supprimer des travaux */

  if (isAdmin) {
    console.log("Bienvenue admin");

    /* Préparation de la page admin et mode édition */

    const editionModeBar = document.querySelector("body");
    const header = document.querySelector("header");
    const blackHighBar = document.createElement("div");
    editionModeBar.appendChild(blackHighBar);

    blackHighBar.innerHTML = `<div class="high-bar">
                                    <span class="iconHeader"><i class="fa-solid fa-pen-to-square"></i></span>
                                    <div>Mode édition</div>  
                                </div>`;
    header.style.marginTop = "100px";

    const btnEditMode = document.createElement("div");
    btnEditMode.innerHTML = `<button class="icone">
                                <i class="fa-regular fa-pen-to-square"></i>
                                Modifier
                            </button>`;
    btnEditMode.classList.add("divEdit");
    const modifEditMode = document.querySelector("#portfolio h2");
    (modifEditMode.style.flexDirection = "row"),
      (modifEditMode.style.justifyContent = "center");
    modifEditMode.appendChild(btnEditMode);

    const logIn = document.querySelector(".login");
    logIn.textContent = "Logout";
    logIn.addEventListener("click", function () {
      window.localStorage.clear();
      document.location.href = "index.html";
    });

    /* Bouton Modifier ouverture modal plus génération de la galeries des projets dans la modal, avec en paramètre la liste des travaux API mise a jour si un projet a étais supprimer */

    btnEditMode.addEventListener("click", function (event) {
      event.preventDefault();
      getWorks(data);

      /* Création modal avec 2 vue (vue 1 : galerie avec possibilité de supprimer un projet, vue 2 : formulaire pour ajouter un nouveau projet) */

      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      document.body.classList.add("no-scroll");

      const modal1 = document.createElement("aside");
      modal1.addEventListener("click", function (event) {
        deleteWorks(event);
      });
      modal1.classList.add("styleModale");
      modal1.innerHTML = `<div class="modal-gallery-view">
                                                                                        <h2 class="titleModale">Galerie photo</h2>
                                                                                        <button class="btnClose">
                                                                                            <i class="fa-solid fa-xmark"></i>
                                                                                        </button>
                                                                                        <div class="modal-gallery"></div>
                                                                                        <div class="btnHr">
                                                                                            <hr>
                                                                                            <button class="btnphoto">
                                                                                                Ajouter une photo
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                        
                                                                                    <div class="modal-form-view">
                                                                                        <h2 class="titleModale">Ajout photo</h2>
                                                                                          <button class="btnCloseForm">
                                                                                            <i class="fa-solid fa-xmark"></i>
                                                                                        </button>
                                                                                        <button class="btnretour"><i class="fa-solid fa-arrow-left"></i></button>
                                                                                            <form id="addphoto">
                                                                                                <div class="upload">
                                                                                                <label for="image" class="upload-label">
                                                                                                    <i class="fa-regular fa-image fa-3x"></i>
                                                                                                    <span class="upload-button">+ Ajouter photo</span>
                                                                                                    <p class="upload-info">jpg, png : 4mo max</p>
                                                                                                    
                                                                                                </label>
                                                                                                <input type="file" id="image" name="image" accept="image/png, image/jpeg" required class="file">
                                                                                                </div>
                                                                                                <div class="title">
                                                                                                <label>
                                                                                                    Titre<br>
                                                                                                </label>
                                                                                                <input type="text" name="title" required>
                                                                                                </div>
                                                                                                <div class="categorie">
                                                                                                <label>
                                                                                                    Catégorie<br>
                                                                                                </label>
                                                                                                    <select name="category" id="categorie-select" required>
                                                                                                        <option value="" disabled selected hidden></option>
                                                                                                    </select>
                                                                                                    <i class="fa-solid fa-angle-down"></i>
                                                                                                    </div>
                                                                                                    <hr>   
                                                                                                <button type="submit" class="btn-valider">Valider</button>
                                                                                            </form>
                                                                                    </div>`;

      document.body.appendChild(overlay);
      document.body.appendChild(modal1);

      // genereWorksGallery(data);
      changeViewModal();
      remplirSelectCategorie(data);
      inputFile();

      // écouteur d'évenement pour requête API POST pour un nouveau projet //
      const btnValider = document.querySelector("#addphoto");
      btnValider.addEventListener("submit", function (event) {
        event.preventDefault();
        sendWorks(data);
        closeModal();
      });

      checkForm();

      overlay.addEventListener("click", closeModal);

      modal1.querySelector(".btnClose").addEventListener("click", closeModal);

      modal1
        .querySelector(".btnCloseForm")
        .addEventListener("click", closeModal);

      genereWorks(data, ".modal-gallery");
    });
  } else {
    console.log("Bienvenue utilisateur");
  }
});

/**************************************/
/* 3 . Fonction réutilisable */
/**************************************/

// Fonction pour création des bouton filtre //
function genereFiltre(worksCategory, data) {
  // Création de la div pour les bouton filtre //

  const filtreClass = document.querySelector("#portfolio h2");
  const filtre = document.createElement("div");
  filtre.classList.add("btn-filtre");
  filtreClass.appendChild(filtre);

  //Création des boutons filtres ( balises du DOM )  //

  const btnTous = document.createElement("button");
  btnTous.textContent = "Tous";
  btnTous.addEventListener("click", function () {
    console.log("Afiicher tous les travaux");
    document.querySelector(".gallery").innerHTML = "";
    genereWorks(data, ".gallery");
  });
  filtre.appendChild(btnTous);

  for (const categoryId in worksCategory) {
    const category = worksCategory[categoryId];
    const btn = document.createElement("button");
    btn.textContent = category.name;

    btn.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      genereWorks(category.item, ".gallery");
    });
    filtre.appendChild(btn);
  }
}

// Fonction pour trier par categorie //

function trierCategory(data) {
  const worksCategory = {};

  // Boucle for qui parcours le tableau works //

  for (let i = 0; i < data.length; i++) {
    const categoryId = data[i].category.id;

    if (!worksCategory[categoryId]) {
      worksCategory[categoryId] = {
        id: data[i].category.id,
        name: data[i].category.name,
        item: [],
      };
    }
    worksCategory[categoryId].item.push(data[i]);
  }
  return worksCategory;
}

// Fonction pour afficher les travaux (works) HOMEPAGE ou MODAL  //

function genereWorks(data, selector = ".gallery") {
  const container = document.querySelector(selector);
  const isModal = selector === ".modal-gallery";
  container.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    // Création des balises HTML //

    const figure = data[i];

    const worksElement = document.createElement("figure");
    worksElement.id = data[i].id;
    if (isModal) worksElement.style.position = "relative";

    const worksImg = document.createElement("img");
    worksImg.src = figure.imageUrl;

    const worksTitle = document.createElement("figcaption");
    worksTitle.innerText = figure.title;

    worksElement.appendChild(worksImg);
    if (!isModal) {
      worksElement.appendChild(worksTitle);
    } else {
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash-can");
      deleteIcon.dataset.id = data[i].id;
      worksElement.appendChild(deleteIcon);
    }

    // Rattachement à la section du DOM //

    container.appendChild(worksElement);
  }
}

// Fonction pour remplir la sélection des catégorie pour ajouter un nouveau projet //

function remplirSelectCategorie(data) {
  const selectElement = document.getElementById("categorie-select");

  // Variable compteur pour arrêter la boucle si les 3 catégories sont existante //

  let compteur = 0;

  // Boucle for qui parcours le tableau works //

  for (let i = 0; i < data.length; i++) {
    const categorie = data[i].category;

    // IF si catégories non existantes alors création de la catégories dans le select HTML //

    if (categorie.id === 1 || categorie.id === 2 || categorie.id === 3) {
      const option = document.createElement("option");
      option.value = categorie.id;
      option.textContent = categorie.name;
      selectElement.appendChild(option);
      console.log(categorie);
      compteur++;

      if (compteur === 3) {
        break;
      }
    }
  }
}

// Fonction avec fetch DELETE pour supprimer un travaux a partir de la modal et mise a jour des données du tableau data //

function deleteWorks(event) {
  const poubelleClick = event.target;

  if (poubelleClick.classList.contains("fa-trash-can")) {
    const dataId = poubelleClick.dataset.id;

    fetch(`http://localhost:5678/api/works/${dataId}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log("réponse api :", response.status);

      if (response.ok) {
        console.log(`Travail ID ${dataId} supprimé avec succèes`);
        poubelleClick.closest("figure")?.remove();

        data = data.filter((item) => item.id !== Number(dataId));

        genereWorks(data, ".modal-gallery");
        genereWorks(data);
      } else {
        console.error("Erreur de fetch DELETE :", error);
      }
    });
  }
}

// Fonction pour changer la vue de la modal //

function changeViewModal() {
  const btnAjoutphoto = document.querySelector(".btnphoto");
  const galleryView = document.querySelector(".modal-gallery-view");
  const formView = document.querySelector(".modal-form-view");
  const btnRetour = document.querySelector(".btnretour");

  // écouteur d'événement pour bouton retour et bouton ajouter photo pour changer vu de la modal //

  btnAjoutphoto.addEventListener("click", () => {
    galleryView.style.display = "none";
    formView.style.display = "flex";
  });

  btnRetour.addEventListener("click", () => {
    galleryView.style.display = "flex";
    formView.style.display = "none";
  });
}

// Fonction pour afficher l'image sélectionné dans le formulaire pour ajouter un nouveau projet //

function inputFile() {
  const inputFile = document.querySelector("#image");

  // écouteur d'évenement pour afficher la nouvelle image d'un nouveau projet dans le formulaire //

  inputFile.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const uploadLabel = document.querySelector(".upload-label");
        uploadLabel.style.display = "none";

        const previewImage = document.createElement("img");
        previewImage.src = e.target.result;
        previewImage.alt = "Aperçu de l'image sélectionné";
        previewImage.classList.add("preview-image");

        const uploadcontainer = document.querySelector(".upload");
        uploadcontainer.appendChild(previewImage);
      };
      reader.readAsDataURL(file);
    }
  });
}

// Fonction avec fetch POST pour envoyer un nouveau projet a l'API et mise a jour du tableau data //

function sendWorks() {
  // Récupération des données du formulaire (formData) pour requête POST API //

  const formDataPhoto = new FormData(addphoto);
  const dataObjetc = {};
  formDataPhoto.forEach((value, key) => {
    dataObjetc[key] = value;
    console.log(key, value);
  });

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: formDataPhoto,
  })
    .then((response) => response.json())
    .then((newData) => {
      console.log("Liste mise a jour :", newData);
      data.push(newData);
      genereWorks(data);
    })
    .catch((error) => {
      console.error("Problème avec l'envoi du formulaire", error);
    });
}

// Fonction pour fermer la modale en cliquant sur la crois, or de la modal et en envoyant un nouveau projet a l'API//

function closeModal() {
  const modal1 = document.querySelector("aside");
  const overlay = document.querySelector(".overlay");
  overlay.remove();
  modal1.remove();
  document.body.classList.remove("no-scroll");
}
// Fonction pour vérifier si le formulaire est bien rempli pour être envoyé vers l'API  //

function checkForm() {
  // Validation du formulaire pour envoyé un nouveau projet a l'API //

  const form = document.querySelector("#addphoto");
  const validColor = document.querySelector(".btn-valider");

  form.addEventListener("input", function () {
    if (form.checkValidity()) {
      validColor.style.backgroundColor = "#1D6154";
      validColor.disabled = false;
    } else {
      validColor.style.backgroundColor = "gray";
      validColor.disabled = true;
    }
  });

  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
    }
  });
}
