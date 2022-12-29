fetch ('http://localhost:3000/api/products')
.then (function(response) {
    return response.json()

    .then (function(data) {
        // console.log(data);

        //affichage message 'panier vide' si rien dans le localstorage
        if (localStorage.length == '') {
            let cartItemId = document.querySelector('#cart__items');
            let createp = document.createElement('p');
            let textp = document.createTextNode('Panier vide pour le moment...');
            
            cartItemId.appendChild(createp);
            createp.appendChild(textp);
            document.querySelector('p').style.textAlign = 'center';
        } else {
            for (let i = 0; i < data.length; i++) {

                //recupération et conversion des données stockées dans l'api
                let carts = JSON.parse(localStorage.getItem('panier'));
    
                // iteration sur le panier du localstorage afin de verifier les infos avec les données de l'api
                for (let cart of carts) {
                    if (data[i]._id == cart.id) {
                        // console.log(data);
                        //creation de l'element article
                        let sectionId = document.querySelector('#cart__items');
                        let articleCart = document.createElement('article');
                        articleCart.classList.add('cart__item');
                        articleCart.dataset.id = cart.id;
                        articleCart.dataset.color = cart.color;
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
                                pTxtColor.innerHTML = cart.color;
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
                            pQuantity.innerHTML = `Qté : ${cart.quantity}`;
                            divCartItemContentSettingsQuantity.appendChild(pQuantity);
    
                            let inputCartItemContentSettingsQuantity = document.createElement('input');
                            inputCartItemContentSettingsQuantity.type = 'number';
                            inputCartItemContentSettingsQuantity.classList.add('itemQuantity');
                            inputCartItemContentSettingsQuantity.name = 'itemQuantity';
                            inputCartItemContentSettingsQuantity.min = '1';
                            inputCartItemContentSettingsQuantity.max = '100';
                            // inputCartItemContentSettingsQuantity.value = cart.quantity;
                            divCartItemContentSettingsQuantity.appendChild(inputCartItemContentSettingsQuantity);
    
                            let divCartItemContentSettingsDelete = document.createElement('div');
                            divCartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete')
                            let pTextDelete = document.createElement('p');
                            pTextDelete.classList.add('deleteItem');
                            pTextDelete.innerHTML = 'Supprimer';
                            divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);
                            divCartItemContentSettingsDelete.appendChild(pTextDelete);
                    }
                } 
            }
        }
    });
});