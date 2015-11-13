 $(document).ready(function() {
   var thermostat = new Thermostat();
   var temperature;
   var country;
   var city;
   var weatherdesc;
   var setCountry;
   updateTemp();

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

   $('#buttonPos').click(function(){
     city = $('#city').val();
     setCountry = $('#country').val();
     localWeather();
   });

   function displayInfoWeather () {
     $('#location').text(country +": " + city);
     $('#weather').text(weatherdesc);
     $('#temp').text(Math.round(temperature-273.15) + " Celcius");
   }

   function setProgress(progress) {
     var progressBarWidth = progress * $(".container").width();
     $(".progressbar").width(progressBarWidth);
     var color = "red"
     $(".progressbar").css('background-color',setColor());
     $("#Ttext").html(thermostat.temperature + '\xB0' + 'C');
   }

   function setColor() {
    if(thermostat.tempUsage() === "low usage") { return 'blue'}
    if(thermostat.tempUsage() === "high usage") { return 'red'}
    return 'green';
   }


   function updateTemp() {
     $('#temperature').text('Temperature: ' + thermostat.temperature);
     setProgress(thermostat.temperature / 32);
   }

   function localWeather (){
     var url = new CreateUrl('fdd78bb9d3876b77dc904e82bee2ed0b');
     var location = url.location( city ,setCountry);
     $.getJSON(location, function(data){
      temperature = data.main.temp;
      weatherdesc = data.weather[0].description;
      country = data.sys.country;
      city = data.name;
      displayInfoWeather();
     });
   }
 });
