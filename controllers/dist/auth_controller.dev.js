"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginApartment = exports.validateToken = exports.loginPlace = exports.loginPartner = exports.loginUser = void 0;

var _Auth = _interopRequireDefault(require("../repositories/Auth.js"));

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _Validator = _interopRequireDefault(require("../repositories/Validator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginUser = (0, _async_wrapper["default"])(function _callee(req, res, next) {
  var _req$body, pnid, password, success_login_result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, pnid = _req$body.pnid, password = _req$body.password;
          console.log(req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            pnid: pnid,
            password: password
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_Auth["default"].loginUser({
            pnid: pnid,
            password: password
          }));

        case 6:
          success_login_result = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(success_login_result));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.loginUser = loginUser;
var loginPartner = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var _req$body2, access_code, access_username, success_login_result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, access_code = _req$body2.access_code, access_username = _req$body2.access_username;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            access_username: access_username,
            access_code: access_code
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(_Auth["default"].loginPartner({
            access_code: access_code,
            access_username: access_username
          }));

        case 5:
          success_login_result = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).json(success_login_result));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.loginPartner = loginPartner;
var loginPlace = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var id, _req$body3, access_code, access_username, success_login_result;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _req$body3 = req.body, access_code = _req$body3.access_code, access_username = _req$body3.access_username;
          console.log(access_code, access_username);
          _context3.next = 5;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            access_code: access_code,
            access_username: access_username
          }));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(_Auth["default"].loginPlace({
            id: id,
            access_code: access_code,
            access_username: access_username
          }));

        case 7:
          success_login_result = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(success_login_result));

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.loginPlace = loginPlace;
var validateToken = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          token = req.body.token;
          console.log(token);
          _context4.next = 4;
          return regeneratorRuntime.awrap(_Auth["default"].verifyToken(token));

        case 4:
          decoded = _context4.sent;
          console.log(decoded);
          return _context4.abrupt("return", res.status(_status_codes.OK).json(decoded));

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.validateToken = validateToken;
var loginApartment = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var _req$body4, access_password, access_username, success_login_result;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body4 = req.body, access_password = _req$body4.access_password, access_username = _req$body4.access_username;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            access_password: access_password,
            access_username: access_username
          }));

        case 3:
          _context5.next = 5;
          return regeneratorRuntime.awrap(_Auth["default"].loginApartment({
            access_password: access_password,
            access_username: access_username
          }));

        case 5:
          success_login_result = _context5.sent;
          return _context5.abrupt("return", res.status(_status_codes.OK).json(success_login_result));

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.loginApartment = loginApartment;