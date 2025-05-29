            ///// Récupération des travaux depuis l'API /////
async function getWorks() {

        const response = await fetch("http://localhost:5678/api/works"); // Serveur API //
            console.log("Réponse brute de l'API :", response);
        const works = await response.json();
            console.log("Transformation de la réponse API en tableau utilisable en JS", works);  // works = tableau de données (Works) //



            ///// Fonction pour trier par categorie /////
            
function trierCategory(works){
        const worksCategory = {};

            // Boucle for qui parcours le tableau works //

            for (let i = 0; i < works.length; i++) {
                const categoryId = works[i].category.id;
                
                    if (!worksCategory[categoryId]) {
                        worksCategory[categoryId] = {
                            name: works[i].category.name,
                            item: []
                        };
                    };
                worksCategory[categoryId].item.push(works[i]);
            };
               console.log(worksCategory);


}

            


                //Création des boutons filtres ( balises du DOM ) //
        
        btnTous = document.createElement("button");
        btnTous.textContent = "Tous";
        btnTous.addEventListener("click", function() {
            console.log("Afiicher tous les travaux");
            trierCategory(works);
        });

        //const btnFiltre = document.querySelector(".btn-filtre")
        

        btnObjet = document.createElement("button");
        btnObjet.textContent = "Objets";
        btnObjet.addEventListener("click", function() {
            const categoryId = 1;
            console.log("Afficher la catégorie objets")
            trierCategory(works[1]);
        });
        

        //const btnFiltre = document.querySelector(".btn-filtre")
        

        btnAppart = document.createElement("button");
        btnAppart.textContent = "Appartements";
        btnAppart.addEventListener("click", function() {
            const categoryId = 2;
            console.log("Afficher la catégorie appartements")
            trierCategory(worksCategory[2]);

        })
        

        //const btnFiltre = document.querySelector(".btn-filtre")
        

        btnHotel = document.createElement("button");
        btnHotel.textContent = "Hôtels & Restaurants";
        btnHotel.addEventListener("click", function() {
            const categoryId = 3;
            console.log("Afficher la catégorie hôtels & restaurants")
            trierCategory(worksCategory[3]);

        })

        const btnFiltre = document.querySelector(".btn-filtre");

        btnFiltre.appendChild(btnTous);
        btnFiltre.appendChild(btnObjet);
        btnFiltre.appendChild(btnAppart);
        btnFiltre.appendChild(btnHotel);

        

                    // Apelle à la fonction genereWorks //
                    
    genereWorks(works);
    
}    
    

           
            // Apelle à la fonction getWorks //
    getWorks();


 
            // Boucle for pour afficher les travaux //

function genereWorks(works){
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









            

