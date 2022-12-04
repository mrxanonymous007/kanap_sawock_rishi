fetch("http://localhost:3000/api/product")

    .then(function (response) {
        //ici on formate la réponse, càd on récupère du JSON
        return response.json()

            .then(function (data) {
                //renvoie d'une nouvelle promesse, on récupère le résultat de la promesse du dessus
                console.log(data);

                //mettre une boucle for avec incrémentation +1
                for (let i = 0; i < data.length; i++) {

                    let itemsSection = document.querySelector('.items');
                    console.log(itemsSection);

                    
                    let aElem = document.createElement('a');
                    aElem.href = './product.html?id=' + data[i]._id;


                    /*RATTACHEMENT DE a À section*/
                    itemsSection.appendChild(aElem);


                    let articleElem = document.createElement('article');
                    aElem.appendChild(articleElem);
                    // console.log(articleElem);

                    let imgElem = document.createElement('img');
                    imgElem.src = data[i].imageUrl;
                    imgElem.alt = data[i].altTxt;


                    /*RATTACHEMENT DE img À article*/
                    articleElem.appendChild(imgElem);

                    
                    let h3Elem = document.createElement('h3');
                    h3Elem.classList.add('productName');
                    h3Elem.innerHTML = data[i].name;


                    /*RATTACHEMENT DE h3 À article*/
                    articleElem.appendChild(h3Elem);


                    let pElem = document.createElement('p');
                    pElem.classList.add('productDescription');
                    pElem.innerHTML = data[i].description;


                    /*RATTACHEMENT DE p À article*/
                    articleElem.appendChild(pElem);
                }
            });

    }).catch(function (err) {
        //si par exemple node server pas n'est allumé ou refus de connexion, avec l'api un message d'erreur s'affiche en console
       alert('Erreur: ' + err);

        err = 'Oups... Veuillez réessayer plus tard !';
        let classTitles = document.querySelector('.titles');
        let pElemerr = document.createElement('p');
        let pMsg = document.createTextNode(err);

        classTitles.appendChild(pElemerr);
        pElemerr.appendChild(pMsg);
        
        document.querySelector('p').style.textAlign = 'center';
    });