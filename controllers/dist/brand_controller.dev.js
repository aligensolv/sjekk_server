"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteBrand = exports.createBrand = exports.getAllBrands = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _Brand = _interopRequireDefault(require("../repositories/Brand.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllBrands = (0, _async_wrapper["default"])(function _callee(req, res) {
  var brands;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Brand["default"].getAllBrands());

        case 2:
          brands = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(brands));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllBrands = getAllBrands;
var createBrand = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var brand, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          brand = req.body.brand;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Brand["default"].createBrand(brand));

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
exports.createBrand = createBrand;
var deleteBrand = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var id, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Brand["default"].deleteBrand(id));

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
exports.deleteBrand = deleteBrand;