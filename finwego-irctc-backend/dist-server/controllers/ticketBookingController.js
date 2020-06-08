"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = _interopRequireWildcard(require("lodash"));

var _rest = require("../common/rest");

var _Response = _interopRequireDefault(require("../common/Response"));

var _ticketBookingService = _interopRequireDefault(require("../services/ticketBookingService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = require('express').Router();

var bookTicket = function bookTicket(req, res) {
  if (!req.body) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, "Request body is empty"));
  }

  _ticketBookingService["default"].bookTicket(req.body).then(function (success) {
    res.status(_rest.HTTP_STATUS.OK).json(new _Response["default"](_rest.HTTP_RESPONSE.SUCCESS, req.body));
  }, function (error) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
  });
};

var cancelTicket = function cancelTicket(req, res) {
  if (!req.body) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, "Request body is empty"));
  }

  _ticketBookingService["default"].cancelTicket(req.body).then(function (success) {
    res.status(_rest.HTTP_STATUS.OK).json(new _Response["default"](_rest.HTTP_RESPONSE.SUCCESS, "Ticket cancellation successfull "));
  }, function (error) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
  });
};

var getBookingByUser = function getBookingByUser(req, res) {
  _ticketBookingService["default"].userBookingHistory(req.params.userId).then(function (success) {
    var bookingHistory = _.get(success, 'hits.hits', {});

    var response = bookingHistory.map(function (booking) {
      return booking._source;
    });
    res.status(_rest.HTTP_STATUS.OK).json(new _Response["default"](_rest.HTTP_RESPONSE.SUCCESS, response));
  }, function (error) {
    res.status(_rest.HTTP_STATUS.BAD_REQUEST).json(new _Response["default"](_rest.HTTP_RESPONSE.FAILED, error));
  });
};

router.post('/', bookTicket);
router.post('/cancel', cancelTicket);
router.get('/history/user/:userId', getBookingByUser);
var _default = router;
exports["default"] = _default;