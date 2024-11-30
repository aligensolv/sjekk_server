"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCarLogsReports = exports.generateCarLogsReport = exports.getAllPlaceCarLogsAvgTime = exports.getAllPlaceCarLogsCount = exports.getAllPlaceCarLogs = exports.getAllCarLogs = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _CarLog = _interopRequireDefault(require("../repositories/CarLog.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllCarLogs = (0, _async_wrapper["default"])(function _callee(req, res) {
  var logs;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_CarLog["default"].getAllLogs());

        case 2:
          logs = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(logs));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllCarLogs = getAllCarLogs;
var getAllPlaceCarLogs = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var id, logs;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_CarLog["default"].getAllPlaceLogs(id));

        case 3:
          logs = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).json(logs));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getAllPlaceCarLogs = getAllPlaceCarLogs;
var getAllPlaceCarLogsCount = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var id, logs_count;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_CarLog["default"].getAllPlaceCarLogsCount(id));

        case 3:
          logs_count = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(logs_count));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getAllPlaceCarLogsCount = getAllPlaceCarLogsCount;
var getAllPlaceCarLogsAvgTime = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var id, logs_count;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_CarLog["default"].getAllPlaceCarLogsAvgTime(id));

        case 3:
          logs_count = _context4.sent;
          return _context4.abrupt("return", res.status(_status_codes.OK).json(logs_count));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.getAllPlaceCarLogsAvgTime = getAllPlaceCarLogsAvgTime;
var generateCarLogsReport = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var logs, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          logs = req.body.logs;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_CarLog["default"].generateCarLogsReport(logs));

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
exports.generateCarLogsReport = generateCarLogsReport;
var getAllCarLogsReports = (0, _async_wrapper["default"])(function _callee6(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_CarLog["default"].getAllCarLogsReports());

        case 2:
          result = _context6.sent;
          return _context6.abrupt("return", res.status(_status_codes.OK).json(result));

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.getAllCarLogsReports = getAllCarLogsReports;