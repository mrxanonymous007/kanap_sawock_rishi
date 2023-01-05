fetch('http://localhost:3000/api/products')
    .then(function (response) {
        return response.json()

            .then(function (data) {

                for (let i = 0; i < data.length; i++) {

                    //recupération et conversion des données stockées dans l'api
                    let cart = JSON.parse(localStorage.getItem('panier'));

                    // iteration sur le panier du localstorage afin de verifier les infos avec les données de l'api
                    for (let produit of cart) {

                        //si aucune condition affichage de toutes les données de l'api
                        if (data[i]._id == produit.id) {
                            //creation de l'element article
                            let sectionId = document.querySelector('#cart__items');
                            let articleCart = document.createElement('article');
                            articleCart.classList.add('cart__item');
                            articleCart.dataset.id = produit.id;
                            articleCart.dataset.color = produit.color;
                            sectionId.appendChild(articleCart);

                            //creation de la div : cart__item__img ainsi que la balise img
                            let divItemImg = document.createElement('div');
                            divItemImg.classList.add('cart__item__img');
                            let imgCart = document.createElement('img');
                            imgCart.src = data[i].imageUrl;
                            imgCart.alt = data[i].altTxt;
                            articleCart.appendChild(divItemImg);
                            divItemImg.appendChild(imgCart);

                            //creation de la div : cart__item__content
                            let divItemContent = document.createElement('div');
                            divItemContent.classList.add('cart__item__content');
                            articleCart.appendChild(divItemContent);

                            //creation de la div : cart__item__content__description à l'intérieur de la div : cart__item__content
                            let divItemContentDescription = document.createElement('div');
                            divItemContentDescription.classList.add('cart__item__content__description');
                            divItemContent.appendChild(divItemContentDescription);

                            /*creation du h2(nom du produit), p(couleur) et p(prix) 
                            à l'intérieur de la div : cart__item__content__description*/
                            let h2TxtTitle = document.createElement('h2');
                            h2TxtTitle.innerHTML = data[i].name;
                            divItemContentDescription.appendChild(h2TxtTitle);

                            let pTxtColor = document.createElement('p');
                            pTxtColor.innerHTML = produit.color;
                            divItemContentDescription.appendChild(pTxtColor);

                            let pTxtPrice = document.createElement('p');
                            pTxtPrice.innerHTML = `${data[i].price} €`;
                            divItemContentDescription.appendChild(pTxtPrice);

                            //creation div : cart__item__content__settings à l'interieur de div : cart__item__content
                            let divCartItemContentSettings = document.createElement('div');
                            divCartItemContentSettings.classList.add('cart__item__content__settings');
                            divItemContent.appendChild(divCartItemContentSettings);

                            let divCartItemContentSettingsQuantity = document.createElement('div');
                            divCartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
                            divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);

                            let pQuantity = document.createElement('p');
                            pQuantity.innerHTML = `Qté : ${produit.quantity}`;
                            divCartItemContentSettingsQuantity.appendChild(pQuantity);

                            let inputCartItemContentSettingsQuantity = document.createElement('input');
                            inputCartItemContentSettingsQuantity.type = 'number';
                            inputCartItemContentSettingsQuantity.classList.add('itemQuantity');
                            inputCartItemContentSettingsQuantity.name = 'itemQuantity';
                            inputCartItemContentSettingsQuantity.min = '1';
                            inputCartItemContentSettingsQuantity.max = '100';
                            inputCartItemContentSettingsQuantity.value = produit.quantity;
                            divCartItemContentSettingsQuantity.appendChild(inputCartItemContentSettingsQuantity);

                            let divCartItemContentSettingsDelete = document.createElement('div');
                            divCartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete')
                            let pTextDelete = document.createElement('p');
                            pTextDelete.classList.add('deleteItem');
                            pTextDelete.innerHTML = 'Supprimer';
                            divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);
                            divCartItemContentSettingsDelete.appendChild(pTextDelete);


                            //évènement 'change'
                            // let sectionProduct = document.querySelector('#cart__items');
                            // sectionProduct.addEventListener('change', () => {
                            //     let articleCartItem = document.querySelector('.cart__item');
                            //     let dataId = articleCartItem.closest('article').getAttribute('data-id');
                            //     let dataColor = articleCartItem.closest('article').getAttribute('data-color');


                            // });

                            // let deleteItem = document.querySelector('.deleteItem');
                            // deleteItem.addEventListener('click', () => {
                            //     window.location.reload();

                            //     //récupération UNIQUE data-id et data-color depuis le DOM SANS récupérer toutes les données
                            //     let articleCartItem = document.querySelector('.cart__item');
                            //     let dataId = articleCartItem.closest('article').getAttribute('data-id');
                            //     let dataColor = articleCartItem.closest('article').getAttribute('data-color');

                            //     if (dataId === produit.id && dataColor === produit.color) {
                            //         let deleteItem = document.querySelector('.deleteItem');
                            //         localStorage.removeItem(dataId, dataColor)
                            //     }
                            // })

                            // let selectArticle = document.querySelector('.cart__item');
                            // let localstorageAllProducts = localStorage.getItem('panier');
                            // let productParse = JSON.parse(localstorageAllProducts);

                            // for (let eachArticleProduct of selectArticle) {
                            //     eachArticleProduct.addEventListener('click', (ev) => {
                            //         let targetArticle = ev.currentTarget;
                            //         let deleteBtnContainsClass = ev.target.classList.contains('deleteItem');

                            //         if (deleteBtnContainsClass) {
                            //             let collectDataId = articleCart.dataset.id;
                            //             productParse = productParse.filter(p => p.id.toString() !== collectDataId.toString());
                            //             localStorage.setItem('panier', JSON.stringify(cart));
                            //         }
                            //     })
                            // }

                            // if (localStorage.getItem('panier')) {
                            //     let cart = JSON.parse(localStorage.getItem('panier'));
                            //     //produit sous forme d'objet avec id, quantité, color
                            //     let productLs = {
                            //         id: idCart,
                            //         quantity: Number(quantityCart),
                            //         color: valueCart
                            //     };
                            //     let addNewItem = true;
                            //     for (let produit of cart) {
                            //         if (productLs.id == produit.id && productLs.color == produit.color) {
                            //             produit.quantity += productLs.quantity;
                            //             addNewItem = false;
                            //         };
                            //     }
                            //     if (addNewItem == true) {
                            //         cart.push(productLs);
                            //     };
                            //     let stringifyEmptyArray = localStorage.setItem('panier', JSON.stringify(cart));



                            // } else {

                            //     //tableau vide par défaut
                            //     let cart = [];
                            //     //produit sous forme d'objet avec id, quantité, color
                            //     let productLs = {
                            //         id: idCart,
                            //         quantity: Number(quantityCart),
                            //         color: valueCart
                            //     };
                            //     let addNewItem = true;
                            //     for (let produit of cart) {
                            //         if (productLs.id == produit.id && productLs.color == produit.color) {
                            //             produit.quantity += productLs.quantity;
                            //             addNewItem = false;
                            //         };
                            //     }
                            //     if (addNewItem == true) {
                            //         cart.push(productLs);
                            //     };
                            //     let stringifyEmptyArray = localStorage.setItem('panier', JSON.stringify(cart));
                            // }




                        }
                    }

                }
            });
    }).catch(function (msgPanierVide) {
        //affichage message 'panier vide' si rien dans le localstorage
        msgPanierVide = 'Panier vide pour le moment...'

        if (localStorage.length == '') {

            let cartItemId = document.querySelector('#cart__items');
            let createp = document.createElement('p');
            let textp = document.createTextNode(msgPanierVide);

            cartItemId.appendChild(createp);
            createp.appendChild(textp);
            document.querySelector('p').style.textAlign = 'center';
        }
    });