$(function () {

  setInterval(function() {
    var today = dayjs();
    var currentTime = today.format("[It is] dddd, MMMM D, YYYY, [at] hh:mm:ss A[!]");
    $("#currentDay").text(currentTime);
  });

  var setHourColors = function () {
    var currentHour = dayjs().hour();
    console.log(currentHour);
    var timeSlots = $('[id^="hour-"]');
    timeSlots.each(function () {
      var id = $(this).attr("id");
      console.log(id);
      var hourBlock = id.split("-")[1];
      console.log(hourBlock);

      if (parseInt(hourBlock) > currentHour) {
        $(this).addClass("future").removeClass("past present");
      } else if (parseInt(hourBlock) < currentHour) {
        $(this).addClass("past").removeClass("future present");
      } else if (parseInt(hourBlock) === currentHour) {
        $(this).addClass("present").removeClass("past future");
  
      }
      
    });
  };
  setHourColors();

 var d = new Date();
 var minute = d.getMinutes();
 var second = d.getSeconds();

 if (minute !== 0 || second !== 0) {
  var timeToRefresh = (60 - minute) * 60000 + (60 - second) * 1000;
  setTimeout(function () {
    location.reload();
  }, timeToRefresh);
} else {
  console.log("Time to refresh!");
  location.reload();
}


$(".saveBtn").on("click", function () {
  var block = $(this).parent().attr("id");
  var task = $(this).siblings(".description").val().trim();
  localStorage.setItem(block, task);
});


$(function () {
  $(".time-block").each(function () {
    var block = $(this).attr("id");
    $(this).children(".description").val(localStorage.getItem(block));
  });
});

});
