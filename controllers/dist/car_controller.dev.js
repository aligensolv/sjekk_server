"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAllCars = exports.deleteCar = exports.updateCar = exports.createCar = exports.getCarByPlate = exports.getCar = exports.getAllCarsByPlace = exports.getCarsCount = exports.getAllCars = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _Car = _interopRequireDefault(require("../repositories/Car.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllCars = (0, _async_wrapper["default"])(function _callee(req, res) {
  var cars;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Car["default"].getAllCars());

        case 2:
          cars = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(cars));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllCars = getAllCars;
var getCarsCount = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var count;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_Car["default"].getCarsCount());

        case 2:
          count = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).send(count));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getCarsCount = getCarsCount;
var getAllCarsByPlace = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var place_id, cars;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          place_id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Car["default"].getAllCarsByPlace({
            place_id: place_id
          }));

        case 3:
          cars = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(cars));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getAllCarsByPlace = getAllCarsByPlace;
var getCar = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var car_id, car;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          car_id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Car["default"].getCar({
            car_id: car_id
          }));

        case 3:
          car = _context4.sent;
          return _context4.abrupt("return", res.status(_status_codes.OK).json(car));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.getCar = getCar;
var getCarByPlate = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var plate_number, car;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          plate_number = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_Car["default"].getCarByPlate({
            plate_number: plate_number
          }));

        case 3:
          car = _context5.sent;
          return _context5.abrupt("return", res.status(_status_codes.OK).json(car));

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.getCarByPlate = getCarByPlate;
var createCar = (0, _async_wrapper["default"])(function _callee6(req, res) {
  var _req$body, plate_number, start_date, end_date, registration_type, place_id, country, car;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body = req.body, plate_number = _req$body.plate_number, start_date = _req$body.start_date, end_date = _req$body.end_date, registration_type = _req$body.registration_type, place_id = _req$body.place_id, country = _req$body.country;
          console.log(req.body);
          _context6.next = 4;
          return regeneratorRuntime.awrap(_Car["default"].createCar({
            plate_number: plate_number,
            start_date: start_date,
            end_date: end_date,
            registration_type: registration_type,
            place_id: place_id,
            country: country
          }));

        case 4:
          car = _context6.sent;
          return _context6.abrupt("return", res.status(_status_codes.OK).json(car));

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.createCar = createCar;
var updateCar = (0, _async_wrapper["default"])(function _callee7(req, res) {
  var car_id, _req$body2, start_date, end_date, plate_number, updated;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          car_id = req.params.id;
          _req$body2 = req.body, start_date = _req$body2.start_date, end_date = _req$body2.end_date, plate_number = _req$body2.plate_number;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_Car["default"].updateCar({
            car_id: car_id,
            start_date: start_date,
            end_date: end_date,
            plate_number: plate_number
          }));

        case 4:
          updated = _context7.sent;
          return _context7.abrupt("return", res.status(_status_codes.OK).json(updated));

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.updateCar = updateCar;
var deleteCar = (0, _async_wrapper["default"])(function _callee8(req, res) {
  var car_id, delete_result;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          car_id = req.params.id;
          _context8.next = 3;
          return regeneratorRuntime.awrap(_Car["default"].deleteCar({
            car_id: car_id
          }));

        case 3:
          delete_result = _context8.sent;
          return _context8.abrupt("return", res.status(_status_codes.OK).json(delete_result));

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
});
exports.deleteCar = deleteCar;
var deleteAllCars = (0, _async_wrapper["default"])(function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(_Car["default"].deleteAllCars());

        case 2:
          return _context9.abrupt("return", res.status(_status_codes.OK).json(true));

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
});
exports.deleteAllCars = deleteAllCars;