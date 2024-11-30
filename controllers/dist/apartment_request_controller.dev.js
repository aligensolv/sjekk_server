"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rejectApartmentRequest = exports.acceptApartmentRequest = exports.getApartmentRequestsByResidentialQuarter = exports.createApartmentRequest = exports.getAllApartmentRequests = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _ApartmentRequest = _interopRequireDefault(require("../repositories/ApartmentRequest.js"));

var _Validator = _interopRequireDefault(require("../repositories/Validator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllApartmentRequests = (0, _async_wrapper["default"])(function _callee(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_ApartmentRequest["default"].getAllApartmentRequests());

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
exports.getAllApartmentRequests = getAllApartmentRequests;
var createApartmentRequest = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var residential_quarter_id, _req$body, owner_name, username, password, apartment_number, email, building_number, floor_number, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          residential_quarter_id = req.params.id;
          _req$body = req.body, owner_name = _req$body.owner_name, username = _req$body.username, password = _req$body.password, apartment_number = _req$body.apartment_number, email = _req$body.email, building_number = _req$body.building_number, floor_number = _req$body.floor_number;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            owner_name: owner_name,
            username: username,
            password: password,
            apartment_number: apartment_number,
            email: email,
            residential_quarter_id: residential_quarter_id,
            building_number: building_number,
            floor_number: floor_number
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(_ApartmentRequest["default"].createApartmentRequest({
            owner_name: owner_name,
            username: username,
            password: password,
            apartment_number: apartment_number,
            email: email,
            residential_quarter_id: residential_quarter_id,
            building_number: building_number,
            floor_number: floor_number
          }));

        case 6:
          result = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).json(result));

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.createApartmentRequest = createApartmentRequest;
var getApartmentRequestsByResidentialQuarter = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var residential_quarter_id, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          residential_quarter_id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_ApartmentRequest["default"].getApartmentRequestsByResidentialQuarter({
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
exports.getApartmentRequestsByResidentialQuarter = getApartmentRequestsByResidentialQuarter;
var acceptApartmentRequest = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var apartment_request_id, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          apartment_request_id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_ApartmentRequest["default"].acceptApartmentRequest({
            apartment_request_id: apartment_request_id
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
exports.acceptApartmentRequest = acceptApartmentRequest;
var rejectApartmentRequest = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var apartment_request_id, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          apartment_request_id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_ApartmentRequest["default"].rejectApartmentRequest({
            apartment_request_id: apartment_request_id
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
exports.rejectApartmentRequest = rejectApartmentRequest;