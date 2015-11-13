 $(document).ready(function() {
   var thermostat = new Thermostat();

   $("#minus_button").click(function() {
     thermostat.down();
     updateTemp();
     $(this).effect("pulsate", {
       times: 0
     }, 50);
   });

   $("#plus_button").click(function() {
     thermostat.up();
     updateTemp();
     $(this).effect("pulsate", {
       times: 0
     }, 50);
   });

   $("#resetButton").click(function() {
     thermostat.resetTemperature();
     updateTemp();
   });
   $("#myPSMswitch").change(function() {
     thermostat.powerSavingSwitch();
     updateTemp();
   });

   function setProgress(progress) {
     var progressBarWidth = progress * $(".container").width();
     $(".progressbar").width(progressBarWidth);
     $("#Ttext").html(thermostat.temperature + '\xB0' + 'C');
   }

   function updateTemp() {
     $('#temperature').text('Temperature: ' + thermostat.temperature);
     setProgress(thermostat.temperature / 32);
   }

   $.getJSON("api.openweathermap.org/data/2.5/weather?q=London,uk", function(data) {
     var items = [];
     $.each(data, function(key) {
       items.push(val);
     });

     $("<ul/>", {
       "class": "my-new-list",
       html: items.join("")
     }).appendTo("body");
   });
 });
