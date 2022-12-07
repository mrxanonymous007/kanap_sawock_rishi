//recupération de l'id depuis la page accueil de mon produit cliqué
let recupUrl = window.location.search;
// console.log(recupUrl);

//extraction de ?id= et de la string correspondant au produit afin de vérifier si l'id url correspond à _id plus tard
let url = new URLSearchParams(recupUrl).get('id');

fetch("http://localhost:3000/api/products")
    .then(function(response){
        return response.json()
        .then(function(data){
            console.log(data);
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


                    //affichage des couleurs dans le select > option   
                    for (c = 0; c < data[i].colors.length; c++){
                        let selectProduit = document.querySelector('#colors');
                        let optionProduit = document.createElement('option');
                        optionProduit.value = data[i].colors[c];
                        // console.log(data[i].colors[c]);

                        let affichageTxtProduit = document.createTextNode(data[i].colors[c]);
                       
                        selectProduit.appendChild(optionProduit);
                        optionProduit.appendChild(affichageTxtProduit);
                    }
                    

                }
            };
        });
    });