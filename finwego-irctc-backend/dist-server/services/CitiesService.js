"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _elasticsearchConfig = _interopRequireDefault(require("..//config/elasticsearchConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createCity = function createCity(params) {
  console.log("params are here ", params);
  return _elasticsearchConfig["default"].index({
    "index": 'cities',
    "body": params
  });
};

var getCitites = function getCitites() {
  return _elasticsearchConfig["default"].search({
    index: "cities",
    body: {
      query: {
        match_all: {}
      }
    }
  });
};

var _default = {
  createCity: createCity,
  getCitites: getCitites
};
exports["default"] = _default;