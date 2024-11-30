"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllStatistics = void 0;

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _status_codes = require("../constants/status_codes.js");

var _client = require("@prisma/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var prisma = new _client.PrismaClient();
var getAllStatistics = (0, _async_wrapper["default"])(function _callee(req, res) {
  var usersCount, rulesCount, placesCount, brandsCount, colorsCount, carsCount, violationsCount, partnersCount, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(prisma.user.count({
            where: {
              deleted_at: null
            }
          }));

        case 2:
          usersCount = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(prisma.rule.count({
            where: {
              deleted_at: null
            }
          }));

        case 5:
          rulesCount = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(prisma.place.count({
            where: {
              deleted_at: null
            }
          }));

        case 8:
          placesCount = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(prisma.brand.count());

        case 11:
          brandsCount = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(prisma.color.count());

        case 14:
          colorsCount = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(prisma.registeredCar.count({
            where: {
              deleted_at: null
            }
          }));

        case 17:
          carsCount = _context.sent;
          _context.next = 20;
          return regeneratorRuntime.awrap(prisma.violation.count());

        case 20:
          violationsCount = _context.sent;
          _context.next = 23;
          return regeneratorRuntime.awrap(prisma.partner.count({
            where: {
              deleted_at: null
            }
          }));

        case 23:
          partnersCount = _context.sent;
          data = {
            usersCount: usersCount,
            rulesCount: rulesCount,
            placesCount: placesCount,
            brandsCount: brandsCount,
            colorsCount: colorsCount,
            carsCount: carsCount,
            violationsCount: violationsCount,
            partnersCount: partnersCount
          };
          return _context.abrupt("return", res.status(_status_codes.OK).json(data));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllStatistics = getAllStatistics;