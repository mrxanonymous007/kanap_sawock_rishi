fillSection();

    function fillSection() {
        fetch("http://localhost:3000/api/products").then(function(response){
            
            if (response.ok) {
                return response.json(); 
            }
            })
            .then(function(responses){
            console.log(responses)
            
            // .catch(function(error){
            // });
            
            for (let i = 0; i < responses.length; i++) {

                let productLink = document.createElement("a");
                let article = document.createElement("article");
                let images = document.createElement("img");
                let title = document.createElement('h3');
                let p = document.createElement('p');

                document.querySelector(".items").appendChild(productLink);
                productLink.appendChild(article);
                article.appendChild(images);
                article.appendChild(title);
                article.appendChild(p);
                
                productLink.href = "./product.html?id=" + responses[i]["_id"];
                images.src = responses[i]['imageUrl'];
                images.alt = responses[i]['altTxt'];
                title.className = "productName";
                title.innerHTML = responses[i]["name"]
                p.className = "productDescription";
                p.innerHTML = responses[i]['description'];
            }

        });
    }
