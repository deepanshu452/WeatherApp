const request = require('request');



const data = (location,callback) => {
    
    const url = `http://api.weatherapi.com/v1/current.json?key=d8ff99b7337c41a5a41171504242802&q=${location}&aqi=yes`
    
    request({url: url, json: true}, (error, {body} = {}) => {
        if(error){
            callback(("unable to connect to internet!!",undefined))
        }
        else if(body.error){
            callback((body.error.message));
        } else {
            callback(undefined,`The Weather is `+body.current.condition.text+` and the temperature is `+body.current.temp_c+` °C outside, feels like `+body.current.feelslike_c+` °C`)
        }
    })

}

module.exports = {
    data: data
}