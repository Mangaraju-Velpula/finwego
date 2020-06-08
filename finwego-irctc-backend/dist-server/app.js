"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _controllers = _interopRequireDefault(require("./controllers"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 9090;
app.listen(port, function () {
  console.log("Server is running at 9090 port");
}); // app.use(express.static("public"));

app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  extended: false,
  limit: '50mb'
}));
var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(_origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use('/', (0, _cors["default"])(corsOptions), _controllers["default"]);