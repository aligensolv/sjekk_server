"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAllUsers = exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.getUsersCount = exports.getAllDeletedUsers = exports.getAllUsers = void 0;

var _User = _interopRequireDefault(require("../repositories/User.js"));

var _moment = _interopRequireDefault(require("moment"));

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _custom_error_class = _interopRequireDefault(require("../interfaces/custom_error_class.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllUsers = (0, _async_wrapper["default"])(function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_User["default"].getAllUsers());

        case 2:
          users = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(users));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllUsers = getAllUsers;
var getAllDeletedUsers = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_User["default"].getAllDeletedUsers());

        case 2:
          users = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).json(users));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getAllDeletedUsers = getAllDeletedUsers;
var getUsersCount = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var count;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_User["default"].getUsersCount());

        case 2:
          count = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).send(count));

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getUsersCount = getUsersCount;
var createUser = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var _req$body, name, pnid, password, registered;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, pnid = _req$body.pnid, password = _req$body.password;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_User["default"].createUser({
            name: name,
            pnid: pnid,
            password: password
          }));

        case 3:
          registered = _context4.sent;
          return _context4.abrupt("return", res.status(_status_codes.OK).json(registered));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.createUser = createUser;
var getUser = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var user_id, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          user_id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_User["default"].getUser({
            user_id: user_id
          }));

        case 3:
          user = _context5.sent;
          return _context5.abrupt("return", res.status(_status_codes.OK).json(user));

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.getUser = getUser;
var updateUser = (0, _async_wrapper["default"])(function _callee6(req, res) {
  var user_id, _req$body2, name, pnid, password, updated;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          user_id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, pnid = _req$body2.pnid, password = _req$body2.password;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_User["default"].updateUser({
            user_id: user_id,
            name: name,
            pnid: pnid,
            password: password
          }));

        case 4:
          updated = _context6.sent;
          return _context6.abrupt("return", res.status(_status_codes.OK).json(updated));

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.updateUser = updateUser;
var deleteUser = (0, _async_wrapper["default"])(function _callee7(req, res) {
  var user_id, result;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          user_id = req.params.id;
          console.log(req.params);
          _context7.next = 4;
          return regeneratorRuntime.awrap(_User["default"].deleteUser({
            user_id: user_id
          }));

        case 4:
          result = _context7.sent;
          return _context7.abrupt("return", res.status(_status_codes.OK).json(result));

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.deleteUser = deleteUser;
var deleteAllUsers = (0, _async_wrapper["default"])(function _callee8(req, res) {
  var count;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(_User["default"].deleteAllUsers());

        case 2:
          count = _context8.sent;
          return _context8.abrupt("return", res.status(_status_codes.OK).json({
            count: count,
            message: 'All users were deleted successfully'
          }));

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
});
exports.deleteAllUsers = deleteAllUsers;