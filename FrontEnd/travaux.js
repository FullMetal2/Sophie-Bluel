        ///// Récupération des travaux depuis l'API /////
async function getWorks() {

        const response = await fetch("http://localhost:5678/api/works"); // Serveur API //
            console.log("Réponse brute de l'API :", response);
        const works = await response.json();
            console.log("Transformation de la réponse API en tableau utilisable en JS", works);  // works = tableau de données (Works) //
        
        ///// Apelle à la fonction genereWorks /////

genereWorks(works);


        /// Filtrage par catégories ///    

        
        let worksCategory = works;
        trierCategory(works);
        
        //Création des boutons filtres ( balises du DOM ) //
        
        btnTous = document.createElement("button");
        btnTous.textContent = "Tous";
        btnTous.addEventListener("click", function() {
            console.log("Afiicher tous les travaux");
            worksCategory;
        });

        //const btnFiltre = document.querySelector(".btn-filtre")
        

        btnObjet = document.createElement("button");
        btnObjet.textContent = "Objets";
        btnObjet.addEventListener("click", function() {
            const categoryId = 0;
            console.log("Afficher la catégorie objets")
            console.log(worksCategory[categoryId])
        });
        

        //const btnFiltre = document.querySelector(".btn-filtre")
        

        btnAppart = document.createElement("button");
        btnAppart.textContent = "Appartements";
        btnAppart.addEventListener("click", function() {
            const categoryId = 1;
            console.log("Afficher la catégorie appartements")
            console.log(worksCategory[categoryId])

        })
        

        //const btnFiltre = document.querySelector(".btn-filtre")
        

        btnHotel = document.createElement("button");
        btnHotel.textContent = "Hôtels & Restaurants";
        btnHotel.addEventListener("click", function() {
            const categoryId = 2;
            console.log("Afficher la catégorie hôtels & restaurants")
            console.log(worksCategory[categoryId]);

        })

           
        const btnFiltre = document.querySelector(".btn-filtre");

        btnFiltre.appendChild(btnTous);
        btnFiltre.appendChild(btnObjet);
        btnFiltre.appendChild(btnAppart);
        btnFiltre.appendChild(btnHotel);

 

    
}       
    
                    
            // Apelle à la fonction getWorks //
                    
getWorks();
    
           
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
            
            console.log(worksCategory);
               
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









            

