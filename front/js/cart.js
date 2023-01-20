fetch('http://localhost:3000/api/products')
    .then(function (response) {
        return response.json()
            .then(function (data) {


                /***********BLOCAGE***********/
                //calcul de la quantité total + affichage dans le dom
                let totalQuantityEmpty = [];
                let sommeQ = 0;
                function totalQuantityTab(tabQ) {
                    for (let q = 0; q < tabQ.length; q++) {
                        sommeQ += tabQ[q];
                    }
                    return sommeQ;
                };
                /***********BLOCAGE***********/



                for (let productData of data) {
                    let cart = JSON.parse(localStorage.getItem('panier'));
                    for (let productLs of cart) {
                        if (productData._id === productLs.id) {

                            let sectionArt = document.querySelector('#cart__items');
                            /* création de la balise ARTICLE avec sa classe et les attributs data-id, data-color */
                            let article = document.createElement('article');
                            article.classList.add('cart__item');
                            article.setAttribute('data-id', `${productLs.id}`);
                            article.setAttribute('data-color', `${productLs.color}`);
                            sectionArt.appendChild(article);
                            // console.log(article); OK


                            //DEBUT
                            /* création de la DIV : cart__item__img */
                            let cart_item_img = document.createElement('div');
                            cart_item_img.classList.add('cart__item__img');
                            //relier la div dans article
                            article.appendChild(cart_item_img);

                            /* création de la balise IMG */
                            let img = document.createElement('img');
                            img.src = `${productData.imageUrl}`;
                            img.alt = `${productData.altTxt}`;
                            //relier à la div parent
                            cart_item_img.appendChild(img);
                            // console.log(cart_item_img);OK
                            //FIN



                            //DEBUT
                            /* création de la DIV : cart__item__content */
                            let cart_item_content = document.createElement('div');
                            cart_item_content.classList.add('cart__item__content');
                            //relier à la balise article
                            article.appendChild(cart_item_content);

                            //DIV 1 : h2, p, p
                            /* création de la DIV : cart__item__content__description */
                            let cart__item__content__description = document.createElement('div');
                            cart__item__content__description.classList.add('cart__item__content__description');
                            //relier la div : cart__item__content__description à la div parent
                            cart_item_content.appendChild(cart__item__content__description);
                            let nameTxt = document.createElement('h2');
                            let colorTxt = document.createElement('p');
                            let priceTxt = document.createElement('p');
                            nameTxt.innerText = `${productData.name}`;
                            colorTxt.innerText = `${productLs.color}`;
                            priceTxt.innerText = `${productData.price}€`;
                            cart__item__content__description.appendChild(nameTxt);
                            cart__item__content__description.appendChild(colorTxt);
                            cart__item__content__description.appendChild(priceTxt);
                            // console.log(cart_item_content); OK

                            //DIV 2 : div, p et input
                            let cart__item__content__settings = document.createElement('div');
                            cart__item__content__settings.classList.add('cart__item__content__settings');
                            cart_item_content.appendChild(cart__item__content__settings);
                            //sous div dans div 2
                            let cart__item__content__settings__quantity = document.createElement('div');
                            cart__item__content__settings__quantity.classList.add('cart__item__content__settings__quantity');
                            cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
                            let qtyTxt = document.createElement('p');
                            qtyTxt.innerHTML = 'Qté :'
                            cart__item__content__settings__quantity.appendChild(qtyTxt);

                            //creation du input
                            let input = document.createElement('input');
                            input.type = 'number';
                            input.classList.add('itemQuantity');
                            input.name = 'itemQuantity';
                            input.min = 1;
                            input.max = 100;
                            input.setAttribute('value', `${productLs.quantity}`);
                            cart__item__content__settings__quantity.appendChild(input);
                            // console.log(input); OK

                            //sous div 2 dans div 2
                            let deleteBtn = document.createElement('div');
                            deleteBtn.classList.add('cart__item__content__settings__delete');
                            cart__item__content__settings.appendChild(deleteBtn);
                            let deleteItemBtn = document.createElement('p');
                            deleteItemBtn.classList.add('deleteItem');
                            deleteItemBtn.innerHTML = 'Supprimer';
                            deleteBtn.appendChild(deleteItemBtn);


                            /***********BLOCAGE***********/
                            let totalQtyPdt = document.querySelector('#totalQuantity');
                            totalQuantityEmpty.push(productLs.quantity);
                            totalQuantityTab(totalQuantityEmpty);
                            totalQtyPdt.innerHTML = sommeQ;
                            // console.log(sommeQ);
                            /***********BLOCAGE***********/
                        }
                    }

                }

                //suppression d'un article unique sur la page panier
                let articleFromDom = document.getElementsByClassName('cart__item');
                let cart = JSON.parse(localStorage.getItem('panier'));

                for (let articleProduct of articleFromDom) {
                    articleProduct.addEventListener('click', (e) => {
                        let targetArticle = e.currentTarget;
                        let dataId = targetArticle.dataset.id;
                        let colorId = targetArticle.dataset.color;
                        let btnSuppClick = e.target.classList.contains('deleteItem');

                        if (btnSuppClick) {
                            cart = cart.filter(p => p.color != colorId || p.id != dataId)
                            localStorage.setItem('panier', JSON.stringify(cart));
                            window.location.reload();
                        }

                        //si tableau vide (avec crochet présent), suppression complète du localstorage
                        if (cart.length == '') {
                            localStorage.removeItem('panier');
                        }
                    });

                }

                //modification de la quantité
                let getInput = document.querySelectorAll('.itemQuantity');
                for (let inputUpdateQuantity of getInput) {
                    inputUpdateQuantity.addEventListener('change', (e) => {

                        let targetE = e.target;
                        let dataId = targetE.closest('.cart__item').getAttribute('data-id');
                        let dataColor = targetE.closest('.cart__item').getAttribute('data-color');

                        for (let p of cart) {
                            if (p.id == dataId && p.color == dataColor) {
                                p.quantity = parseInt(inputUpdateQuantity.value);
                                localStorage.setItem('panier', JSON.stringify(cart))
                                window.location.reload();



                                /***********BLOCAGE***********/
                                //erreur.. alert s'affiche au bon moment mais màj effectué dans le localstorage quand même ET ne prend pas en compte la limite imposé càd min 1 et max 100
                                if (p.quantity <= 0 || p.quantity >= 101) {
                                    alert('quantité incorrecte.. min 1 et max 100')
                                }
                                if (inputUpdateQuantity.value == '' && inputUpdateQuantity.value == 0) {
                                    alert('valeur vide..')
                                }
                                /***********BLOCAGE***********/
                            }
                        }
                    });
                }
            })
    }).catch(function (emptyCart) {
        emptyCart = 'Panier vide...';

        if (localStorage.length == '') {
            let section = document.querySelector('#cart__items');
            let msgTxt = document.createElement('p');
            let txtNode = document.createTextNode(emptyCart);

            section.appendChild(msgTxt);
            msgTxt.appendChild(txtNode);
            document.querySelector('p').style.textAlign = 'center';
        }
    })