$( document ).ready(function() {
    $('select').formSelect();
    
    var clientId = "332c5e1a03234f338379231dadc0809c";
    var redirectUri = window.location.href;
    var authorizationToken = "Bearer "; //this returns in the url after login
    var queryURL; // "https://api.spotify.com/v1/search?q=" + searchTerm + "&type=artist";
    var searchTerm; //this is the user input
    var scope = 'user-library-modify';//this will be added to our auth link
    var spotifyAuthLink = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=` + encodeURIComponent(scope) + '&redirect_uri=' + redirectUri;
    var spotAuth = $("#spotify-auth")

    spotAuth.on("click", function(){
        console.log("clicked")
        window.location.href = spotifyAuthLink;
    })
    //http-server -p 8080

    function getAuthorizationToken(){

        var returnedAuthorizationToken = location.hash.substr(1);
        authorizationToken = "Bearer "+returnedAuthorizationToken.substring(returnedAuthorizationToken.indexOf("=")+1,returnedAuthorizationToken.indexOf("&"));
        console.log(authorizationToken);
        $.ajax({
            url: "https://api.spotify.com/v1/search?q=Prince&type=artist",
            type: 'GET',
            headers: {
                'Authorization' :  authorizationToken
            },
            success: function(data) {
                console.log(data);
            }
        });
    
    }
    getAuthorizationToken();

    var searchTerm = "margarita";
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchTerm;
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
    
    
    
    
    var queryURLtwo = "https://theaudiodb.com/api/v1/json/1/playlist.php?id=15463"
    
    $.ajax({
        url: queryURLtwo,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });

    });

