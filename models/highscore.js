require("../db/schema");
var mongoose = require('mongoose');

var HighscoreModel = mongoose.model("Highscore");
module.exports = HighscoreModel;
