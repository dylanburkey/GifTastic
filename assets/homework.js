//var topics =  ["Role Models", "Old School", "The 40-Year-Old Virgin", "Superbad", "Ted", "This Is the End", "Step Brothers", 
//"Pineapple Express", "21 Jump Street", "Horrible Bosses", "Knocked Up",
//"Zack and Miri Make a Porno", "Archer"];



$("button").on("click", function() {
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=wRIz1g2bmMxoGZOvgWa0K9UcmZjRikyq&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");
          personImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });
