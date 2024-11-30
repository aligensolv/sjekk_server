"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApartmentLocationRequest = exports.getAllApartmentLocationRequests = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _ApartmentLocationRequest = _interopRequireDefault(require("../repositories/ApartmentLocationRequest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllApartmentLocationRequests = (0, _async_wrapper["default"])(function _callee(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_ApartmentLocationRequest["default"].getAllApartmentLocationRequests());

        case 2:
          result = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(result));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllApartmentLocationRequests = getAllApartmentLocationRequests;
var createApartmentLocationRequest = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var apartment_id, _req$body, access_username, access_code, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          apartment_id = req.params.id;
          _req$body = req.body, access_username = _req$body.access_username, access_code = _req$body.access_code;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_ApartmentLocationRequest["default"].createApartmentLocationRequest({
            apartment_id: apartment_id,
            access_username: access_username,
            access_code: access_code
          }));

        case 4:
          result = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).json(result));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.createApartmentLocationRequest = createApartmentLocationRequest;