        const isAdmin = window.localStorage.getItem("isAdmin") === "true";
        const token = window.localStorage.getItem("Token");
        
       ///// Récupération des travaux depuis l'API /////
async function getWorks() {

        const response = await fetch("http://localhost:5678/api/works"); // Serveur API //
            console.log("Réponse brute de l'API :", response);
        const works = await response.json();
            console.log("Transformation de la réponse API en tableau utilisable en JS", works);  // works = tableau de données (Works) //
        data = works;
            ///// Apelle à la fonction genereWorks /////

genereWorks(works);
        

        /// Filtrage par catégories ///    
    if (!isAdmin) {
        
       const worksCategory = trierCategory(works);
        
        
        //Création des boutons filtres ( balises du DOM ) //
        
        const btnTous = document.createElement("button")
        btnTous.textContent = "Tous";
        btnTous.addEventListener("click", function() {
            console.log("Afiicher tous les travaux");
            document.querySelector(".gallery").innerHTML = "";
            genereWorks(works);
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

        })
        


        

        const btnHotel = document.createElement("button");
        btnHotel.textContent = "Hôtels & Restaurants";
        btnHotel.addEventListener("click", function() {
            const categoryId = 3;
            console.log("Afficher la catégorie hôtels & restaurants")
            console.log(worksCategory[categoryId]);
                document.querySelector(".gallery").innerHTML = "";
                genereWorks(worksCategory[categoryId].item);

        })

           
        const btnFiltre = document.querySelector(".btn-filtre");

        btnFiltre.appendChild(btnTous);
        btnFiltre.appendChild(btnObjet);
        btnFiltre.appendChild(btnAppart);
        btnFiltre.appendChild(btnHotel);
    }

        


 
}
        // Apelle à la fonction getWorks //
getWorks()
        
        
        document.addEventListener("DOMContentLoaded", function() {
                    
                    console.log("Token", token);
                    console.log("Admin :", isAdmin);

                        if (isAdmin) {
                            console.log("Bienvenue admin :", isAdmin);

                                const filter = document.querySelector(".btn-filtre");
                                const editionModeBar = document.querySelector("body");
                                const blackHighBar = document.createElement("div");
                                editionModeBar.appendChild(blackHighBar);

                                const header = document.querySelector("header");
                                const btnEditMode = document.createElement("div");
                                btnEditMode.innerHTML = `<button class="icone"><i class="fa-regular fa-pen-to-square"></i>Modifier</button>`;
                                btnEditMode.classList.add("divEdit");
                                const modifEditMode = document.querySelector("#portfolio h2");
                                modifEditMode.appendChild(btnEditMode);

                                const logIn = document.querySelector(".login");
                                logIn.style.display = 'none';
                                const logOut = document.querySelector(".logout");
                                logOut.style.display = 'block';
                                logOut.textContent = "Logout";
                                    logOut.addEventListener("click", function ()  {
                                        window.localStorage.clear();
                                        document.location.href = "index.html"
                                    });

                            if (filter) {
                                filter.innerHTML = "";
                                blackHighBar.innerHTML = `<div class="high-bar">
                                                            <sapn class="iconHeader"><i class="fa-solid fa-pen-to-square"></i></sapn>
                                                            <div>Mode édition</div>  
                                                        </div>`
                                header.style.marginTop = "100px"
                                
                            }

            btnEditMode.addEventListener("click", function (event) {
                event.preventDefault();
                    
                   const overlay = document.createElement("div");
                    overlay.classList.add("overlay");

                    const modal1 = document.createElement("aside");
                    modal1.classList.add("styleModale");
                        modal1.innerHTML = `<h2>Galerie photo</h2>
                                                <button class="btnClose"><i class="fa-solid fa-xmark"></i></button>`;
                        const modalGallery = document.createElement("div")
                        modalGallery.classList.add("modal-gallery")
                        modal1.appendChild(modalGallery)
                        
                            document.body.appendChild(overlay);
                            document.body.appendChild(modal1);
                            

                     document.body.classList.add("no-scroll");

                    

                    function closeModal () {
                        overlay.remove();
                        modal1.remove();
                        document.body.classList.remove("no-scroll");

                    }

                    

                    overlay.addEventListener("click", closeModal);
                        modal1.querySelector(".btnClose").addEventListener("click", closeModal);
                        
                    });
                    
                    
                        } else {
                            console.log("Bienvenue utilisateur :");
                        }
            
        }); 
        
        
    
                    
        ///// Fonction pour trier par categorie /////
   
function trierCategory(works){
        const worksCategory = {};

            // Boucle for qui parcours le tableau works //

            for (let i = 0; i < works.length; i++) {
                const categoryId = works[i].category.id;
                
                    if (!worksCategory[categoryId]) {
                        worksCategory[categoryId] = {
                            id: works[i].category.id,
                            name: works[i].category.name,
                            item: []
                        };
                    };
                worksCategory[categoryId].item.push(works[i]);
                
                
            };
            return worksCategory;
               
}

 
           ///// Fonction pour afficher les travaux (works) /////

function genereWorks(works){

            // Boucle for qui parcours le tableau works //
    for (let i = 0; i < works.length; i++) {

            // Création des balises HTML //

        const figure = works[i];

            // Rattachement au balise du DOM //

        const divGallery = document.querySelector(".gallery");

        const worksElement = document.createElement("figure");
        worksElement.id = works[i].id;

        const worksImg = document.createElement("img");
        worksImg.src = figure.imageUrl;

        const worksTitle = document.createElement("figcaption");
        worksTitle.innerText = figure.title;

            // Rattachement à la section du DOM //

        divGallery.appendChild(worksElement);
        worksElement.appendChild(worksImg);
        worksElement.appendChild(worksTitle);
        
    }
}









            

