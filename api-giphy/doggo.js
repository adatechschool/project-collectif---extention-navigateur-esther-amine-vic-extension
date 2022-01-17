var callBackGetSuccess = function(d) {
    console.log("donnees api", d)
    //alert("Meteo temp  : "  + data.main.temp);
    var image = document.getElementById("gif");
    console.log("sub", d.data[0])
    image.src = d.data[0].images.original.url;
    console.log(d.data[0].images.original.url)
}


function buttonClickGET() {
    var searchterm = "dog";

    var gifurl = "https://api.giphy.com/v1/gifs/search?api_key=lNEB9ueK0HjLAyPTh0pTfO6hAfRb09Sx&q=" + searchterm + "&limit=1&offset=0&rating=g&lang=en"

    $.get(gifurl, callBackGetSuccess).done(function() {
        //alert( "second success" );
      })
      .fail(function() {
        alert( "error" );
      })
      .always(function() {
        //alert( "finished" );
      });
}