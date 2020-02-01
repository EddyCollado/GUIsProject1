$( document ).ready(function() {
    $('select').formSelect();
    $("#modal").modal();
    $("#modal").modal('open');

    var partyObject =[
        {name: "Hoe Down", keyword: ["country","honky tonk","country pop"], drink: "ACID"},
        {name: "Totally Radical", keyword:["80s","80s pop","new wave"], drink: "city slicker"},
        {name: "Geek Night", keyword:["video games","anime","gaming"], drink: "grim reaper"},
        {name: "Basic Bitch", keyword:["usa top 40","divas","dance hits"], drink: "cosmopolitan"},
        {name: "Pre-Gaming", keyword:["usa top 40", "pre game","party"], drink: "jello shots"},
        {name: "Night-in", keyword:["chill","relax","classic acoustic"], drink: "whisky mac"},
        {name: "Porch Sitting", keyword:["chill","outside","porch"], drink: "alabama slammer"},
        {name: "So Ya Got Dumped", keyword:["breakup","lost love","power ballad"], drink: "boozy snickers milkshake"},
        {name: "Mad Coding", keyword:["gaming","lofi hip hop","coding"], drink: "brain fart"},
        {name: "Mine All Day", keyword:["minecraft","gaming","chiptune"], drink: "limeade"},
        {name: "Hungover AF", keyword:["meditation", "relaxation","ambient"], drink: "corpse reviver #2"},
        {name: "Summer BBQ", keyword:["bbq","4th of july","america"], drink: "Ice Pick #1"},
        {name: "Frat Party", keyword:["workout","drinking","frat"], drink: "cherry electric lemonade"},
        {name: "Guys Night", keyword:["sports","pump up","cigars"], drink: "Gentleman's Club"},
        {name: "Dungeons & Dragons", keyword:["lord of the rings","adventure","fantasy"],drink: "gideon's green dinosaur"},
        {name: "Girls Night", keyword:["girl","pop","club"],drink: "champagne cocktail"},
        {name: "Party of 1", keyword:["lonely","sad","quiet"],drink: "long vodka"},
    ]
    
    var clientId = "332c5e1a03234f338379231dadc0809c";
    var redirectUri = window.location.href;
    var authorizationToken = "Bearer "; //this returns in the url after login
    // "https://api.spotify.com/v1/search?q=" + searchTerm + "&type=artist";
     //this is the user input
    var scope = 'user-library-modify';//this will be added to our auth link

    var spotAuth = $("#spotify-auth");
    var mixButton = $("#mix-button");
    var spotifyQuery = "prince"
    var spotifyCat = "playlist"
    var returnedAuthorizationToken; 

    var cocktailTitle = $("#cocktail-title");
    var cocktailImage = $("#cocktail-image");
    var cocktailRecipe = $("#cocktail-recipe");
    var playlistOneTitle = $("#playlist-one-title");
    var playlistOneDesc = $("#playlist-one-desc");
    var playlistOneLink =$("#playlist-one-link");
    var playlistOneImage = $("#playlist-one-image");
    var playlistTwoTitle = $("#playlist-two-title");
    var playlistTwoDesc = $("#playlist-two-desc");
    var playlistTwoLink =$("#playlist-two-link");
    var playlistTwoImage = $("#playlist-two-image");
    var playlistThreeTitle = $("#playlist-three-title");
    var playlistThreeDesc = $("#playlist-three-desc");
    var playlistThreeLink =$("#playlist-three-link");
    var playlistThreeImage = $("#playlist-three-image");
    var drinkGlass = $("#drink-glass");
    var recipeCard =$("#recipe-card");
    var playlistCards =$("#playlist-cards");
    var recipeList = $("#recipe-list");
    var responseArea =$("#response-area");
    var partyName =$("#party-name");
    var searchCard = $("#search-card");
    var randomButton =$("#random-button");
    var themeInput =$("#theme-input");



    function authTokenLink(){
        var spotifyAuthLink = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=` + encodeURIComponent(scope) + '&redirect_uri=' + redirectUri;
        console.log(spotifyAuthLink)
        window.location.href = spotifyAuthLink;
    };
    //http-server -p 8080
    
    function getAuthorizationToken(){

        returnedAuthorizationToken = location.hash.substr(1);
        authorizationToken = "Bearer "+returnedAuthorizationToken.substring(returnedAuthorizationToken.indexOf("=")+1,returnedAuthorizationToken.indexOf("&"));
        console.log(authorizationToken);

    
    };
    function disableAuth(){
        if (authorizationToken !== "Bearer "){
            spotAuth.addClass('disabled');
            spotAuth.text("Close");
            console.log("this");
        } else { 
            spotAuth.attr("src","btn waves-effect waves-light");
            console.log("that");
        };
    };
    getAuthorizationToken();
    disableAuth();
    
    spotAuth.on("click", function(event){
        event.preventDefault();
        authTokenLink()});
    

    mixButton.on("click",function(event){
        event.preventDefault();
        getAuthorizationToken();
        recipeList.empty();
        spotAuth.attr("class","btn waves-effect waves-light hide");
        var selected = parseInt($("#form-options").val());
        var randomNumber = Math.floor(Math.random()*3);
        console.log(randomNumber);
        console.log(partyObject[selected].name);
        spotifyQuery = partyObject[selected].keyword[randomNumber];
        var searchTerm = partyObject[selected].drink;
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchTerm;
        recipeCard.attr("class","card-content white-text");
        playlistCards.attr("class","card-content white-text");
        responseArea.attr("class","card blue-grey darken-1");
        searchCard.attr("class", "col s3");
        partyName.text(partyObject[selected].name);

        
    $.ajax({
        url: "https://api.spotify.com/v1/search?q="+spotifyQuery+"&type="+spotifyCat,
        type: 'GET',
        headers: {
            'Authorization' :  authorizationToken
        },
        success: function(data) {
            
            console.log(data);
            var imageOne = data.playlists.items[0].images[0].url
            var hrefOne = data.playlists.items[0].external_urls.spotify
            playlistOneTitle.text(data.playlists.items[0].name);
            playlistOneImage.attr("src",imageOne);
            playlistOneLink.attr("href",hrefOne);
            playlistOneDesc.text(data.playlists.items[0].description);
            var imageTwo = data.playlists.items[1].images[0].url
            var hrefTwo = data.playlists.items[1].external_urls.spotify
            playlistTwoTitle.text(data.playlists.items[1].name);
            playlistTwoImage.attr("src",imageTwo);
            playlistTwoLink.attr("href",hrefTwo);
            playlistTwoDesc.text(data.playlists.items[1].description);
            var imageThree = data.playlists.items[2].images[0].url
            var hrefThree = data.playlists.items[2].external_urls.spotify
            playlistThreeTitle.text(data.playlists.items[2].name);
            playlistThreeImage.attr("src",imageThree);
            playlistThreeLink.attr("href",hrefThree);
            playlistThreeDesc.text(data.playlists.items[2].description);
        }
    });
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        cocktailTitle.text(response.drinks[0].strDrink);
        drinkGlass.text(response.drinks[0].strGlass);
        cocktailRecipe.text(response.drinks[0].strInstructions);
        var imageSrc = response.drinks[0].strDrinkThumb;
        cocktailImage.attr("src", imageSrc);

        
        for (i=1; i<15 ; i++ ) {
            var stringIndex = "strIngredient"+i;
            var stringAmount = "strMeasure"+i;
            var drinksListObject = response.drinks[0];
            console.log(stringIndex)
            console.log(drinksListObject[stringIndex])
            if (drinksListObject[stringIndex] !== null){
            var newIngredient = $("<li>");
            var ingredientClass = "collection-item ingredient"
            recipeList.append(newIngredient);
            newIngredient.attr("class",ingredientClass);
            newIngredient.text(response.drinks[0][stringIndex]+":       "+response.drinks[0][stringAmount]);
            };
        };


    });
    


    });

    randomButton.on("click",function(event){
        event.preventDefault();
        getAuthorizationToken();
        recipeList.empty();
        spotAuth.attr("class","btn waves-effect waves-light hide");
        var spotifyQuery = themeInput.val();
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        partyName.text(themeInput.val());
        recipeCard.attr("class","card-content white-text");
        playlistCards.attr("class","card-content white-text");
        responseArea.attr("class","card blue-grey darken-1");
        searchCard.attr("class", "col s3");

        $.ajax({
            url: "https://api.spotify.com/v1/search?q="+spotifyQuery+"&type="+spotifyCat,
            type: 'GET',
            headers: {
                'Authorization' :  authorizationToken
            },
            success: function(data) {
                console.log(data);
                var imageOne = data.playlists.items[0].images[0].url
                var hrefOne = data.playlists.items[0].external_urls.spotify
                playlistOneTitle.text(data.playlists.items[0].name);
                playlistOneImage.attr("src",imageOne);
                playlistOneLink.attr("href",hrefOne);
                playlistOneDesc.text(data.playlists.items[0].description);
                var imageTwo = data.playlists.items[1].images[0].url
                var hrefTwo = data.playlists.items[1].external_urls.spotify
                playlistTwoTitle.text(data.playlists.items[1].name);
                playlistTwoImage.attr("src",imageTwo);
                playlistTwoLink.attr("href",hrefTwo);
                playlistTwoDesc.text(data.playlists.items[1].description);
                var imageThree = data.playlists.items[2].images[0].url
                var hrefThree = data.playlists.items[2].external_urls.spotify
                playlistThreeTitle.text(data.playlists.items[2].name);
                playlistThreeImage.attr("src",imageThree);
                playlistThreeLink.attr("href",hrefThree);
                playlistThreeDesc.text(data.playlists.items[2].description);
            }
        });
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            cocktailTitle.text(response.drinks[0].strDrink);
            drinkGlass.text(response.drinks[0].strGlass);
            cocktailRecipe.text(response.drinks[0].strInstructions);
            var imageSrc = response.drinks[0].strDrinkThumb;
            cocktailImage.attr("src", imageSrc);
            
            for (i=1; i<15 ; i++ ) {
                var stringIndex = "strIngredient"+i;
                var stringAmount = "strMeasure"+i;
                var drinksListObject = response.drinks[0];
                console.log(stringIndex)
                console.log(drinksListObject[stringIndex])
                if (drinksListObject[stringIndex] !== null){
                var newIngredient = $("<li>");
                var ingredientClass = "collection-item ingredient";
                recipeList.append(newIngredient);
                newIngredient.attr("class",ingredientClass);
                newIngredient.text(response.drinks[0][stringIndex]+":       "+response.drinks[0][stringAmount]);
                };
            };
    
    
        });
    });

    
    

    
    });

