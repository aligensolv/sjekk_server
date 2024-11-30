"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNormalPlace = exports.createNormalPlace = exports.getAllNormalPlaces = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _NormalPlace = _interopRequireDefault(require("../repositories/NormalPlace.js"));

var _Validator = _interopRequireDefault(require("../repositories/Validator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllNormalPlaces = (0, _async_wrapper["default"])(function _callee(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_NormalPlace["default"].getAllNormalPlaces());

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
exports.getAllNormalPlaces = getAllNormalPlaces;
var createNormalPlace = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var _req$body, location, policy, code, partner_id, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, location = _req$body.location, policy = _req$body.policy, code = _req$body.code, partner_id = _req$body.partner_id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            location: location,
            policy: policy,
            code: code
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(_NormalPlace["default"].createNormalPlace({
            location: location,
            policy: policy,
            code: code,
            partner_id: partner_id
          }));

        case 5:
          result = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).json(result));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.createNormalPlace = createNormalPlace;
var updateNormalPlace = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var place_id, _req$body2, location, policy, code, result;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          place_id = req.params.id;
          _req$body2 = req.body, location = _req$body2.location, policy = _req$body2.policy, code = _req$body2.code;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            location: location,
            policy: policy,
            code: code
          }));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(_NormalPlace["default"].updateNormalPlace({
            location: location,
            policy: policy,
            code: code,
            place_id: place_id
          }));

        case 6:
          result = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(result));

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.updateNormalPlace = updateNormalPlace;