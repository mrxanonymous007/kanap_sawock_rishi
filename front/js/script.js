fetch("http://localhost:3000/api/products")

    .then (function (response) {
        //ici on formate la réponse, càd on récupère du JSON
        return response.json()

            .then (function (data) {
                //renvoie d'une nouvelle promesse, on récupère le résultat de la promesse du dessus
                // console.log(data);
                //mettre une boucle for avec incrémentation +1
                for (let i = 0; i < data.length; i++) {

                    let itemsSection = document.querySelector('.items');
                    // console.log(itemsSection);

                    //creation de l'element a avec pour attribut href
                    let aElem = document.createElement('a');
                    aElem.href = './product.html?id=' + data[i]._id;
                    itemsSection.appendChild(aElem); /*RATTACHEMENT DE a À section*/

                    //creation de l'element article
                    let articleElem = document.createElement('article');
                    aElem.appendChild(articleElem);
                    
                    //creation de l'element img avec ses deux attributs href et alt
                    let imgElem = document.createElement('img');
                    imgElem.src = data[i].imageUrl;
                    imgElem.alt = data[i].altTxt;
                    articleElem.appendChild(imgElem); /*RATTACHEMENT DE img À article*/

                    //creation de l'element h3 avec ajout d'une class ainsi que le nom du produit
                    let h3Elem = document.createElement('h3');
                    h3Elem.classList.add('productName');
                    h3Elem.innerHTML = data[i].name;
                    articleElem.appendChild(h3Elem); /*RATTACHEMENT DE h3 À article*/

                    //creation de l'élement p avec ajout d'une class ainsi que la description du produit
                    let pElem = document.createElement('p');
                    pElem.classList.add('productDescription');
                    pElem.innerHTML = data[i].description;
                    articleElem.appendChild(pElem); /*RATTACHEMENT DE p À article*/
                }
            });

    }).catch (function (err) {
        //si api éteint ou refus de connexion une boîte de dialogue apparaît avec un message d'erreur
       alert('Erreur: ' + err);

        err = 'Oups... Veuillez réessayer plus tard !';
        let classTitles = document.querySelector('.titles');
        let pElemerr = document.createElement('p');
        let pTxt = document.createTextNode(err);

        classTitles.appendChild(pElemerr);
        pElemerr.appendChild(pTxt);

        document.querySelector('p').style.textAlign = 'center';
    });