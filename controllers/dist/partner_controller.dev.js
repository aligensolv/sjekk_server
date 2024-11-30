"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPartnerDashboard = exports.deletePartner = exports.updatePartner = exports.createPartner = exports.getAllPartnerPlacesCount = exports.getAllPartnerPlaces = exports.getAllPartners = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _Partner = _interopRequireDefault(require("../repositories/Partner.js"));

var _Validator = _interopRequireDefault(require("../repositories/Validator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllPartners = (0, _async_wrapper["default"])(function _callee(req, res) {
  var partners;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Partner["default"].getAllPartners());

        case 2:
          partners = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(partners));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllPartners = getAllPartners;
var getAllPartnerPlaces = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var partner_id, controlled_places;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          partner_id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Partner["default"].getAllPartnerPlaces({
            partner_id: partner_id
          }));

        case 3:
          controlled_places = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).json(controlled_places));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getAllPartnerPlaces = getAllPartnerPlaces;
var getAllPartnerPlacesCount = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var id, controlled_places_count;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Partner["default"].getAllPartnerPlacesCount(id));

        case 3:
          controlled_places_count = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(controlled_places_count));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getAllPartnerPlacesCount = getAllPartnerPlacesCount;
var createPartner = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var _req$body, name, phone_number, result;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, phone_number = _req$body.phone_number;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            name: name,
            phone_number: phone_number
          }));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(_Partner["default"].createPartner({
            name: name,
            phone_number: phone_number
          }));

        case 5:
          result = _context4.sent;
          return _context4.abrupt("return", res.status(_status_codes.OK).json(result));

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.createPartner = createPartner;
var updatePartner = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var partner_id, _req$body2, name, phone_number, result;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          partner_id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, phone_number = _req$body2.phone_number;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_Partner["default"].updatePartner({
            partner_id: partner_id,
            name: name,
            phone_number: phone_number
          }));

        case 4:
          result = _context5.sent;
          return _context5.abrupt("return", res.status(_status_codes.OK).json(result));

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.updatePartner = updatePartner;
var deletePartner = (0, _async_wrapper["default"])(function _callee6(req, res) {
  var partner_id, result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          partner_id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_Partner["default"].deletePartner({
            partner_id: partner_id
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
exports.deletePartner = deletePartner;
var createPartnerDashboard = (0, _async_wrapper["default"])(function _callee7(req, res) {
  var partner_id, _req$body3, access_username, access_code, result;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          partner_id = req.params.id;
          _req$body3 = req.body, access_username = _req$body3.access_username, access_code = _req$body3.access_code;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_Partner["default"].createPartnerDashboard({
            partner_id: partner_id,
            access_username: access_username,
            access_code: access_code
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
exports.createPartnerDashboard = createPartnerDashboard;