//Lecture du DOM avant de faire intervenir le script
$(document).ready(function(){

    /* FONCTION POUR LES API VIA AJAX 

    function callAPI (givenURL) {
        $.ajax({
            url: givenURL,
            method: "GET",
            dataType: "json",
        })
        .done(function(reponse)) {

        }
        .fail(function(error)) {

        }
        .always(function)) {

        }
    };
    */

    /* ------ TRAITEMENT API POUR LE FEED CITATIONS ------ */

    //Appel de l'API via ajax
    $.ajax({
        //L'URL de la requête 
        url: "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand",
        //La méthode d'envoi (type de requête)
        method: "GET",
        //Le format de réponse attendu
        dataType : "json",
    })

 //Ce code sera exécuté en cas de succès - La réponse du serveur est passée à done()

    //La réponse est un tableau d'objet d'article
    .done(function (responseQuote) {
        fillFeed(responseQuote);
    })

    //Ce code sera exécuté en cas d'échec - L'erreur est passée à fail()
    .fail(function(error){
        //On peut afficher les informations relatives à la requête et à l'erreur
        alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
    })

    //Ce code sera exécuté que la requête soit un succès ou un échec
    .always(function(){
    });

    /* ------ TRAITEMENT POUR RAFRAICHIR LE FEED ------ */
    
    /*$('.picto-refresh').on("click", $.ajax({
        url: "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand",
        method: "GET",
        dataType : "json",
    }).done( function(response) {
        console.log(response);
        //fillFeed(response);
    }));*/

    /* ------ TRAITEMENT POUR SUPPRIMER LE FEED ------ */

    

    /* FONCTION POUR REMPLIR LE FEED  */

    function fillFeed(response) {

            //Boucle pour afficher chacun des posts
            response.forEach(post => {
                $(".post-feed").after('\
                        <div class="post">\
                            <quote class="post-content">' + post.content['rendered'] +'</quote>\
                            <h4 class="post-author">' + post.title['rendered'] + '</h4>\
                            <p class="post-date">' + post['date']+ '</p>\
                        </div>'); 
            });

    }

    /* ------ TRAITEMENT DU PLUGGIN POUR LE CARROUSEL ------ */

    $(".single-item").slick({
        dots: true,
        autoplay : true,
        arrows : true,
    });

    /* ------ TRAITEMENT DU DROPDOWN MENU ------ */

    //Fonction qui active les éléments contenus dans la classe dropdown-content
    $(".dropbtn").on("click", function() {
        document.getElementById("myDropdown").classList.toggle("show");
    });

    /* ------ TRAITEMENT DU FORMULAIRE ------ */

    /*Récupérer les données du formulaire pour les mettre dans la console
    $("#formSubmit").on("click", function() {
        console.log(document.forms["myForm"].elements["postName"].value);
        console.log(document.forms["myForm"].elements["postContent"].value);
        console.log(document.forms["myForm"].elements["postDate"].value);
    });
    */
   
    //Récupérer les données du formulaire pour les afficher dans le feed
    
    $("#formPostSubmit").on("click", function() {
        const inputName = document.forms["myForm"].elements["postName"].value;
        const inputContent = document.forms["myForm"].elements["postContent"].value;
        const inputDate = document.forms["myForm"].elements["postDate"].value;
        
        $(".post-feed").after('\
                <div class="post">\
                    <quote class="post-content">' + inputContent +'</quote>\
                    <h4 class="post-author">' + inputName + '</h4>\
                    <p class="post-date">' + inputDate + '</p>\
                </div>');
    
    });

    /* ------ TRAITEMENT DE L'AFFICHAGE GALERIE ------ */

    //Déclaration du tableau d'images
    const gallery = [
        "/image/galery/photo-0.jpeg",
        "/image/galery/photo-1.jpeg",
        "/image/galery/photo-2.jpeg",
        "/image/galery/photo-3.jpeg",
        "/image/galery/photo-5.jpeg"
    ];

    //Boucle pour afficher autant de photos qu'il y a d'éléments dans la tableau
    gallery.forEach(picture => {
        console.log(picture);
        $("#gallery").append('<img class="img-gallery" src=" ' + picture + ' ">');
    });

    $('#btn-line').on("click", function() {
        $('#gallery').removeClass("colonne");
        $('#gallery').addClass("line");
    });

    $('#btn-square').on("click", function() {
        $('#gallery').removeClass("line");
        $('#gallery').addClass("colonne");
    });
    
    /* ------ TRAITEMENT DE L'AJOUT D'UNE PHOTO ------ */

    

});
