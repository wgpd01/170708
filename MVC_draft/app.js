var express = require('express');
var app = express();
app.use( express.static( "public" ) );

var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// https://github.com/expressjs/session
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.listen(process.env.PORT);


app.get("/", function(req, res){ 
    res.send(req.method + " /");
})

app.get("/api/test", function(req, res){ 
    req.session.userId = "Chien";
    res.send("OK");
    // res.redirect("/api/test2");
})

app.get("/api/test2", function(req, res){ 
    if (req.session.userId)
        res.send("Hello! " + req.session.userId);
    else
        res.send("Hello!")
})

app.post("/api/testPost", function(req, res){ 
    res.send(req.body.email);
})


app.get("/:controllerName", function(req, res){ 
    var controllerClass = require("./controller/" + req.params.controllerName + ".js");
    var controller = new controllerClass(req, res);
    controller["index"]();
})

app.get("/:controllerName/:actionName", function(req, res){ 
    res.send(req.params.actionName);
})

app.get("/:controllerName/:actionName/:data", function(req, res){ 
    res.send(req.params.data);
})





console.log('server is running');
