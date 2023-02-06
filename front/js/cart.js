let apiData;
fetch('http://localhost:3000/api/products')
    .then(function (response) {
        return response.json()

    })
    .then(function (data) {
        apiData = data;
        let cart = recupBasket();
        affichagePanier(apiData, cart);
        deleteItem();
        localQtyUpdate();
        displayPrxEtQty(cart, apiData);
    })
    .catch(function (err) {
        err = 'Panier vide...'

        //condition pour afficher le msg si le ls est vide
        if (localStorage.length == '') {
            let section = document.querySelector('#cart__items');
            let msgTxt = document.createElement('p');
            let txtNode = document.createTextNode(err);

            section.appendChild(msgTxt);
            msgTxt.appendChild(txtNode);
            document.querySelector('p').style.textAlign = 'center';
        }
        // console.log(err);
    });






//recuperation du panier stocké dans le localstorage
function recupBasket() {
    let cart = JSON.parse(localStorage.getItem('panier'));
    return cart;
}




//affichage du panier dans le dom
function affichagePanier(apiData, cart) {

    let docFrag = document.createDocumentFragment();

    for (let product of cart) {

        //verif de l'id du produit se trouvant dans le ls et dans l'api afin de faire afficher chaque article
        let data = apiData.find((element) => element._id == product.id);

        ///////////creation de la balise article avec ses differents attributs///////////
        let article = document.createElement('article');
        article.classList.add('cart__item');
        article.setAttribute('data-id', `${product.id}`);
        article.setAttribute('data-color', `${product.color}`);

        ///////////creation div : cart__item__img <<< IMG///////////
        let divImg = document.createElement('div');
        divImg.classList.add('cart__item__img');

        let img = document.createElement('img');
        img.src = data.imageUrl;
        img.alt = data.altTxt;
        article.appendChild(divImg);
        divImg.appendChild(img);

        ///////////creation div : cart__item__content///////////
        let divItemContent = document.createElement('div');
        divItemContent.classList.add('cart__item__content');
        article.appendChild(divItemContent);

        ///////////creation div enfant : cart__item__content__description (nom du produit, couleur et prix)///////////
        let divContentDesc = document.createElement('div');
        divContentDesc.classList.add('cart__item__content__description');
        divItemContent.appendChild(divContentDesc);

        //h2 : nom du produit
        let nameProduct = document.createElement('h2');
        nameProduct.innerHTML = data.name;
        divContentDesc.appendChild(nameProduct);
        //p : couleur du produit
        let colorTxt = document.createElement('p');
        colorTxt.innerHTML = product.color;
        divContentDesc.appendChild(colorTxt);
        //p : prix du produit
        let priceTxt = document.createElement('p');
        priceTxt.innerHTML = `${data.price}€`;
        divContentDesc.appendChild(priceTxt);

        ///////////creation div : cart__item__content__settings///////////
        let divContentSettings = document.createElement('div');
        divContentSettings.classList.add('cart__item__content__settings');
        divItemContent.appendChild(divContentSettings);

        ///////////creation div : cart__item__content__settings__quantity///////////
        let divContentStgQty = document.createElement('div');
        divContentStgQty.classList.add('cart__item__content__settings__quantity');
        divContentSettings.appendChild(divContentStgQty);

        //quantité
        let qty = document.createElement('p');
        qty.innerHTML = `Qté :`;
        divContentStgQty.appendChild(qty);
        //input
        let input = document.createElement('input');
        input.type = 'number';
        input.classList.add('itemQuantity');
        input.name = 'itemQuantity';
        input.min = 1;
        input.max = 100;
        input.setAttribute('value', `${product.quantity}`);
        divContentStgQty.appendChild(input);

        ///////////creation div : cart__item__content__settings__delete///////////
        let divContentStgDelete = document.createElement('div');
        divContentStgDelete.classList.add('cart__item__content__settings__delete');
        divContentSettings.appendChild(divContentStgDelete);
        //p : supprimer
        let supp = document.createElement('p');
        supp.classList.add('deleteItem');
        supp.innerHTML = 'Supprimer';
        divContentStgDelete.appendChild(supp);

        docFrag.appendChild(article);
    }

    //rattachement de la balise article à l'element parent
    let section = document.querySelector('#cart__items');
    section.appendChild(docFrag);
}




//calcul du total des PRODUITS dans le panier
function totalQty(cart) {
    let qty = 0;
    for (let product of cart) {
        qty += Number(product.quantity);
    }
    return qty;
}





//calcul du PRIX TOTAL € dans le panier
function totalPrice(cart, apiData) {
    let prx = 0;
    for (let product of cart) {
        let data = apiData.find((element) => element._id == product.id);
        prx += Number(product.quantity) * Number(data.price);
    }
    return prx;
}





