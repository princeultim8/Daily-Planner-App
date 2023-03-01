// To implement
    // Display current day at top of page when user opens planner


// Initialise javascript variables
var currentDay = moment().format("dddd D MMMM");
var timeblockContainer = $(".container");


var setDate = function () {
    // Set text of current day to moment value
    $("#currentDay").text(currentDay);      
}
setDate();
    // Present individual timeblocks for 9/5 

var createTimeblocks = function () { 

    // Create array to hold hours data 
    var timeOfDay = [9,10,11,12,13,14,15,16,17];

    // Create table to hold all the rows of timeblocks
    var newTable = $("<table>");
    // Add styling to make table 100% width
    newTable.attr("style","width:100%");

    // Append table element to time block container
    timeblockContainer.append(newTable);
    timeblockContainer.addClass("time-block");

    // For loop to run create row for each hour 
    for (var i = 0; i < timeOfDay.length; i++){

        // TABLE ROW


        // Create table row
        var timeblockRow = $("<tr>");
        timeblockRow.attr("class","row");
        // Append to table element
        newTable.append(timeblockRow);



        // TIME FRAME


        // Create table description for time frame
        var tableTime = $("<td>");
        // Add styling to make table 15% width
        tableTime.attr("style","width:15%");
        tableTime.addClass("hour");
        // Set current time variable to hold hour format of number in timeOfDay array
        var currentTime = moment(timeOfDay[i],"Ha").format("Ha");
        // Set text to current time
        tableTime.text(currentTime);
        // Append table row to description block
        timeblockRow.append(tableTime);


        // USER INPUT


        // Add rows into table
        var tableInput = $("<td>");
        tableInput.attr("style","width:70%");

        // Add colour pallettes to past/present
            // Use stringify to convert moment and time into comparable values

        // Initialise comparable values
      
        var todayDate = moment([timeOfDay[i]], 'HH');
        var pastDate = moment();
    

        var userInput = $("<textarea>");
        userInput.attr("style","width:100%");
        userInput.attr("id", i);





        tableInput.append(userInput);
        timeblockRow.append(tableInput);


        
        if (todayDate.isBefore(pastDate)) {
            tableInput.addClass("past");
        } else if(todayDate.isAfter(pastDate)){
            tableInput.addClass("future");
        } else{
            tableInput.addClass("present");
        }

        
        

        // SAVE BUTTON


        //  Add rows into table
        var tableButton = $("<td>");
        tableButton.attr("style","width:15%");

        // Create button to save 
        var saveButton = $("<input>");
        saveButton.attr("class","saveBtn");
        saveButton.attr("type","submit");
        saveButton.attr("value","Submit");
        saveButton.text("Save event");
        saveButton.attr("id",i);
        saveButton.addClass("btn-lg");

        // Append button and desc to timeblock 
        tableButton.append(saveButton);
        timeblockRow.append(tableButton);


        saveButton.on("click",function(event){ 

            event.stopPropagation();
            event.preventDefault();
            // Initialise variables to hold value of button clicked
            var element = event.target;
            
            var userInput = localStorage.getItem("userInput");
            console.log(userInput);
            
            
        
        })
      


    }

}

createTimeblocks();

  


    // Allow user to enter event when click on timeblock
     
    // Save event in local storage when save button clicked on individual timeblock

    // Persist events between refreshes of a page




    // Change class on timeblock based on if its before/at/after current time
        // How?
            // Get current time in numeric format

            // Get chosen time in numeric format; 