"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAllRules = exports.deleteRule = exports.updateRule = exports.createRule = exports.getRule = exports.getRulesCount = exports.getAllRules = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _Rule = _interopRequireDefault(require("../repositories/Rule.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllRules = (0, _async_wrapper["default"])(function _callee(req, res) {
  var rules;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Rule["default"].getAllRules());

        case 2:
          rules = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(rules));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllRules = getAllRules;
var getRulesCount = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var count;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_Rule["default"].getRulesCount());

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
exports.getRulesCount = getRulesCount;
var getRule = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var rule_id, rule;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          rule_id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Rule["default"].getRule({
            rule_id: rule_id
          }));

        case 3:
          rule = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(rule));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getRule = getRule;
var createRule = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var _req$body, name, charge, policy_time, extras, rule;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, charge = _req$body.charge, policy_time = _req$body.policy_time, extras = _req$body.extras;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Rule["default"].createRule({
            name: name,
            charge: charge,
            policy_time: policy_time,
            extras: extras
          }));

        case 3:
          rule = _context4.sent;
          return _context4.abrupt("return", res.status(_status_codes.OK).json(rule));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.createRule = createRule;
var updateRule = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var _req$body2, name, charge, policy_time, extras, rule_id, updated;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, charge = _req$body2.charge, policy_time = _req$body2.policy_time, extras = _req$body2.extras;
          rule_id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_Rule["default"].updateRule({
            rule_id: rule_id,
            name: name,
            charge: charge,
            policy_time: policy_time,
            extras: extras
          }));

        case 4:
          updated = _context5.sent;
          return _context5.abrupt("return", res.status(_status_codes.OK).json(updated));

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.updateRule = updateRule;
var deleteRule = (0, _async_wrapper["default"])(function _callee6(req, res) {
  var rule_id, deleted;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          rule_id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_Rule["default"].deleteRule({
            rule_id: rule_id
          }));

        case 3:
          deleted = _context6.sent;
          return _context6.abrupt("return", res.status(_status_codes.OK).json(deleted));

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.deleteRule = deleteRule;
var deleteAllRules = (0, _async_wrapper["default"])(function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(_Rule["default"].deleteAllRules());

        case 2:
          return _context7.abrupt("return", res.status(_status_codes.OK).json(true));

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.deleteAllRules = deleteAllRules;