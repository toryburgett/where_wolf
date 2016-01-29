require('./db/schema');
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var flash          = require('connect-flash');
var hbs            = require("hbs");
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session        = require('express-session');
var path           = require("path");
var fs             = require('fs');

var quizzesController = require("./controllers/quizzesController");
mongoose.createConnection('mongodb://localhost/wherewolves');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

var env = fs.existsSync(__dirname + '/env.js') ? require('./env') : process.env;

app.set('view engine', 'hbs');
app.set("views","./views");

app.use(express.static(path.join(__dirname, "/public")));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(flash());

// Routes for db
// app.use("/quizzes", require("./controllers/quizzesController"));


app.get("/", function(req, res){
  res.sendFile("index.html");
});
app.get("/quizzes", quizzesController.index);
app.get("/highscores", quizzesController.allHighscores);

app.post("/quizzes", quizzesController.create);
app.get("/quizzes/:id", quizzesController.show);
app.put("/quizzes/:id", quizzesController.update);
app.delete("/quizzes/:id", quizzesController.delete);

app.post("/highscores", quizzesController.addToHighscore);
app.get("/highscores/:id", quizzesController.showToHighscore);
app.put("/highscores/:id", quizzesController.updateToHighscore);
app.delete("/highscores/:id", quizzesController.removeToHighscore);

app.get("/quizzes/:id/highscores/", quizzesController.getHighscores);
app.post("/quizzes/:id/highscores", quizzesController.addHighscore);
app.delete("/quizzes/:quizId/highscores/:id", quizzesController.removeHighscore);


var port = process.env.PORT || 8080;
app.listen(port, function() {
console.log("Listening on " + port);
});
