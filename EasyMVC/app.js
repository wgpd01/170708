var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );
app.use( express.static( "public" ) );

// https://github.com/expressjs/session
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));


app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/view');

app.listen(process.env.PORT);
console.log("Server is running... Press 'Stop' button to exit.");

app.get("/", function (request, response) {
    response.send("Homepage");
});

app.get("/api/session1", function (request, response) {
    request.session.userName = "Chien";
    response.send("OK");
    // response.redirect("/api/session2");
})

app.get("/api/session2", function (request, response) {
    if (request.session.userName)
        response.send(request.session.userName);
    else
        response.send("userName is nuknown.");
})


app.get("/api/testQuery", function (request, response) {
    response.send(request.query.id);
})

app.get("/api/testPost", function (request, response) {
    response.send("GET /api/testPost -- " + request.method);
})

app.post("/api/testPost", function (request, response) {
    // response.send(request.method);
    if (request.body.userName) {
        response.send(request.body);
    }
    else
        response.send("userName wrong");
})


app.get("/:controllerName", function (request, response) {
    var controllName = request.params.controllerName;
    var moduleName = "./controller/" + controllName + ".js";
    var controllerClass = require(moduleName);
    var controller = new controllerClass(request, response);
    controller.index();
});

app.get("/:controllerName/:actionName", function (request, response) {
    var controllName = request.params.controllerName;
    var moduleName = "./controller/" + controllName + ".js";
    var controllerClass = require(moduleName);
    var controller = new controllerClass(request, response);
    
    var actionName = request.params.actionName;
    controller[actionName]();
});




