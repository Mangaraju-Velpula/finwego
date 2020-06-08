"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _elasticsearch = _interopRequireDefault(require("elasticsearch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var client = new _elasticsearch["default"].Client({
  host: 'localhost:9200',
  log: 'trace'
});
var _default = client;
exports["default"] = _default;