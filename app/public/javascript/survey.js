       // Grab the URL of the website
        var currentURL = window.location.origin;
        // Capture the form inputs
        $("#submit").on("click", function () {
            //event.preventDefault();

            if (($('#name').val().trim() !== "") && ($('#photo').val().trim() !== "") && 
                ($('#q1').val().trim() !== "")  && ($('#q2').val().trim() !== "") &&    
                ($('#q3').val().trim() !== "")  && ($('#q4').val().trim() !== "") &&    
                ($('#q5').val().trim() !== "")  && ($('#q6').val().trim() !== "") &&    
                ($('#q7').val().trim() !== "")  && ($('#q8').val().trim() !== "") &&    
                ($('#q9').val().trim() !== "")  && ($('#q10').val().trim() !== "")) {
                // Create an object for the user's data
                var userData = {
                    name: $("#name").val(),
                    photo: $("#photo").val(),
                    scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(),]
                }


                // AJAX post the data to the friends API.
                $.post(currentURL + "/api/friends", userData, function (data) {

                    console.log("name: "+data.name)
                    console.log("pic: "+data.photo)
                    debugger;
                    // Grab the result from the AJAX post so that the best friend's name and photo are displayed.
                    $("#friendName").text(data.name);
                    $('#friendPic').attr("src", data.photo);

                    // Show the modal with the best match
                    $("#resultsModal").modal('toggle');
                    // clear the input fields in the form
                    $("#name").val("");
                    $("#photo").val("");

                });
            } else {
                $(".modal-title").text("There are some Missing required fields.");
                $(".modal-body").html("<h3>Please complete the form and resubmit</h3>");
                $("#resultsModal").modal('toggle');

            }
            return false;
        });

        // modal logic
        $('#closeModal').click(function () {
            $.get('/', function (req, res) {
                location.replace(res);
            })
        });

 