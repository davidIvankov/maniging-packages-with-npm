let express = require('express');
require('dotenv').config()
let bodyParser = require('body-parser')
let app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(function middlewear(req, res, next){
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})
app.use("/public", express.static(__dirname + "/public"))
app.get("/name", function(req, res){
 let firstName = req.query.first
 let lastName = req.query.last
res.json({
    name: `${firstName} ${lastName}`
})
})
app.get("/:word/echo", function(req, res){
    res.json({
        echo: req.params.word
    })
})
app.get("/now", function(req, res, next){
    req.time = new Date().toString()
    next()

},
function(req, res){
    res.json({
        time: req.time
    })
})
app.get("/json", function(req, res){
    if(process.env.MESSAGE_STYLE === "uppercase"){
    res.json({
        message:"HELLO JSON"
    })

} else {
    res.json({
        message:"Hello json"
    })
}
})
app.get("/", function(req, res){
res.sendFile(__dirname + "/views/index.html")
});

//console.log("Hello World")


































 module.exports = app;