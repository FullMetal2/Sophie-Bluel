        const isAdmin = window.localStorage.getItem("isAdmin") === "true";
        const token = window.localStorage.getItem("Token");
        let data = [];
       
       
        ///// Récupération des travaux depuis l'API /////
async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works"); // Serveur API //
            console.log("Réponse brute de l'API :", response);
        const works = await response.json();
        data = works
            console.log("Transformation de la réponse API en tableau utilisable en JS", works);  // works = tableau de données (Works) //
        return works;
        
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", (error));
        return [];
    } 
};
        
          
document.addEventListener("DOMContentLoaded", async function() {
                    
    console.log("Token", token);
    console.log("Admin :", isAdmin);

        data = await getWorks();
        genereWorks(data);

            if (!isAdmin) {

                const worksCategory = trierCategory(data);
                genereFiltre(worksCategory, data);
            };

                if (isAdmin) {
                    console.log("Bienvenue admin :", isAdmin);

                        const filter = document.querySelector(".btn-filtre");
                        const editionModeBar = document.querySelector("body");
                        const blackHighBar = document.createElement("div");
                        editionModeBar.appendChild(blackHighBar);

                            const header = document.querySelector("header");
                            const btnEditMode = document.createElement("div");
                            btnEditMode.innerHTML = `<button class="icone">
                                                        <i class="fa-regular fa-pen-to-square"></i>
                                                            Modifier
                                                    </button>`;
                            btnEditMode.classList.add("divEdit");
                            const modifEditMode = document.querySelector("#portfolio h2");
                            modifEditMode.appendChild(btnEditMode);

                                const logIn = document.querySelector(".login");
                                logIn.style.display = 'none';
                                const logOut = document.querySelector(".logout");
                                logOut.style.display = 'block';
                                logOut.textContent = "Logout";
                                logOut.style.cursor = "pointer";
                                    logOut.addEventListener("click", function ()  {
                                        window.localStorage.clear();
                                        document.location.href = "index.html";
                                });            

                                            if (filter) {
                                                filter.innerHTML = "";
                                                blackHighBar.innerHTML = `<div class="high-bar">
                                                                            <sapn class="iconHeader"><i class="fa-solid fa-pen-to-square"></i></sapn>
                                                                            <div>Mode édition</div>  
                                                                        </div>`;
                                                header.style.marginTop = "100px";
                                            }

                                                    btnEditMode.addEventListener("click", function (event) {
                                                        event.preventDefault();
                                                            
                                                        const overlay = document.createElement("div");
                                                            overlay.classList.add("overlay");

                                                            const modal1 = document.createElement("aside");
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
                                                                                          <button class="btnClose">
                                                                                            <i class="fa-solid fa-xmark"></i>
                                                                                        </button>
                                                                                        <button class="btnretour"><i class="fa-solid fa-arrow-left"></i></button>
                                                                                            <form id="addphoto">
                                                                                                <label class="upload-label">
                                                                                                    <i class="fas fa-image fa-3x"></i>
                                                                                                    <span class="upload-button">+ Ajouter photo</span>
                                                                                                    <p class="upload-info">jpg, png : 4mo max</p>
                                                                                                    <input type="file" name="image" accept="image/png, image/jpeg" required hidden>
                                                                                                </label>
                                                                                                <label>
                                                                                                    Titre<br>
                                                                                                        <input type="text" name="titre" required/>
                                                                                                </label>
                                                                                                <label>
                                                                                                    Catégorie<br>
                                                                                                        <select name="categorie" required>
                                                                                                            <option value="1">Objet</option>
                                                                                                            <option value="2">Appartement</option>
                                                                                                            <option value="3">Hôtel & restaurant</option>
                                                                                                        </select>
                                                                                                </label>
                                                                                                <button type="submit">Valider</button>
                                                                                            </form>
                                                                                    </div>`;
                                                                
                                                            document.body.appendChild(overlay);
                                                            document.body.appendChild(modal1);
                                                                    
                                                            genereWorksGallery(data);
                                                            document.body.classList.add("no-scroll");

                                                            const btnAjoutphoto = modal1.querySelector(".btnphoto");
                                                            const galleryView = modal1.querySelector(".modal-gallery-view");
                                                            const formView = modal1.querySelector(".modal-form-view");
                                                            const btnRetour = modal1.querySelector(".btnretour");

                                                            btnAjoutphoto.addEventListener("click", () => {
                                                                galleryView.style.display = "none";
                                                                formView.style.display = "flex";
                                                            });

                                                            btnRetour.addEventListener("click", () => {
                                                                galleryView.style.display = "flex";
                                                                formView.style.display = "none";
                                                            })

                                                            function closeModal () {
                                                                overlay.remove();
                                                                modal1.remove();
                                                                document.body.classList.remove("no-scroll");

                                                            }

                                                            overlay.addEventListener("click", closeModal);
                                                                modal1.querySelector(".btnClose").addEventListener("click", closeModal);
                                                                genereWorks(data, ".modal-gallery");
                                                    });
                                                            
                                                            
                                                                } else {
                                                                    console.log("Bienvenue utilisateur :");
                                                                };
});
        
        
    
                    
        
        
function genereFiltre(worksCategory, data){
        
        //Création des boutons filtres ( balises du DOM ) //
        
        const btnTous = document.createElement("button");
        btnTous.textContent = "Tous";
        btnTous.addEventListener("click", function() {
            console.log("Afiicher tous les travaux");
            document.querySelector(".gallery").innerHTML = "";
            genereWorks(data, ".gallery");
        });

        const btnObjet = document.createElement("button");
        btnObjet.textContent = "Objets";
        btnObjet.addEventListener("click", function() {
            const categoryId = 1;
            console.log("Afficher la catégorie objets")
            console.log(worksCategory[categoryId]);
                document.querySelector(".gallery").innerHTML = "";
                genereWorks(worksCategory[categoryId].item);
        });
        
        const btnAppart = document.createElement("button");
        btnAppart.textContent = "Appartements";
        btnAppart.addEventListener("click", function() {
            const categoryId = 2;
            console.log("Afficher la catégorie appartements")
            console.log(worksCategory[categoryId])
                document.querySelector(".gallery").innerHTML = "";
                genereWorks(worksCategory[categoryId].item);
        });
        
        const btnHotel = document.createElement("button");
        btnHotel.textContent = "Hôtels & Restaurants";
        btnHotel.addEventListener("click", function() {
            const categoryId = 3;
            console.log("Afficher la catégorie hôtels & restaurants")
            console.log(worksCategory[categoryId]);
                document.querySelector(".gallery").innerHTML = "";
                genereWorks(worksCategory[categoryId].item);
        });

           
        const btnFiltre = document.querySelector(".btn-filtre");

        btnFiltre.appendChild(btnTous);
        btnFiltre.appendChild(btnObjet);
        btnFiltre.appendChild(btnAppart);
        btnFiltre.appendChild(btnHotel);
}
            


        ///// Fonction pour trier par categorie /////
   
function trierCategory(data){

    const worksCategory = {};

        // Boucle for qui parcours le tableau works //

            for (let i = 0; i < data.length; i++) {
                const categoryId = data[i].category.id;
                
                    if (!worksCategory[categoryId]) {
                        worksCategory[categoryId] = {
                            id: data[i].category.id,
                            name: data[i].category.name,
                            item: []
                        };
                    };
                worksCategory[categoryId].item.push(data[i]);
                
            };
            return worksCategory;
}

 
           ///// Fonction pour afficher les travaux (works) HOMEPAGE !! /////

function genereWorks(data){
    const mainGallery = document.querySelector(".gallery");
    
        mainGallery.innerHTML = "";
        
            // Boucle for qui parcours le tableau works //
            for (let i = 0; i < data.length; i++) {

            // Création des balises HTML //

                const figure = data[i];

            // Rattachement au balise du DOM //
                
                const worksElement = document.createElement("figure");
                worksElement.id = data[i].id;

                const worksImg = document.createElement("img");
                worksImg.src = figure.imageUrl;

                const worksTitle = document.createElement("figcaption");
                worksTitle.innerText = figure.title;

            // Rattachement à la section du DOM //

                mainGallery.appendChild(worksElement);
                worksElement.appendChild(worksImg);
                worksElement.appendChild(worksTitle);
            };
};

            ///// Fonction pour afficher les travaux (works) MODAL !! /////
function genereWorksGallery(data){
    const modalGallery = document.querySelector(".modal-gallery");
    
     for (let i = 0; i < data.length; i++) {

            // Création des balises HTML //

        const figure = data[i];

        
        const worksElementModal = document.createElement("figure");
        worksElementModal.id = figure.id;
        worksElementModal.style.position = "relative";

        const worksImgModal = document.createElement("img");
        worksImgModal.src = figure.imageUrl;

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash-can");

        
        worksElementModal.appendChild(worksImgModal);
        worksElementModal.appendChild(deleteIcon);
        modalGallery.appendChild(worksElementModal);
    };
};
      






        

