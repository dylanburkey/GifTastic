// Initial array of topics
var topics = ["Role Models", "Old School", "The 40-Year-Old Virgin", "Superbad", "Ted", "This Is the End", "Step Brothers",
  "Pineapple Express", "21 Jump Street", "Horrible Bosses", "Knocked Up", "Zack and Miri Make a Porno", "Archer"
];
// Create a button for each of the topics 
function renderButtons() {

  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button class = 'button'>");
    a.addClass("giphy");
    //date-name will be the attribute that holds our topics
    a.attr("data-name", topics[i]);
    // Pass in the iniial text for the button
    a.text(topics[i]);
    // Add our button to the "button view"
    $("#buttons-view").append(a);
  }
  displayGiphy();
}


// Create a "view" for each of the button states.
function displayGiphy() {
  $("button").on("click", function () {

      // Use data-bane attribute to pass search params
      var giphy = $(this).attr("data-name");
      if (giphy === "") {
        alert("Please Enter a Valid Search!");
      } else {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=wRIz1g2bmMxoGZOvgWa0K9UcmZjRikyq&limit=10&rating=pg";
        console.log("giphy" + giphy);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function (response) {
          // return API Results. in reponsdse.data 
          var topicsResults = response.data;
          console.log(topicsResults);
          
          // Empty the current buttons from our Container
          $("#gifs-view").empty(topicDisplay);
         
          // Loop through results
          for (var i = 0; i < topicsResults.length; i++) {
            //  Check Search Results
            console.log("Search Results: " + topicsResults);
            var topicDisplay = $("<div class='card'>");
            var rating = topicsResults[i].rating;
            var p = $("<div class = 'card-title'>").text("Rating: " + rating + "  " + giphy);
            var giphyImage = $("<img>");
            giphyImage.attr("src", topicsResults[i].images.fixed_height_still.url);
            giphyImage.attr("data-state", "still");
            giphyImage.attr("data-still", topicsResults[i].images.fixed_height_still.url);
            giphyImage.attr("data-animate", topicsResults[i].images.fixed_height.url);
            giphyImage.addClass("gif");

            // Try and create the "play" effect using data-attributes
            // the "play" state seems funky>when it was working..
            $(".gif").on("click", function () {
            
              var state = $(this).attr("data-state");
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });
            // Append text and images
            topicDisplay.append(p);
            topicDisplay.append(giphyImage);
            console.log(gif);
            $("#gifs-view").append(topicDisplay);
          }
        });
      }
    }

  )
} 

// Add-Giffs function to add
$("#add-gifs").on("click", function (event) {
  event.preventDefault();

  //grabs the input from the textbox
  var giphy = $("#gifs-input").val().trim();
  // Alert the user that they need to add a topic
  if (giphy === "") {
    alert("Please enter a valid topic");
    $("#gifs-input").focus();
  } else {
    //will add the topic from the textbox to our array
    topics.push(giphy);
    console.log(topics)
    //call renderButtons which handles the processing of our topic array
    renderButtons();
    $("#gifs-input").val("");
  }
});
//call renderButtons function to display the initial buttons
renderButtons();