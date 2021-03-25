$(document).ready(function(){

    $.ajax({
        //L'URL de la requête 
        url: "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand",

        //La méthode d'envoi (type de requête)
        method: "GET",

        //Le format de réponse attendu
        dataType : "json",

    })

 //Ce code sera exécuté en cas de succès - La réponse du serveur est passée à done()

    /*La réponse est un tableau d'objet d'article*/

    .done(function(response){
        response.forEach(article => {
            console.log(article)
            $('.post').append(article.title['rendered'], article.content['rendered'], article['date'] );
        });
        
        
    })

    //Ce code sera exécuté en cas d'échec - L'erreur est passée à fail()
    //On peut afficher les informations relatives à la requête et à l'erreur
    .fail(function(error){
        alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
    })

    //Ce code sera exécuté que la requête soit un succès ou un échec
    .always(function(){
        alert("Requête effectuée");
        
    
    });
});
