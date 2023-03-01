$(document).ready(function () {
    // * Display the current day at the top of the calender when a user opens the planner.
    let currentDate = $("#currentDay");
    var today = moment();
    currentDate.text(today.format("dddd, MMMM D YYYY"));
  
    // Save the events and the time corresponding to that event as an object.
  
    let events = {};
    let hourRendered = moment();
  
    loadPlanner();
    startPlanner();
  
    // Render and display the daily planner
    // The rows of the planner must start with 9 and end with 5.
    // Initialise the starting hour
    function renderPlanner(today, events) {
      let hourRow = moment(today).hour(9); // This will start the rows from 9
      let planner = $(".container");
      planner.empty();
  
      // Increment the number of rows by 1 and display it on the page
      // Increment until 'X' number of rows is displayed
  
      // * Color-code each timeblock based on past, present, and future when the timeblock is viewed.
  
      for (i = 0; i < 9; i++) {
        let row = $("<div>").addClass("row");
  
        let time = "";
        if (today.isBefore(hourRow, "hour")) {
          time = "future";
        } else if (today.isAfter(hourRow, "hour")) {
          time = "past";
        } else {
          time = "present";
        }
  
        // Append each row to the planner with classes from bootstrap to style the row
  
        planner.append(row);
        row.append($("<div>").addClass("col-2 hour").text(hourRow.format("h A")));
        let timeBlock = hourRow.format("hA");
  
        // * Allow a user to enter an event when they click a timeblock
        row.append(
          $("<textarea>").addClass(`col-8 ${time}`).text(events[timeBlock])
        );
        row.append(
          $("<button>")
            .addClass("col-2 saveBtn")
            .html("<i class='fas fa-save'></i>")
            .attr("aria-label", "Save")
            .attr("id", hourRow.format("hA"))
        );
  
        // * Present timeblocks for standard business hours when the user scrolls down.
        // Increment the timings between each row by 1.
  
        hourRow.add(1, "hour");
  
        hourRendered = moment();
      }
    }
  
    // Load and Render the planner
    function startPlanner() {
      renderPlanner(today, events);
    }
  
    // Load and render the events that was stored in localStorage; display the item stored in localStorage
    function loadPlanner() {
      let storedEvents = JSON.parse(localStorage.getItem("events"));
      if (storedEvents) {
        events = storedEvents;
      }
    }
  
    
    hourTracker();
  
    // * Persist events between refreshes of a page
  
    function hourTracker() {
      setInterval(function () {
        if (moment().isAfter(hourRendered, "minute")) {
          startPlanner();
        }
      }, 600000);
    }
  
    // Store events with local Storage
  
    function savePlanner() {
      localStorage.setItem("events", JSON.stringify(events));
    }
  
    // Save the event using the save button
  
    // * Save the event in local storage when the save button is clicked in that timeblock.
  
    $(document).on("click", ".saveBtn", function (e) {
      let plannerEvent = e.currentTarget.parentElement.children[1].value;
      events[e.currentTarget.id] = plannerEvent;
      savePlanner();
    });
  });