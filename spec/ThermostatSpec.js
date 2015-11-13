// 'use strict';

describe ('Thermostat',function(){
  var thermostat;
  function doFnxTimes(fn, x){
    for (i = 1; i <= x; i++){
      fn();
    }
  }

  beforeEach(function() {
    thermostat = new Thermostat();
  });
  it ('has a default temperature of 20 c',function(){
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('Can be increased by 1 degree', function() {
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it('Can be decreased by 1 degree', function() {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });

  it ('has a minimum temp of 10 C',function(){
    doFnxTimes(function(){ thermostat.down() }, 11)
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  it('has a max temperature of 25 when power saving mode is on', function(){
    doFnxTimes(function(){ thermostat.up()}, 11)
    expect(thermostat.getCurrentTemperature()).toEqual(25);
  });

  it('has a max temperature of 32 when power saving mode is off', function(){
    thermostat.powerSavingSwitch();
    doFnxTimes(function(){ thermostat.up()}, 13)
    expect(thermostat.getCurrentTemperature()).toEqual(32);
  });

  it('sets the temperature to 20 if click reset button',function(){
    doFnxTimes(function(){ thermostat.down()}, 2)
    thermostat.resetTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it ('consider low usage when temp is below 18',function(){
    doFnxTimes(function(){ thermostat.down()}, 9)
    expect(thermostat.tempUsage()).toEqual("low usage");
  });

  it ('is consider medium usage when temperature is between 18-25',function(){
    expect(thermostat.tempUsage()).toEqual('medium usage');
  });

  it ('is consider high usage when is more than 25',function(){
    thermostat.powerSavingSwitch();
    doFnxTimes(function(){ thermostat.up() }, 6)
    expect(thermostat.tempUsage()).toEqual('high usage');
  });

  it ('sets back the temperature to the default maximum temperature', function(){
    thermostat.powerSavingSwitch()
    doFnxTimes(function() { thermostat.up() }, 20)
    thermostat.powerSavingSwitch();
    expect(thermostat.temperature).toEqual(25);
  })


});
