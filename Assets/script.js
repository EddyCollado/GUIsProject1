$( document ).ready(function() {
    $('select').formSelect();
    
    var clientId = "332c5e1a03234f338379231dadc0809c";
    var redirectUri = window.location.href;
    var authorizationToken = "Bearer "; //this returns in the url after login
    var queryURL; // "https://api.spotify.com/v1/search?q=" + searchTerm + "&type=artist";
    var searchTerm; //this is the user input
    var scope = 'user-library-modify';//this will be added to our auth link

    var spotAuth = $("#spotify-auth");
    var mixButton = $("#mix-button");
    var spotifyQuery = "prince"
    var spotifyCat = "artist"
    var returnedAuthorizationToken; 
    var searchTerm = "margarita";
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchTerm;
    var cocktailTitle = $("#cocktail-title");
    var cocktailImage = $("#cocktail-image");
    var cocktailRecipe = $("#cocktail-recipe");
    var playlistOneTitle = $("#playlist-one-title");
    var playlistOneDesc = $("#playlist-one-desc");
    var playlistOneLink =$("#playlist-one-link");
    var playlistTwoTitle = $("#playlist-two-title");
    var playlistTwoDesc = $("#playlist-two-desc");
    var playlistTwoLink =$("#playlist-two-link");
    var playlistThreeTitle = $("#playlist-three-title");
    var playlistThreeDesc = $("#playlist-three-desc");
    var playlistThreeLink =$("#playlist-three-link");

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

    spotAuth.on("click", function(event){
        event.preventDefault();
        authTokenLink()});
    

    mixButton.on("click",function(){
        getAuthorizationToken();
        console.log("this");
        
    $.ajax({
        url: "https://api.spotify.com/v1/search?q="+spotifyQuery+"&type="+spotifyCat,
        type: 'GET',
        headers: {
            'Authorization' :  authorizationToken
        },
        success: function(data) {
            console.log(data);
        }
    });
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
    


    });


    
    

    
    });

