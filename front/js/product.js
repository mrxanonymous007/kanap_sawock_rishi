//recupération de l'id depuis la page accueil de mon produit cliqué
const recupUrl = window.location.search;
//extraction de ?id= et de la string correspondant au produit afin de vérifier si l'id url correspond à _id plus tard
const url = new URLSearchParams(recupUrl).get("id");

fetch(`http://localhost:3000/api/products/${url}`)
    .then((response) =>
        response.json()
    )
    .then((data) => {

        //affichage d'une image unique du produit
        let recupClassImg = document.querySelector(".item__img");
        let imgElem = document.createElement("img");
        imgElem.src = data.imageUrl;
        imgElem.alt = data.altTxt;
        recupClassImg.appendChild(imgElem);

        //affichage du name unique du produit
        let nomProduit = document.querySelector("#title");
        let h1Title = document.createTextNode(data.name);
        nomProduit.appendChild(h1Title);

        //affichage du prix unique du produit
        let prixProduit = document.querySelector("#price");
        let affichagePrixTxt = document.createTextNode(data.price);
        prixProduit.appendChild(affichagePrixTxt);

        //affichage de la description unique du produit
        let descriptionProduit = document.querySelector("#description");
        let affichageDescription = document.createTextNode(data.description);
        descriptionProduit.appendChild(affichageDescription);

        //creation d'une deuxième boucle afin d'accéder à l'array colors
        for (let c = 0; c < data.colors.length; c++) {
            //affichage des couleurs dans le select > option   
            let selectProduit = document.querySelector("#colors");
            let optionProduit = document.createElement("option");
            optionProduit.value = data.colors[c];
            let affichageTxtProduit = document.createTextNode(data.colors[c]);

            selectProduit.appendChild(optionProduit);
            optionProduit.appendChild(affichageTxtProduit);
        };

        //au clic sur le bouton 'ajouter au panier', redirection vers cart.html dans un nouvel onglet
        let btnOnClick = document.querySelector("#addToCart");
        btnOnClick.addEventListener("click", () => {
            let select = document.querySelector("#colors");
            let valueCart = select.options[select.selectedIndex].value;
            let idCart = data._id;
            let quantityCart = document.querySelector("#quantity").value;

            /*condition pour vérifier si les couleurs et/ou la/les quantitées sont comprises entre 1-100
            si vrai stockage des infos dans localstorage*/
            if (valueCart == "" && quantityCart == 0) {
                alert("Veuillez choisir une couleur et renseigner une quantité !");
            } else if (valueCart == "") {
                alert("Veuillez choisir une couleur !");
            } else if (quantityCart <= 0 || quantityCart >= 101) {
                alert("Veuillez renseigner une quantité comprise entre 1 et 100 !");
            } else {
                //creation d'un objet pour récupérer l'id, quantité et la couleur
                let productLs = {
                    id: idCart,
                    quantity: Number(quantityCart),
                    color: valueCart,
                };
                //ajout du produit au localstorage si les données sont correctement rempli
                let panier = localStorage.getItem("panier");
                let cart = panier ? JSON.parse(panier) : [];
                let addNewItem = true;
                for (let i = 0; i < cart.length; i++) {
                    if (productLs.id === cart[i].id && productLs.color === cart[i].color) {
                        cart[i].quantity += productLs.quantity;
                        addNewItem = false;
                    }
                }
                if (addNewItem) {
                    cart.push(productLs);
                }
                localStorage.setItem("panier", JSON.stringify(cart));
                window.location.href = "cart.html";
            }
        });

    })
    .catch((error) => {
        window.location.href = "index.html";
        const err = "Oups... Veuillez réessayer plus tard ";
        const classTitles = document.querySelector(".item__img");
        const pElemerr = document.createElement("p");
        pElemerr.textContent = err;
        pElemerr.style.textAlign = "center";
        classTitles.appendChild(pElemerr);
    })