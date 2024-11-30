"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginResidentialDashboard = exports.createResidentialDashboard = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _ResidentialDashboard = _interopRequireDefault(require("../repositories/ResidentialDashboard.js"));

var _Validator = _interopRequireDefault(require("../repositories/Validator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createResidentialDashboard = (0, _async_wrapper["default"])(function _callee(req, res) {
  var _req$body, access_username, access_code, residential_quarter_id, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, access_username = _req$body.access_username, access_code = _req$body.access_code, residential_quarter_id = _req$body.residential_quarter_id;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            access_username: access_username,
            access_code: access_code,
            residential_quarter_id: residential_quarter_id
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_ResidentialDashboard["default"].createResidentialDashboard({
            access_username: access_username,
            access_code: access_code,
            residential_quarter_id: residential_quarter_id
          }));

        case 5:
          result = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(result));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.createResidentialDashboard = createResidentialDashboard;
var loginResidentialDashboard = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var _req$body2, access_username, access_code, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, access_username = _req$body2.access_username, access_code = _req$body2.access_code;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            access_username: access_username,
            access_code: access_code
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(_ResidentialDashboard["default"].loginResidentialDashboard({
            access_username: access_username,
            access_code: access_code
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
exports.loginResidentialDashboard = loginResidentialDashboard;