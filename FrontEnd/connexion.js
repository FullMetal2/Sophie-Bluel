            /////  Afficher la page de connexion /////

    
    const btnLogin = document.querySelector("#login");

        btnLogin.addeventlistener("click", () => {
            const elementMain = document.querySelector('main')
            elementMain.style.display = 'none'
        })