//affichage du prix total et de la quantité total d'article
function displayPrxEtQty(cart, apiData) {
    document.querySelector('#totalQuantity').innerHTML = totalQty(cart);
    document.querySelector('#totalPrice').innerHTML = totalPrice(cart, apiData);
}





//suppression d'un produit du panier
function deleteItem() {
    let articleFromDom = document.querySelectorAll('.cart__item');
    let cart = recupBasket();

    for (let articleProduct of articleFromDom) {
        articleProduct.addEventListener('click', (e) => {
            let target = e.currentTarget;
            let dataId = target.dataset.id;
            let colorId = target.dataset.color;
            let btnSuppClick = e.target.classList.contains('deleteItem');

            if (btnSuppClick) {
                cart = cart.filter((element) => element.color != colorId || element.id != dataId)
                localStorage.setItem('panier', JSON.stringify(cart));
                window.location.reload();
            }

            //si tableau vide (avec crochet présent), suppression complète du localstorage
            if (cart.length == '') {
                localStorage.removeItem('panier');
            }
        });
    }

}





//modification de la quantité de produit dans le ls grâce à l'evenement change depuis le dom
function localQtyUpdate() {
    let getInput = document.querySelectorAll('.itemQuantity');
    let cart = recupBasket();
    for (let modifyQty of getInput) {
        modifyQty.addEventListener('change', (e) => {
            let dataId = e.target.closest('.cart__item').getAttribute('data-id');
            let dataColor = e.target.closest('.cart__item').getAttribute('data-color');

            for (let product of cart) {
                if (product.id == dataId && product.color == dataColor) {

                    if (modifyQty.value < 1 || modifyQty.value > 100) {
                        modifyQty.value = 0;
                        product.quantity = parseInt(modifyQty.value);
                        localStorage.setItem('panier', JSON.stringify(cart));
                        // window.location.reload();
                        displayPrxEtQty(cart, apiData)
                        alert('Limite autorisé 1-100.')
                    }
                    else {
                        product.quantity = parseInt(modifyQty.value);
                        localStorage.setItem('panier', JSON.stringify(cart));
                        displayPrxEtQty(cart, apiData)
                        // window.location.reload();

                    }

                }
            }
        })
    }
}




////////////////FORMULAIRE DE CONTACT REGEX\\\\\\\\\\\\\\\\\\\\\

//FIRST NAME
// let firstNameRegex = new RegExp(/^[a-zA-Z\u00C0-\u017F\s']+$/);
let firstNameRegex = new RegExp(/^(?!.*\btest|bonjour\b)([A-Za-z\u00C0-\u017F\']+)$/);

let firstNameInput = document.getElementById("firstName");
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

firstNameInput.addEventListener("input", function (event) {
    if (!firstNameRegex.test(event.target.value)) {
        firstNameErrorMsg.textContent = "Prénom non valide";
    } else {
        firstNameErrorMsg.textContent = "";
    }
});

//LAST NAME
let lastNameRegex = new RegExp(/^(?!.*\btest|bonjour\b)([A-Za-z\u00C0-\u017F\']+)$/);

let lastNameInput = document.getElementById("lastName");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

lastNameInput.addEventListener("input", function (event) {
    if (!lastNameRegex.test(event.target.value)) {
        lastNameErrorMsg.textContent = "Nom non valide";
    } else {
        lastNameErrorMsg.textContent = "";
    }
});

//ADRESSE
let addressRegex = new RegExp(/^\d+(,\s*)?\s[a-zA-Z\u00C0-\u017F\s']+$/);

let addressInput = document.getElementById("address");
let addressErrorMsg = document.getElementById("addressErrorMsg");

addressInput.addEventListener("input", function (event) {
    if (!addressRegex.test(event.target.value)) {
        addressErrorMsg.textContent = "Adresse postale non valide";
    } else {
        addressErrorMsg.textContent = "";
    }
});

//CITY
let cityRegex = new RegExp(/^[a-zA-Z\u00C0-\u017F\s']+$/);

let cityInput = document.getElementById("city");
let cityErrorMsg = document.getElementById("cityErrorMsg");

cityInput.addEventListener("input", function (event) {
    if (!cityRegex.test(event.target.value)) {
        cityErrorMsg.textContent = "Ville non valide";
    } else {
        cityErrorMsg.textContent = "";
    }
});

//EMAIL
let emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

let emailInput = document.getElementById("email");
let emailErrorMsg = document.getElementById("emailErrorMsg");

emailInput.addEventListener("input", function (event) {
    if (!emailRegex.test(event.target.value)) {
        emailErrorMsg.textContent = "Adresse e-mail non valide";
    } else {
        emailErrorMsg.textContent = "";
    }
});

