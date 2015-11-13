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
     localWeather();
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
   function createUrl(){

   }
   function localWeather (){
     var url = new CreateUrl('fdd78bb9d3876b77dc904e82bee2ed0b');
     var location = url.location('London','uk');
     $.getJSON(location, function(data){
      var temperature = data.main.temp;

     });
   }
 });
