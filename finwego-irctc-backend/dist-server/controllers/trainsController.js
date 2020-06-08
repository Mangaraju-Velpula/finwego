"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rest = require("../common/rest");

var _Response = _interopRequireDefault(require("../common/Response"));

var _trainsService = _interopRequireDefault(require("../services/trainsService"));

var _ = _interopRequireWildcard(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = require('express').Router();

var createTrain = function createTrain(req, res) {
  if (!req.body) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, "Name of city is mandatory"));
  }

  _trainsService["default"].createTrain(req.body).then(function (success) {
    res.status(_rest.HTTP_STATUS.OK).json(new _Response["default"](_rest.HTTP_RESPONSE.SUCCESS, req.body));
  }, function (error) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
  });
};

var updateTrain = function updateTrain(req, res) {
  if (!req.body) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, "Name of city is mandatory"));
  }

  _trainsService["default"].updateTrain(req.params.id, req.body).then(function (success) {
    res.status(_rest.HTTP_STATUS.OK).json(new _Response["default"](_rest.HTTP_RESPONSE.SUCCESS, req.body));
  }, function (error) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
  });
};

var deleteTrain = function deleteTrain(req, res) {
  if (!req.body) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, "Name of city is mandatory"));
  }

  _trainsService["default"].deleteTrain(req.params.id).then(function (success) {
    res.status(_rest.HTTP_STATUS.OK).json(new _Response["default"](_rest.HTTP_RESPONSE.SUCCESS, "Train details deleted successfully"));
  }, function (error) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
  });
};

var getTrain = function getTrain(req, res) {
  if (!req.body) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, "Name of city is mandatory"));
  }

  _trainsService["default"].getTrain(req.params.id).then(function (success) {
    var trainInfo = _.get(success, 'hits.hits[0]._source', {}); //success.hits.hits[0];


    if (trainInfo) {
      res.status(_rest.HTTP_STATUS.OK).json(new _Response["default"](_rest.HTTP_RESPONSE.SUCCESS, trainInfo));
    } else {
      res.status(_rest.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
    }
  }, function (error) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
  });
};

var getTrains = function getTrains(req, res) {
  if (!req.body) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, "Name of city is mandatory"));
  }

  _trainsService["default"].getTrains(req.body).then(function (success) {
    var trainInfo = _.get(success, 'hits.hits', []); //success.hits.hits[0];


    trainInfo = _.map(trainInfo, function (train) {
      return train._source;
    });

    if (trainInfo) {
      res.status(_rest.HTTP_STATUS.OK).json(new _Response["default"](_rest.HTTP_RESPONSE.SUCCESS, trainInfo));
    } else {
      res.status(_rest.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
    }
  }, function (error) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
  });
};

var getAllTrains = function getAllTrains(req, res) {
  _trainsService["default"].getAllTrains(req.body).then(function (success) {
    var trainInfo = _.get(success, 'hits.hits', []); //success.hits.hits[0];


    trainInfo = _.map(trainInfo, function (train) {
      return train._source;
    });
    console.log("Train Info ", trainInfo);

    if (trainInfo) {
      res.status(_rest.HTTP_STATUS.OK).json(new _Response["default"](_rest.HTTP_RESPONSE.SUCCESS, trainInfo));
    } else {
      res.status(_rest.HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
    }
  }, function (error) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
  });
};

router.post('/', createTrain);
router.put('/:id', updateTrain);
router["delete"]('/:id', deleteTrain);
router.get('/:id', getTrain);
router.post('/between', getTrains);
router.get('/', getAllTrains);
var _default = router;
exports["default"] = _default;