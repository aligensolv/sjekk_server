"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResidentialDashboardStatistics = exports.deleteResidentialCar = exports.getApartmentsCars = exports.getResidentialCarsByQuarter = exports.getAllResidentialCars = exports.registerResidentialCar = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _ResidentialCar = _interopRequireDefault(require("../repositories/ResidentialCar.js"));

var _Validator = _interopRequireDefault(require("../repositories/Validator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var registerResidentialCar = (0, _async_wrapper["default"])(function _callee(req, res) {
  var _req$body, plate_number, parking_type, subscription_plan_days, residential_quarter_id, apartment_id, country, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, plate_number = _req$body.plate_number, parking_type = _req$body.parking_type, subscription_plan_days = _req$body.subscription_plan_days, residential_quarter_id = _req$body.residential_quarter_id, apartment_id = _req$body.apartment_id, country = _req$body.country;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            plate_number: plate_number,
            parking_type: parking_type,
            subscription_plan_days: subscription_plan_days,
            residential_quarter_id: residential_quarter_id
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_ResidentialCar["default"].registerResidentialCar({
            plate_number: plate_number,
            parking_type: parking_type,
            subscription_plan_days: subscription_plan_days,
            residential_quarter_id: residential_quarter_id,
            apartment_id: apartment_id,
            country: country
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
exports.registerResidentialCar = registerResidentialCar;
var getAllResidentialCars = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_ResidentialCar["default"].getAllResidentialCars());

        case 2:
          result = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).json(result));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getAllResidentialCars = getAllResidentialCars;
var getResidentialCarsByQuarter = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var residential_quarter_id, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          residential_quarter_id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_ResidentialCar["default"].getResidentialCarsByQuarter({
            residential_quarter_id: residential_quarter_id
          }));

        case 3:
          result = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(result));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getResidentialCarsByQuarter = getResidentialCarsByQuarter;
var getApartmentsCars = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var apartment_id, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          apartment_id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_ResidentialCar["default"].getApartmentsCars({
            apartment_id: apartment_id
          }));

        case 3:
          result = _context4.sent;
          return _context4.abrupt("return", res.status(_status_codes.OK).json(result));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.getApartmentsCars = getApartmentsCars;
var deleteResidentialCar = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var residential_car_id, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          residential_car_id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_ResidentialCar["default"].deleteResidentialCar({
            residential_car_id: residential_car_id
          }));

        case 3:
          result = _context5.sent;
          return _context5.abrupt("return", res.status(_status_codes.OK).json(result));

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.deleteResidentialCar = deleteResidentialCar;
var getResidentialDashboardStatistics = (0, _async_wrapper["default"])(function _callee6(req, res) {
  var residential_quarter_id, result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          residential_quarter_id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_ResidentialCar["default"].getResidentialDashboardStatistics({
            residential_quarter_id: residential_quarter_id
          }));

        case 3:
          result = _context6.sent;
          return _context6.abrupt("return", res.status(_status_codes.OK).json(result));

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.getResidentialDashboardStatistics = getResidentialDashboardStatistics;