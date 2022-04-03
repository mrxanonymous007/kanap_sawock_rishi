
// répartition des données récuperer par l'api et affichage dans le dom

    // var result = await getArticles ()
    // console.log(result)
    // .then(function (resultatAPI){
    //     const articles = resultatAPI;
    //     console.table(articles);
    //     for (let article in articles) {

    //         // Insertion de l'élément "a"
    //         let productLink = document.createElement("a");
    //         document.querySelector(".items").appendChild(productLink);
    //         productLink.href = `product.html?id=${resultatAPI[article]._id}`;
    //     }
    // })
    // .catch (function(error){
    //     console.log(error);
    //     return error;
    // });

    fetch("http://localhost:3000/api/products").then(response =>{
        console.log(response);
        if(response.ok){
            console.log(response.json()); //first consume it in console.log
            console.log(response.body);
            return response.json(); //then consume it again, the error happens
        }
});