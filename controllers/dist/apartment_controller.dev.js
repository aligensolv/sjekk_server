"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApartmentsByResidentialQuarter = exports.getAllApartments = exports.changeApartmentPassword = exports.createApartment = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _Apartment = _interopRequireDefault(require("../repositories/Apartment.js"));

var _Validator = _interopRequireDefault(require("../repositories/Validator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createApartment = (0, _async_wrapper["default"])(function _callee(req, res) {
  var _req$body, location, policy, code, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, location = _req$body.location, policy = _req$body.policy, code = _req$body.code;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            location: location,
            policy: policy,
            code: code
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_Apartment["default"].createApartment({
            location: location,
            policy: policy,
            code: code
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
exports.createApartment = createApartment;
var changeApartmentPassword = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var apartment_id, _req$body2, old_password, new_password, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          apartment_id = req.params.id;
          _req$body2 = req.body, old_password = _req$body2.old_password, new_password = _req$body2.new_password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_Apartment["default"].changeApartmentPassword({
            old_password: old_password,
            new_password: new_password,
            apartment_id: apartment_id
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
exports.changeApartmentPassword = changeApartmentPassword;
var getAllApartments = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_Apartment["default"].getAllApartment());

        case 2:
          result = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(result));

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getAllApartments = getAllApartments;
var getApartmentsByResidentialQuarter = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var residential_quarter_id, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          residential_quarter_id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Apartment["default"].getApartmentsByResidentialQuarter({
            residential_quarter_id: residential_quarter_id
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
exports.getApartmentsByResidentialQuarter = getApartmentsByResidentialQuarter;