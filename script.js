//Waits until the page is fully loaded to run the following code
$(function () {

  // Updates the current time every second
  setInterval(function() {
    var today = dayjs();
    var currentTime = today.format("[It is] dddd, MMMM D, YYYY, [at] hh:mm:ss A[!]");
    $("#currentDay").text(currentTime);
  });

  // Function to set colors for each hour block based on the current hour
  var setHourColors = function () {
    var currentHour = dayjs().hour();
    console.log(currentHour);
    var timeSlots = $('[id^="hour-"]');
    timeSlots.each(function () {
      var id = $(this).attr("id");
      console.log(id);
      var hourBlock = id.split("-")[1];
      console.log(hourBlock);

       // Compares the hour block with the current hour to add appropriate classes
      if (parseInt(hourBlock) > currentHour) {
        $(this).addClass("future").removeClass("past present");
      } else if (parseInt(hourBlock) < currentHour) {
        $(this).addClass("past").removeClass("future present");
      } else if (parseInt(hourBlock) === currentHour) {
        $(this).addClass("present").removeClass("past future");
  
      }
      
    });
  };
  //Calls the setHourColors() function
  setHourColors();

  // Get the current minute and second
  var d = new Date();
  var minute = d.getMinutes();
  var second = d.getSeconds();

  // Refreshes the page whenever the minute and second of the day is 0 (effectively, it refreshes the page every hour ON the hour)
  if (minute !== 0 || second !== 0) {
    var timeToRefresh = (60 - minute) * 60000 + (60 - second) * 1000;
    setTimeout(function () {
      location.reload();
    }, timeToRefresh);
  } else {
    console.log("Time to refresh!");
    location.reload();
  };

  //Saves the typed task to local storage whenever the save button is clicked
  $(".saveBtn").on("click", function () {
    var block = $(this).parent().attr("id");
    var task = $(this).siblings(".description").val().trim();
    localStorage.setItem(block, task);
  });

// When the page is loaded, it displays the saved tasks from local storage in each time block
  $(function () {
    $(".time-block").each(function () {
      var block = $(this).attr("id");
      $(this).children(".description").val(localStorage.getItem(block));
    });
  });

});
