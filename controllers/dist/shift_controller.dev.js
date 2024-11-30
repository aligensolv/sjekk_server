"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endShift = exports.createShift = exports.getUserShifts = exports.createReport = exports.searchLogins = exports.getShiftsByDate = exports.getAllTodayShifts = exports.getAllShifts = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _config = require("../config.js");

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _Shift = _interopRequireDefault(require("../repositories/Shift.js"));

var _ShiftHelper = _interopRequireDefault(require("../repositories/ShiftHelper.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../repositories/User.js"));

var _Auth = _interopRequireDefault(require("../repositories/Auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllShifts = (0, _async_wrapper["default"])(function _callee(req, res) {
  var shifts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Shift["default"].getAllShifts());

        case 2:
          shifts = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(shifts));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllShifts = getAllShifts;
var getAllTodayShifts = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var shifts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_Shift["default"].getAllTodayShifts());

        case 2:
          shifts = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).json(shifts));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getAllTodayShifts = getAllTodayShifts;
var getShiftsByDate = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var date, shifts;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          date = req.body.date;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Shift["default"].getShiftsByDate(date));

        case 3:
          shifts = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(shifts));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getShiftsByDate = getShiftsByDate;
var searchLogins = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var _req$body, start_date, end_date, place, shifts, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, shift, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, placeLogin, login_time, logout_time, start, end, isBetween, user;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, start_date = _req$body.start_date, end_date = _req$body.end_date, place = _req$body.place;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Shift["default"].getAllShifts());

        case 3:
          shifts = _context4.sent;
          result = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 8;
          _iterator = shifts[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context4.next = 49;
            break;
          }

          shift = _step.value;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context4.prev = 15;
          _iterator2 = shift.logins[Symbol.iterator]();

        case 17:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context4.next = 32;
            break;
          }

          placeLogin = _step2.value;
          login_time = (0, _moment["default"])(placeLogin.login_time);
          logout_time = (0, _moment["default"])(placeLogin.logout_time);
          start = (0, _moment["default"])(start_date);
          end = (0, _moment["default"])(end_date);
          isBetween = login_time.isAfter(start) && logout_time.isBefore(end);

          if (!(isBetween && placeLogin.place_id == place)) {
            _context4.next = 29;
            break;
          }

          _context4.next = 27;
          return regeneratorRuntime.awrap(_User["default"].getUser(shift.user_identifier));

        case 27:
          user = _context4.sent;
          result.push({
            login_time: login_time.format('DD.MM.YY HH:mm'),
            logout_time: logout_time.format('DD.MM.YY HH:mm'),
            place: placeLogin.place_name,
            user: user.user_identifier
          });

        case 29:
          _iteratorNormalCompletion2 = true;
          _context4.next = 17;
          break;

        case 32:
          _context4.next = 38;
          break;

        case 34:
          _context4.prev = 34;
          _context4.t0 = _context4["catch"](15);
          _didIteratorError2 = true;
          _iteratorError2 = _context4.t0;

        case 38:
          _context4.prev = 38;
          _context4.prev = 39;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 41:
          _context4.prev = 41;

          if (!_didIteratorError2) {
            _context4.next = 44;
            break;
          }

          throw _iteratorError2;

        case 44:
          return _context4.finish(41);

        case 45:
          return _context4.finish(38);

        case 46:
          _iteratorNormalCompletion = true;
          _context4.next = 10;
          break;

        case 49:
          _context4.next = 55;
          break;

        case 51:
          _context4.prev = 51;
          _context4.t1 = _context4["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context4.t1;

        case 55:
          _context4.prev = 55;
          _context4.prev = 56;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 58:
          _context4.prev = 58;

          if (!_didIteratorError) {
            _context4.next = 61;
            break;
          }

          throw _iteratorError;

        case 61:
          return _context4.finish(58);

        case 62:
          return _context4.finish(55);

        case 63:
          return _context4.abrupt("return", res.status(_status_codes.OK).json(result));

        case 64:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[8, 51, 55, 63], [15, 34, 38, 46], [39,, 41, 45], [56,, 58, 62]]);
});
exports.searchLogins = searchLogins;
var createReport = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var _req$body2, results, start_date, end_date, result;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, results = _req$body2.results, start_date = _req$body2.start_date, end_date = _req$body2.end_date;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_ShiftHelper["default"].generateReport(results, start_date, end_date));

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
exports.createReport = createReport;
var getUserShifts = (0, _async_wrapper["default"])(function _callee6(req, res) {
  var id, shifts;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_Shift["default"].getUserShifts(id));

        case 3:
          shifts = _context6.sent;
          return _context6.abrupt("return", res.status(_status_codes.OK).json(shifts));

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.getUserShifts = getUserShifts;
var createShift = (0, _async_wrapper["default"])(function _callee7(req, res) {
  var token, decoded, shift;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          token = req.headers.token;
          console.log(req.headers);
          _context7.next = 4;
          return regeneratorRuntime.awrap(_Auth["default"].verifyToken(token));

        case 4:
          decoded = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(_Shift["default"].createShift({
            user_id: decoded.id,
            pnid: decoded.pnid,
            session_id: req.headers['x-session-id']
          }));

        case 7:
          shift = _context7.sent;
          return _context7.abrupt("return", res.status(_status_codes.OK).json(shift));

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.createShift = createShift;
var endShift = (0, _async_wrapper["default"])(function _callee8(req, res) {
  var id, logins;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          logins = req.body.logins;
          _context8.next = 4;
          return regeneratorRuntime.awrap(_Shift["default"].endShift(id, JSON.parse(logins)));

        case 4:
          return _context8.abrupt("return", res.status(_status_codes.OK).json({
            message: 'shift was ended'
          }));

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
});
exports.endShift = endShift;