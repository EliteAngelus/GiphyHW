//STOP THE USER FROM HITTING THE ENTER KEY TO SUBMIT.  
  $(document).ready(function() {

  $(window).keydown(function(event){

    if(event.keyCode == 13) {
    
      event.preventDefault();
    
      return false;
    }
  });
});
    
   var gifButtons = ["hip hop", "dance","break dance","pop and lock", "choreography", "dab", "reverse nae nae"];

   var i ="";

     function renderButtons() {
        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-view").empty();
        // Loops through the array of movies
        for (i = 0; i < gifButtons.length; i++) {
          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("giphyButton");
          // Added a data-attribute
          a.attr("data-name", gifButtons[i]);
          // Provided the initial button text
          a.text(gifButtons[i]);
          // Added the button to the buttons-view div
          $("#button-view").append(a);
        }
      }

      // CLICKABLE BUTTON WHICH WILL GRAB THE USERS VALUE FROM AND RENDER IT AS A BUTTON.
     $("#button").on("click", function(event) {

      var gifInput = $("#gif-input").val().trim();

      // pushes userInput into the array
      gifButtons.push(gifInput);
      renderButtons();
      event.preventDefault();
  
  });

          // DISPLAYING THE GIFS ON THE PAGE.
    

      //FUNCTION TO PAUSE THE GIFS
    $(document).on("click", ".giphy", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is. 
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === 'still') {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

  function displayGifs(){
      var input = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag= " + input + ";" + ""
      console.log(queryURL);
      
      $.ajax({
        url: queryURL,
        method: "GET"
      })

       //LITERALLY MEANS DONE GRABBING API
      .done(function(response) {
        //CREATING A PATH AND STORING TO A VARIABLE.
        // var imageUrl = response.data.image_original_url;
        // var imageUrl = response.data.fixed_height_small_still_url;
        //CREATING A IMG TAG
        var myImage = $("<img class='giphy' data-state='still'>");
        //CREATING ATTRBUTES FOR IMAGE TAG.
        myImage.attr("src", response.data.fixed_height_small_still_url);
        myImage.attr("data-still", response.data.fixed_height_small_still_url);
        myImage.attr("data-animate", response.data.fixed_height_small_url);
        //INSERTING THE IMG INTO THE HTML
        $("#images").prepend(myImage);
        // 

        console.log(response);


        
      });
    }

$(document).on("click", ".giphyButton", displayGifs);



renderButtons();

  