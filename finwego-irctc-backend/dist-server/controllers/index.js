"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _citiesController = _interopRequireDefault(require("./citiesController"));

var _trainsController = _interopRequireDefault(require("./trainsController"));

var _ticketBookingController = _interopRequireDefault(require("./ticketBookingController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = require('express').Router();

router.use('/cities/', _citiesController["default"]);
router.use('/trains/', _trainsController["default"]);
router.use('/booking/', _ticketBookingController["default"]);
var _default = router;
exports["default"] = _default;