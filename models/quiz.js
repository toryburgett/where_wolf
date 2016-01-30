require("../db/schema");
var mongoose = require('mongoose');

var QuizModel = mongoose.model("Quiz");
module.exports = QuizModel;
