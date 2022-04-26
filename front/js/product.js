
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
// console.log(params);

articleProduct();


    function articleProduct() {

        fetch("http://localhost:3000/api/products").then(function(response){
    
            if (response.ok){
                return response.json();
            }
            })
            .then(function(responses){
            console.table(responses)
            // console.log(responses);
            
            // .catch(function(error){
            // });

        for (let i = 0; i < responses.length; i++) {
            
            if(id == responses[i]['_id']){
                let images = document.createElement("img");
                let titleArticle = document.getElementById('title');
                let priceArticle = document.getElementById('price');
                let descriptionArticle = document.getElementById('description');

                document.querySelector(".item__img").appendChild(images);
                images.src = responses[i]['imageUrl'];
                images.alt = responses[i]['altTxt'];

                titleArticle.innerHTML = responses[i]['name'];
                priceArticle.innerHTML = responses[i]['price'];
                descriptionArticle.innerHTML = responses[i]['description'];

                
                let select = document.getElementById('colors');
                // console.log(select);
                // console.log(responses[i].colors);
                
                responses[i].colors.forEach((colors) => {
                    let selectOptions = document.createElement('option');
                    selectOptions.innerHTML = colors;
                    selectOptions.value = colors;
                    select.appendChild(selectOptions);
                });
            }

        }
    });
    }

