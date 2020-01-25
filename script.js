$( document ).ready(function() {
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





var accessToken = "XXXXX";

$.ajax({
    url: 'https://api.spotify.com/v1/browse/new-releases',
    type: 'GET',
    headers: {
        'Authorization' : 'Bearer ' + accessToken
    },
    success: function(data) {
        console.log(data);
    }
});

});