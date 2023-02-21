let apiData;
fetch("http://localhost:3000/api/products")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        apiData = data;
        let cart = recupBasket();
        affichagePanier(apiData, cart);
        deleteItem();
        localQtyUpdate();
        displayPrxEtQty(cart, apiData);
        validateForm();
        submitBtnOrder();
    })
    .catch((err) => {
        err = "Panier vide..."
        //condition pour afficher le msg si le LS est vide
        if (localStorage.length == '') {
            let section = document.querySelector("#cart__items");
            let msgTxt = document.createElement("p");
            let txtNode = document.createTextNode(err);
            if (section && msgTxt && txtNode) {
                section.appendChild(msgTxt);
                msgTxt.appendChild(txtNode);
                document.querySelector("p").style.textAlign = "center";
            }
        } else {
            //redirection vers index.html si serveur éteint mais produit dans le LS
            window.location.href = "index.html";
        }
    })

//recuperation du panier stocké dans le localstorage
function recupBasket() {
    let cart = JSON.parse(localStorage.getItem("panier"));
    return cart;
}

//affichage du panier dans le dom
function affichagePanier(apiData, cart) {
    let docFrag = document.createDocumentFragment();
    for (let product of cart) {
        //verif de l'id du produit se trouvant dans le ls et dans l'api afin de faire afficher chaque article
        let data = apiData.find((element) => element._id == product.id);

        ///////////creation de la balise article avec ses differents attributs///////////
        let article = document.createElement("article");
        article.classList.add("cart__item");
        article.setAttribute("data-id", `${product.id}`);
        article.setAttribute("data-color", `${product.color}`);

        ///////////creation div : cart__item__img <<< IMG///////////
        let divImg = document.createElement("div");
        divImg.classList.add("cart__item__img");

        let img = document.createElement("img");
        img.src = data.imageUrl;
        img.alt = data.altTxt;
        article.appendChild(divImg);
        divImg.appendChild(img);

        ///////////creation div : cart__item__content///////////
        let divItemContent = document.createElement("div");
        divItemContent.classList.add("cart__item__content");
        article.appendChild(divItemContent);

        ///////////creation div enfant : cart__item__content__description (nom du produit, couleur et prix)///////////
        let divContentDesc = document.createElement("div");
        divContentDesc.classList.add("cart__item__content__description");
        divItemContent.appendChild(divContentDesc);

        //h2 : nom du produit
        let nameProduct = document.createElement("h2");
        nameProduct.innerHTML = data.name;
        divContentDesc.appendChild(nameProduct);
        //p : couleur du produit
        let colorTxt = document.createElement("p");
        colorTxt.innerHTML = product.color;
        divContentDesc.appendChild(colorTxt);
        //p : prix du produit
        let priceTxt = document.createElement("p");
        priceTxt.innerHTML = `${data.price}€`;
        divContentDesc.appendChild(priceTxt);

        ///////////creation div : cart__item__content__settings///////////
        let divContentSettings = document.createElement("div");
        divContentSettings.classList.add("cart__item__content__settings");
        divItemContent.appendChild(divContentSettings);

        ///////////creation div : cart__item__content__settings__quantity///////////
        let divContentStgQty = document.createElement("div");
        divContentStgQty.classList.add("cart__item__content__settings__quantity");
        divContentSettings.appendChild(divContentStgQty);

        //quantité
        let qty = document.createElement("p");
        qty.innerHTML = `Qté :`;
        divContentStgQty.appendChild(qty);
        //input
        let input = document.createElement("input");
        input.type = "number";
        input.classList.add("itemQuantity");
        input.name = "itemQuantity";
        input.min = 1;
        input.max = 100;
        input.setAttribute("value", `${product.quantity}`);
        divContentStgQty.appendChild(input);

        ///////////creation div : cart__item__content__settings__delete///////////
        let divContentStgDelete = document.createElement("div");
        divContentStgDelete.classList.add("cart__item__content__settings__delete");
        divContentSettings.appendChild(divContentStgDelete);
        //p : supprimer
        let supp = document.createElement("p");
        supp.classList.add("deleteItem");
        supp.innerHTML = "Supprimer";
        divContentStgDelete.appendChild(supp);

        docFrag.appendChild(article);
    }

    //rattachement de la balise article à l'element parent
    let section = document.querySelector("#cart__items");
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
    document.querySelector("#totalQuantity").innerHTML = totalQty(cart);
    document.querySelector("#totalPrice").innerHTML = totalPrice(cart, apiData);
}

//suppression d'un produit du panier
function deleteItem() {
    let articleFromDom = document.querySelectorAll(".cart__item");
    let cart = recupBasket();
    for (let articleProduct of articleFromDom) {
        articleProduct.addEventListener("click", (e) => {
            let target = e.currentTarget;
            let dataId = target.dataset.id;
            let colorId = target.dataset.color;
            let btnSuppClick = e.target.classList.contains("deleteItem");
            if (btnSuppClick) {
                cart = cart.filter((element) => element.color != colorId || element.id != dataId)
                localStorage.setItem("panier", JSON.stringify(cart));
                window.location.reload();
            }
            //si tableau vide (avec crochet présent), suppression complète du localstorage
            if (cart.length == '') {
                localStorage.removeItem("panier");
            }
        });
    }
}

