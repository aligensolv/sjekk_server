"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createResidentialQuarter = exports.getAllResidentialQuarters = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _ResidentialQuarter = _interopRequireDefault(require("../repositories/ResidentialQuarter.js"));

var _Validator = _interopRequireDefault(require("../repositories/Validator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllResidentialQuarters = (0, _async_wrapper["default"])(function _callee(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_ResidentialQuarter["default"].getAllResidentialQuarters());

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
exports.getAllResidentialQuarters = getAllResidentialQuarters;
var createResidentialQuarter = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var _req$body, location, policy, code, max_cars_registrations, quarter_name, guest_parking_hours, max_cars_by_apartment, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, location = _req$body.location, policy = _req$body.policy, code = _req$body.code, max_cars_registrations = _req$body.max_cars_registrations, quarter_name = _req$body.quarter_name, guest_parking_hours = _req$body.guest_parking_hours, max_cars_by_apartment = _req$body.max_cars_by_apartment;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            location: location,
            policy: policy,
            code: code,
            max_cars_registrations: max_cars_registrations,
            quarter_name: quarter_name,
            guest_parking_hours: guest_parking_hours,
            max_cars_by_apartment: max_cars_by_apartment
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(_ResidentialQuarter["default"].createResidentialQuarter({
            location: location,
            policy: policy,
            code: code,
            max_cars_registrations: max_cars_registrations,
            quarter_name: quarter_name,
            guest_parking_hours: guest_parking_hours,
            max_cars_by_apartment: max_cars_by_apartment
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
exports.createResidentialQuarter = createResidentialQuarter;