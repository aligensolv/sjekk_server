"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteColor = exports.createColor = exports.getAllColors = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _Color = _interopRequireDefault(require("../repositories/Color.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllColors = (0, _async_wrapper["default"])(function _callee(req, res) {
  var colors;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Color["default"].getAllColors());

        case 2:
          colors = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(colors));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllColors = getAllColors;
var createColor = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var color, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          color = req.body.color;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Color["default"].createColor(color));

        case 3:
          result = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).send(result));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.createColor = createColor;
var deleteColor = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var id, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Color["default"].deleteColor(id));

        case 3:
          result = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).send(result));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.deleteColor = deleteColor;