const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url= 'https://api.darksky.net/forecast/59ae4e5768f9ad12dfc0d483611a3204/'+latitude+','+longitude;
    
    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined);
        } else if(body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined,  body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees fahrenheit. There is '+body.currently.precipProbability+'% chance of rain.');
        }
    })
}

module.exports = forecast;