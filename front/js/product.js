//recupération de l'id depuis la page accueil de mon produit cliqué
let recupUrl = window.location.search;
// console.log(recupUrl);

//extraction de ?id= et de la string correspondant au produit afin de vérifier si l'id url correspond à _id plus tard
let url = new URLSearchParams(recupUrl).get('id');

fetch("http://localhost:3000/api/products")
    .then(function(response){
        return response.json()
        .then(function(data){
            
            for(let i = 0; i < data.length; i++) {
                
                if(url == data[i]._id){

                    //affichage d'une image unique du produit
                    let recupClassImg = document.querySelector('.item__img');
                    let imgElem = document.createElement('img');
                    imgElem.src = data[i].imageUrl;
                    imgElem.alt = data[i].altTxt;
                    recupClassImg.appendChild(imgElem);
                    

                    //affichage du name unique du produit
                    let nomProduit = document.querySelector('#title');
                    let h1Title = document.createTextNode(data[i].name);
                    nomProduit.appendChild(h1Title);

                    
                    //affichage du prix unique du produit
                    let prixProduit = document.querySelector('#price');
                    let affichagePrixTxt = document.createTextNode(data[i].price);
                    prixProduit.appendChild(affichagePrixTxt);

                    
                    //affichage de la description unique du produit
                    let descriptionProduit = document.querySelector('#description');
                    let affichageDescription = document.createTextNode(data[i].description);
                    descriptionProduit.appendChild(affichageDescription);

                        //creation d'une deuxième boucle afin d'accéder à l'array colors
                        for (c = 0; c < data[i].colors.length; c++){

                            //affichage des couleurs dans le select > option   
                            let selectProduit = document.querySelector('#colors');
                            let optionProduit = document.createElement('option');
                            optionProduit.value = data[i].colors[c];
                            let affichageTxtProduit = document.createTextNode(data[i].colors[c]);
                       
                            selectProduit.appendChild(optionProduit);
                            optionProduit.appendChild(affichageTxtProduit);
                        };
                    
                       

                    //au clic sur le bouton 'ajouter au panier', redirection vers cart.html dans un nouvel onglet
                    let btnOnClick = document.querySelector('#addToCart');
                        btnOnClick.addEventListener('click', () => {
                            // window.open('cart.html', '_blank');
                            let select = document.querySelector('#colors');
                            
                            let valueCart = select.options[select.selectedIndex].value; 
                            let idCart = url;
                            let quantityCart = document.getElementById('quantity').value;

                            //condition pour vérifier si les couleurs et/ou la quantité est compris entre 1-100
                            if(valueCart == '') {
                                alert('Veuillez choisir une couleur !');
                            }else if(quantityCart <= 0 || quantityCart >= 101) {
                                alert('Veuillez renseigner une quantité comprise entre 1 et 100 !');
                            }else {
                                localStorage.setItem('color', valueCart); 
                                localStorage.setItem('id', idCart);
                                localStorage.setItem('quantity', quantityCart);
                            };                  
                    });
                };
            };
        });
    });