//modification de la quantité de produit dans le ls grâce à l'evenement change depuis le dom
function localQtyUpdate() {
    let getInput = document.querySelectorAll(".itemQuantity");
    let cart = recupBasket();
    for (let modifyQty of getInput) {
        modifyQty.addEventListener('change', (e) => {
            let dataId = e.target.closest(".cart__item").getAttribute("data-id");
            let dataColor = e.target.closest(".cart__item").getAttribute("data-color");
            for (let product of cart) {
                if (product.id == dataId && product.color == dataColor) {
                    /* dans le if, si qté inférieur à 1, input sera à 1 par défaut
                    dans le else if, si qté supérieur à 100, input sera à 100 par défaut */
                    if (modifyQty.value < 1) {
                        modifyQty.value = 1;
                        product.quantity = parseInt(modifyQty.value);
                        localStorage.setItem("panier", JSON.stringify(cart));
                        displayPrxEtQty(cart, apiData)
                        alert("Minimum d\'article autorisé : 1")
                    } else if (modifyQty.value > 100) {
                        modifyQty.value = 100;
                        product.quantity = parseInt(modifyQty.value);
                        localStorage.setItem("panier", JSON.stringify(cart));
                        displayPrxEtQty(cart, apiData)
                        alert("Maximum d\'articles autorisé : 100")
                    } else {
                        product.quantity = parseInt(modifyQty.value);
                        localStorage.setItem("panier", JSON.stringify(cart));
                        displayPrxEtQty(cart, apiData)
                    }
                }
            }
        });
    }
}

/********Début RegExp********/
/* Empêchement au client de valider la commande si la valeur attendu est incorrecte*/
function validateInput(regex, input, errorMsg) {
    input.addEventListener("input", function (event) {
        if (!regex.test(event.target.value)) {
            errorMsg.textContent = "Entrée non valide";
            input.setCustomValidity("Entrée non valide. Veuillez entrer une valeur valide.");
        } else {
            errorMsg.textContent = "";
            input.setCustomValidity("");
        }
    });
}

function validateForm() {
    // regexp firstName
    const firstNameRegex = new RegExp(/^(?!.*\btest|bonjour|prenom|prénom|nom|adresse|email|e-mail\b)([A-Z-a-z\u00C0-\u017F\s']+)$/);
    const firstNameInput = document.getElementById("firstName");
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    if (firstNameInput) {
        validateInput(firstNameRegex, firstNameInput, firstNameErrorMsg);
    }

    //regexp lastName
    const lastNameRegex = new RegExp(/^(?!.*\btest|bonjour|prenom|prénom|nom|adresse|email|e-mail\b)([A-Z-a-z\u00C0-\u017F\s']+)$/);
    const lastNameInput = document.getElementById("lastName");
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if (lastNameInput) {
        validateInput(lastNameRegex, lastNameInput, lastNameErrorMsg);
    }

    //regexp address
    // const addressRegex = new RegExp(/^[a-z-A-Z\u00C0-\u017F\s']+$/);
    const addressRegex = new RegExp(/^[0-9]{1,4}|,|[a-z-A-Z\u00C0-\u017F\s']+$/);
    const addressInput = document.getElementById("address");
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    if (addressInput) {
        validateInput(addressRegex, addressInput, addressErrorMsg);
    }

    //regexp city
    const cityRegex = new RegExp(/^(?!.*\btest|bonjour|prenom|prénom|nom|adresse|email|e-mail\b)([A-Z-a-z\u00C0-\u017F\s']+)$/);
    const cityInput = document.getElementById("city");
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    if (cityInput) {
        validateInput(cityRegex, cityInput, cityErrorMsg);
    }

    //regexp email
    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const emailInput = document.getElementById("email");
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    if (emailInput) {
        validateInput(emailRegex, emailInput, emailErrorMsg);
    }
    /********Fin RegExp********/
}

//Bouton COMMANDER!
let form = document.querySelector(".cart__order__form");
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        //console.log(form.firstName.value)
        if (form.firstName && form.lastName && form.city && form.address && form.email) {
            let contactForm = {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                city: form.city.value,
                address: form.address.value,
                email: form.email.value,
            }

            let cart = recupBasket();
            let products = [];
            for (let product of cart) {
                products.push(product.id);
            }

            //création d'un objet réunissant le formulaire de contact et des infos des produits
            let orderedUser = {
                contact: contactForm,
                products: products
            };
            postRequestSent(orderedUser)
        }
    });

}

//si panier vide message d'erreur indiquant à l'utilisateur d'ajouter un article dans le panier
function submitBtnOrder() {
    let cart = recupBasket();
    let btn = document.querySelector(".cart__order__form");
    if (btn) {
        btn.addEventListener("submit", (e) => {
            e.preventDefault();
            //vérifie si le localstorage possède 0 article
            if (cart == null || undefined || 0) {
                alert("Veuillez ajouter un article dans le panier !")
            }
        }
        )
    }
}

//envoie requête POST au serveur
function postRequestSent(orderedUser) {
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderedUser),
    })
        .then((response) => {
            return response.json();
        })
        //récupère l'identifiant de la commande à partir de l'objet JSON renvoyé
        .then((data) => {
            return data.orderId;
        })
        //utilise l'identifiant de la commande pour générer un lien de confirmation et rediriger le client vers confirmation.html
        .then((orderId) => {
            window.location.href = "confirmation.html?" + `id=${orderId}`;
            localStorage.clear();
            displayOrderId();
            return orderId;
        })
        .catch((error) => {
            window.location.href = "index.html";
        });
}

//récupération de l'id d'une commande à partir de l'url de la page puis l'affiche dans le dom
function displayOrderId() {
    let url = new URL(window.location.href);
    let orderId = url.searchParams.get("id");
    if (orderId) {
        document.querySelector("#orderId").textContent = orderId;
    }
}
displayOrderId();
