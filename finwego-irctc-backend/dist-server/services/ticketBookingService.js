"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _elasticsearchConfig = _interopRequireDefault(require("..//config/elasticsearchConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bookTicket = function bookTicket(params) {
  return _elasticsearchConfig["default"].index({
    "index": 'bookings',
    id: params.id,
    "body": params
  });
};

var cancelTicket = function cancelTicket(params) {
  return _elasticsearchConfig["default"].update({
    index: "bookings",
    id: params.bookingId,
    body: {
      "script": {
        "source": "ctx._source.canceledTickets.add(params.id)",
        "lang": "painless",
        "params": {
          "id": params.ticketId,
          "cancel": 1
        }
      }
    }
  });
};

var userBookingHistory = function userBookingHistory(userId) {
  return _elasticsearchConfig["default"].search({
    index: 'bookings',
    body: {
      "query": {
        "match": {
          "bookedBy.id": userId
        }
      },
      "sort": {
        "bookedOn": "desc"
      }
    }
  });
};

var _default = {
  bookTicket: bookTicket,
  cancelTicket: cancelTicket,
  userBookingHistory: userBookingHistory
};
exports["default"] = _default;