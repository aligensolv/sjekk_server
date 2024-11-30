"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _Autosys = _interopRequireDefault(require("../repositories/Autosys.js"));

var _logger = _interopRequireDefault(require("../utils/logger.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getPlateInformation = (0, _async_wrapper["default"])(function _callee(req, res) {
  var plate_number, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          plate_number = req.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Autosys["default"].getPlateInformation({
            plate_number: plate_number
          }));

        case 3:
          result = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(result));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
var _default = getPlateInformation;
exports["default"] = _default;