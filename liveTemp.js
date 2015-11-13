function CreateUrl (apiKey){
  this._baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
  this.apiKey = apiKey;
}

CreateUrl.prototype.location = function(city, contryCode) {
  var url = this._baseUrl + "?q=" + city + "," + contryCode + "&APPID=" + this.apiKey;
  return url;
};
