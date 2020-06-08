"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Response = /*#__PURE__*/function () {
  function Response(status, response) {
    _classCallCheck(this, Response);

    this.status = status;
    this.response = response;
  }

  _createClass(Response, [{
    key: "setStatus",
    value: function setStatus(status) {
      this.status = status;
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.status;
    }
  }, {
    key: "setResponse",
    value: function setResponse(response) {
      this.response = response;
    }
  }, {
    key: "getResponse",
    value: function getResponse() {
      return this.response;
    }
  }]);

  return Response;
}();

var _default = Response;
exports["default"] = _default;