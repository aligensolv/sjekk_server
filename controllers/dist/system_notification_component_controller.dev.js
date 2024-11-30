"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeSystemNotificationComponent = exports.getAllSystemNotificationComponents = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _SystemNotificationComponent = _interopRequireDefault(require("../repositories/SystemNotificationComponent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllSystemNotificationComponents = (0, _async_wrapper["default"])(function _callee(req, res) {
  var id, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(_SystemNotificationComponent["default"].getSystemNotificationComponent({
            id: id
          }));

        case 3:
          result = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(result));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllSystemNotificationComponents = getAllSystemNotificationComponents;
var storeSystemNotificationComponent = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var _req$body, title, body, icon, image, is_favorite, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, body = _req$body.body, icon = _req$body.icon, image = _req$body.image, is_favorite = _req$body.is_favorite;
          console.log(req.body);
          _context2.next = 4;
          return regeneratorRuntime.awrap(_SystemNotificationComponent["default"].createSystemNotificationComponent({
            title: title,
            body: body,
            icon: icon,
            image: image,
            is_favorite: is_favorite
          }));

        case 4:
          result = _context2.sent;
          return _context2.abrupt("return", res.status(_status_codes.OK).json(result));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.storeSystemNotificationComponent = storeSystemNotificationComponent;