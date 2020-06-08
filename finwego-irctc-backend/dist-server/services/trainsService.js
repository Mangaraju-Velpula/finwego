"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _elasticsearchConfig = _interopRequireDefault(require("../config/elasticsearchConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createTrain = function createTrain(params) {
  console.log("params ", params);
  return _elasticsearchConfig["default"].index({
    "index": 'trains',
    id: params.id,
    "body": params
  });
};

var updateTrain = function updateTrain(id, params) {
  return _elasticsearchConfig["default"].update({
    index: "trains",
    id: id,
    body: {
      doc: params
    }
  });
};

var deleteTrain = function deleteTrain(id) {
  return _elasticsearchConfig["default"]["delete"]({
    index: "trains",
    id: id
  });
};

var getTrain = function getTrain(id) {
  return _elasticsearchConfig["default"].search({
    index: "trains",
    body: {
      query: {
        match: {
          id: id
        }
      }
    }
  });
};

var getTrains = function getTrains(reqObj) {
  var query = {
    "query": {
      "bool": {
        "must": [{
          "match": {
            "from.id": reqObj.from.id
          }
        }, {
          "match": {
            "to.id": reqObj.to.id
          }
        }]
      }
    }
  };

  if (reqObj.searchKey && reqObj.searchKey.length) {
    query.query.bool.must.push({
      "wildcard": {
        "name": {
          "value": "*" + reqObj.searchKey + "*"
        }
      }
    });
  }

  return _elasticsearchConfig["default"].search({
    index: 'trains',
    body: _objectSpread({}, query)
  });
};

var getAllTrains = function getAllTrains() {
  return _elasticsearchConfig["default"].search({
    index: 'trains',
    body: {
      query: {
        match_all: {}
      }
    }
  });
};

var _default = {
  createTrain: createTrain,
  updateTrain: updateTrain,
  deleteTrain: deleteTrain,
  getTrain: getTrain,
  getTrains: getTrains,
  getAllTrains: getAllTrains
};
exports["default"] = _default;