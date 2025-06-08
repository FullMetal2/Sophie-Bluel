       const isAdmin = window.sessionStorage.getItem("isAdmin") === "true";
       const token = window.sessionStorage.getItem("Token");

       ///// Récupération des travaux depuis l'API /////
async function getWorks() {

        const response = await fetch("http://localhost:5678/api/works"); // Serveur API //
            console.log("Réponse brute de l'API :", response);
        const works = await response.json();
            console.log("Transformation de la réponse API en tableau utilisable en JS", works);  // works = tableau de données (Works) //
        
            ///// Apelle à la fonction genereWorks /////

genereWorks(works);
        

        /// Filtrage par catégories ///    
    if (!isAdmin) {
        
       let worksCategory = trierCategory(works);
        
        
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

        getWorks();
        document.addEventListener("DOMContentLoaded", function() {
                sessionStorage.removeItem("isAdmin");
                console.log("SessionStorage vidé au chargement.");
                    console.log("Token", token);
                    console.log("Admin :", isAdmin)
                        if (isAdmin) {
                        console.log("Bienvenue admin :", isAdmin);
                            const filter = document.querySelector(".btn-filtre");
                        if (filter) {
                            filter.innerHTML = "";
                        }
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









            

