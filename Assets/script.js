$( document ).ready(function() {
    $('select').formSelect();

    var partyObject =[
        {name: "Hoe Down", keyword: "country", drink: "Beer"},
        {name: "Totally Radical", keyword:"80s", drink: "city slicker"},
        {name: "Geek Night", keyword:["megaman","rick and morty","smash bros"], drink: "grim reaper"},
        {name: "Basic Bitch", keyword:"top 40", drink: "cosmopolitan"},
        {name: "Pre-Gaming", keyword:["top 40", "today's hits","party"], drink: "jello shots"},
        {name: "Night-in", keyword:["chill","relax","classic acoustic"], drink: "whiskey mac"},
        {name: "Porch Sitting", keyword:["country pop","chillin on a dirt road" ], drink: "alabamma slammer"},
        {name: "So Ya Got Dumped", keyword:"breakup songs", drink: "boozy snickers milkshake"},
        {name: "Mad Coding", keyword:["gaming","hallow knight"], drink: "brain fart"},
        {name: "Mine All Day", keyword:"minecraft soundtrack", drink: "limeade"},
        {name: "Hungover AF", keyword:["meditation", "relaxation"], drink: "corpse reviver #2"},
        {name: "Summer BBQ", keyword:["bbq", "4th of july"], drink: "Ice Pick #1"},
        {name: "Frat Party", keyword:["party","bro"], drink: "cherry electric lemonade"},
        {name: "Guys Night", keyword:["party","pump up"], drink: "Gentleman's Club"},
        {name: "Dungeons & Dragons", keyword:["lord of the rings","elder scrolls"],drink: "gideon's green dinosaur"},
        {name: "Girls Night", keyword:["dance","pop","club"],drink: "champagne cocktail"},
        {name: "Party of 1", keyword:["lonely","sad","down in the dumps"],drink: "liquor"},
    ]
    
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
        var selected = $("#form-options").val();
        console.log("item selected",selected);
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

