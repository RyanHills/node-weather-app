const express = require('express');
const bodyParser = require("body-parser")
const https = require("https");


const app = express ();
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
const apiKey = "32ba0bfed592484379e51106cef3f204";
const unit = "metric";

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req, res){
    const query = req.body.cityName;
    console.log(req.body.cityName)
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode)
        response.on("data", function(data){
            console.log(data)
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            console.log(weatherDescription)
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The weather is currently " + weatherDescription + "!</h1>");
            res.write("the temp is " + temp);
            res.write("<img src=" + imageURL +">")
            res.send();
        })
    })
})


app.listen(3000, function(){
    console.log("server on port 3000");
});





