//Lecture du DOM avant de faire intervenir le script
$(document).ready(function(){

    /* ------ TRAITEMENT API POUR LE FEED CITATIONS ------ */

    function reloadFeed() {

    //Enlever le contenu existant
    document.querySelectorAll(".post").forEach(el => el.remove());

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

    }

    reloadFeed();

    /* ------ TRAITEMENT POUR RAFRAICHIR LE FEED ------ */
    
    $('.picto-refresh').on("click", function() {
        reloadFeed();
    });

    /* ------ TRAITEMENT POUR SUPPRIMER UN POST ------ */

    $('.picto-delete').on("click", function() {
        //Afficher à l'utilisateur ce qu'il doit faire
        $(".post-feed").after('\
                        <span class="instruction">Cliquer sur la citation à supprimer\
                        </span');
        $(".post").mousedown(function(){
            //On supprime la div du post sur laquelle on vient de cliquer et on enlève l'instruction
            $(this).remove();
            $('.instruction').remove();
        });
    });
    

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
   
    //Récupérer les données du formulaire pour les afficher dans le feed
    
    $("#formPostSubmit").on("click", function() {
        const inputName = document.forms["myPostForm"].elements["postName"].value;
        const inputContent = document.getElementById("postContent").value;
        const inputDate = $("#postDate").val();
        
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

    //Ajout du bloc formulaire
    $('#btn-add').on("click", function() {
        $('#addPictureForm').toggle('hidden');
    });

    //Ajout de la photo à la galerie
    $('#formPictureSubmit').on("click", function() {
        const inputURL = (document.forms['myPictureForm'].elements['pictureURL'].value);
        $("#gallery").append('<img class="img-gallery" src=" ' + inputURL + ' ">');
    });
    
    /* ------ TRAITEMENT DE LA SUPPRESION D'UNE PHOTO ------ */

    $('#btn-delete').on("click", function() {
        //Afficher à l'utilisateur ce qu'il doit faire
        $("#gallery").before('\
                        <span class="instruction">Cliquer sur la photo à supprimer\
                        </span');
        $(".img-gallery").mousedown(function(){
            //On supprime la div du post sur laquelle on vient de cliquer et on enlève l'instruction
            $(this).remove();
            $('.instruction').remove();
        });
    });

    /* ------ TRAITEMENT DU JEU ------ */

    var playerChoice = '';
    var computerChoice = '';
    
    $('.picto-game').on("click", function() {

        //Enlever les résultats
        $("#gameResult").empty();

        //Affectation de playerChoice selon l'élément cliqué par l'utilisateur
        playerChoice = $(this).attr('id');

        //Affectation de computerChoice aléatoirement
        computerChoice = randomShifumi();

        //Afficher les choix et le résultat
        $("#gameResult").append('\
            <h2>Résultat</h2>\
            <p>' + findWinner(playerChoice, computerChoice) + '</p>\
            <div id="result-game-picto" class="container-picto">\
                <figure class="picto">\
                    <img src="/image/picto/' + playerChoice +'.svg" width="50">\
                    <figcaption>Mon choix</figcaption>\
                </figure>\
                <figure class="picto">\
                    <img src="/image/picto/' + computerChoice + '.svg" width="50">\
                    <figcaption>Choix de l ordinateur</figcaption>\
                </figure>\
            </div>\
        ');

    });

    const randomShifumi = () => {
        let computerRandom = Math.floor(Math.random() * 3);
        const computerTab = ['rock', 'paper', 'scissors'];
        return computerTab[computerRandom];
    }

    function findWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return "C'est une égalité :|";
        } else if (playerChoice === "rock") {
                if (computerChoice === "scissors") {
                    return "Bravo, vous avez gagné :) ";
                } else {
                    return "Mince, vous avez perdu :( ";
                }
        } else if (playerChoice === "paper") {
                if (computerChoice === "rock") {
                    return "Bravo, vous avez gagné :) ";
                } else {
                    return "Mince, vous avez perdu :( ";
                }
        } else if (playerChoice === "scissors") {
                if (computerChoice === "paper") {
                    return "Bravo, vous avez gagné :) ";
                } else {
                    return "Mince, vous avez perdu :( ";
                }
        } else {
            return "Oups, there is an issue, this case wouldn't happen";
        }
    }

});
