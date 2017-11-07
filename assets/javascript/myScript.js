    // Initial array of animals
    var animals = ["dog", "cat", "goat", "armadillo", "peacock", "pig", "hedgehog"];
    // call the function to put the buttons on the screen
    renderButtons();

    // Function for displaying animal buttons
    function renderButtons() {
        
        // empty out what was in div so we don't repeat buttons when appending
        $("#animal-buttons").empty();
        // Loop through the array of animals
        for (var i = 0; i < animals.length; i++) {
          appendButton(animals[i]);
        }

    }

    function appendButton(animal) {
       
        var a = $("<button>");
        // Adding a class
        a.addClass("animal");
        // Adding a data-attribute with a value of the animal at index i
        a.attr("data-name", animal);
        // Providing the button's text with a value of the animal at index i
        a.text(animal);
        // Adding the button to the HTML
        $("#animal-buttons").append(a);
        
    }

    // This function is called when the Submit button is clicked to add an animal button
    $("#add-animal").on("click", function(event) {

        event.preventDefault();
        // This line will grab the text from the input box
        var animal = $("#animal-input").val().trim();
        // Add the animal to the array
        animals.push(animal);
        // add the new animal button
        appendButton(animal);
        renderButtons();
     });
    
    // This function is called when one of the animals buttons is clicked. 
    //It will use ajax to get 10 images from giphy  
    $(document).on("click", "button", function() {
      
        var animal = $(this).attr("data-name");
        var myApiKey = "qfVsi713bNzjI6a9qOH1uo6KJACHjiQM";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + myApiKey + "&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
            
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            //console.log(results);

            // empty out what was in div so we only have the images for the button clicked
            $("#animal-display").empty();

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var animalDiv = $("<div id=\"rating-and-image\">");

                // Creating a paragraph tag with the rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var animalImage = $("<img>");

                // Setting the src attribute of the image to a property pulled off the result item
                //this is the moving image
                animalImage.attr("src", results[i].images.fixed_height.url);
                //get the still image also and add it to the image tag
                animalImage.attr("data-still", results[i].images.fixed_height_still.url); 
                //put the animated one in the data-animate attribute
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                //set the data-state to animate
                animalImage.attr("data-state", "animate");
                //set the class to gif
                animalImage.attr("class", "gif");

                console.log(animalImage);

                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#animal-display").append(animalDiv);
            }
      
    }); //end of document on click function

    //This function is called when you click on one of the images. each time you click the image it toggles between still and animated
    $(document).on("click", ".gif", function() {
    
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).data("state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).data("animate"));
          $(this).data("state", "animate");
          console.log("Switched state: " +$(this).data("state"));
        } else {
          $(this).attr("src", $(this).data("still"));
          $(this).data("state", "still");
          console.log("Switched state: " + $(this).data("state"));
  
        }
      });

    });
 