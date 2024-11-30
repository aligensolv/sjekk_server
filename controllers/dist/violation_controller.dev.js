"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTicketPreview = exports.addImage = exports.deleteAllViolations = exports.deleteViolation = exports.createViolation = exports.getViolationByTicketNumber = exports.getViolation = exports.getAllUserViolations = exports.getAllPlaceviolations = exports.getViolationsCount = exports.getAllviolations = void 0;

var _config = require("../config.js");

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _Auth = _interopRequireDefault(require("../repositories/Auth.js"));

var _Time = _interopRequireDefault(require("../repositories/Time.js"));

var _Violation = _interopRequireDefault(require("../repositories/Violation.js"));

var _ViolationHelper = _interopRequireDefault(require("../repositories/ViolationHelper.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllviolations = (0, _async_wrapper["default"])(function _callee(req, res) {
  var violations;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Violation["default"].getAllViolations());

        case 2:
          violations = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(violations));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllviolations = getAllviolations;
var getViolationsCount = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var count;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_Violation["default"].getViolationsCount());

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
exports.getViolationsCount = getViolationsCount;
var getAllPlaceviolations = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var place_id, violations;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          place_id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Violation["default"].getAllPlaceViolations({
            place_id: place_id,
            session_id: req.headers['x-session-id']
          }));

        case 3:
          violations = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(violations));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getAllPlaceviolations = getAllPlaceviolations;
var getAllUserViolations = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var user_id, violations;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user_id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Violation["default"].getAllUserViolations({
            user_id: user_id,
            session_id: req.headers['x-session-id']
          }));

        case 3:
          violations = _context4.sent;
          return _context4.abrupt("return", res.status(_status_codes.OK).json(violations));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.getAllUserViolations = getAllUserViolations;
var getViolation = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var violation_id, violation;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          violation_id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_Violation["default"].getViolation({
            violation_id: violation_id
          }));

        case 3:
          violation = _context5.sent;
          return _context5.abrupt("return", res.status(_status_codes.OK).json(violation));

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.getViolation = getViolation;
var getViolationByTicketNumber = (0, _async_wrapper["default"])(function _callee6(req, res) {
  var ticket_number, violation;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          ticket_number = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_Violation["default"].getViolationByTicketNumber({
            ticket_number: ticket_number
          }));

        case 3:
          violation = _context6.sent;
          return _context6.abrupt("return", res.status(_status_codes.OK).json(violation));

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.getViolationByTicketNumber = getViolationByTicketNumber;
var createViolation = (0, _async_wrapper["default"])(function _callee7(req, res) {
  var _req$body, plate_info, registered_car, rules, is_car_registered, ticket_comment, system_comment, place, place_login_time, print_option, serial_number, barcode_image, ticket_image, ticket_number, kid_number, token, images, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, image, processed_image, decoded, violation;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body = req.body, plate_info = _req$body.plate_info, registered_car = _req$body.registered_car, rules = _req$body.rules, is_car_registered = _req$body.is_car_registered, ticket_comment = _req$body.ticket_comment, system_comment = _req$body.system_comment, place = _req$body.place, place_login_time = _req$body.place_login_time, print_option = _req$body.print_option, serial_number = _req$body.serial_number, barcode_image = _req$body.barcode_image, ticket_image = _req$body.ticket_image, ticket_number = _req$body.ticket_number, kid_number = _req$body.kid_number;
          console.log('inside create val');
          console.log(barcode_image);
          token = req.headers.token;
          images = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context7.prev = 8;
          _iterator = req.files[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context7.next = 19;
            break;
          }

          image = _step.value;
          _context7.next = 14;
          return regeneratorRuntime.awrap(_ViolationHelper["default"].addDateWatermarkToImage('./public/images/temp_cars/' + image.originalname, image.originalname, image.fieldname));

        case 14:
          processed_image = _context7.sent;
          images.push({
            path: _config.static_files_host + processed_image,
            date: image.fieldname,
            localPath: './public/images/temp_cars/' + image.originalname,
            originalName: image.originalname
          });

        case 16:
          _iteratorNormalCompletion = true;
          _context7.next = 10;
          break;

        case 19:
          _context7.next = 25;
          break;

        case 21:
          _context7.prev = 21;
          _context7.t0 = _context7["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context7.t0;

        case 25:
          _context7.prev = 25;
          _context7.prev = 26;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 28:
          _context7.prev = 28;

          if (!_didIteratorError) {
            _context7.next = 31;
            break;
          }

          throw _iteratorError;

        case 31:
          return _context7.finish(28);

        case 32:
          return _context7.finish(25);

        case 33:
          console.log(images);
          console.log(req.headers['x-session-id']);
          console.log(token);
          console.log(req.headers);
          _context7.next = 39;
          return regeneratorRuntime.awrap(_Auth["default"].verifyToken(token));

        case 39:
          decoded = _context7.sent;
          console.log(decoded);
          _context7.next = 43;
          return regeneratorRuntime.awrap(_Violation["default"].createViolation({
            user_id: decoded.id,
            pnid: decoded.pnid,
            session_id: req.headers['x-session-id'],
            plate_info: JSON.parse(plate_info),
            registered_car: is_car_registered === 'true' ? JSON.parse(registered_car) : null,
            rules: JSON.parse(rules),
            is_car_registered: is_car_registered === 'true',
            ticket_comment: ticket_comment,
            system_comment: system_comment,
            place: JSON.parse(place),
            images: images,
            created_by: decoded.id,
            print_option: print_option,
            place_login_time: place_login_time,
            serial_number: serial_number,
            barcode_image: barcode_image,
            ticket_image: ticket_image,
            ticket_number: ticket_number,
            kid_number: kid_number
          }));

        case 43:
          violation = _context7.sent;
          return _context7.abrupt("return", res.status(_status_codes.OK).json(true));

        case 45:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[8, 21, 25, 33], [26,, 28, 32]]);
});
exports.createViolation = createViolation;
var deleteViolation = (0, _async_wrapper["default"])(function _callee8(req, res) {
  var violation_id, deleted;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          violation_id = req.params.id;
          _context8.next = 3;
          return regeneratorRuntime.awrap(_Violation["default"].deleteViolation({
            violation_id: violation_id
          }));

        case 3:
          deleted = _context8.sent;
          return _context8.abrupt("return", res.status(_status_codes.OK).send(deleted));

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
});
exports.deleteViolation = deleteViolation;
var deleteAllViolations = (0, _async_wrapper["default"])(function _callee9(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(_Violation["default"].deleteAllViolations());

        case 2:
          response = _context9.sent;
          return _context9.abrupt("return", res.status(_status_codes.OK).send(response));

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
});
exports.deleteAllViolations = deleteAllViolations;
var addImage = (0, _async_wrapper["default"])(function _callee10(req, res) {
  var violation_id, proccessed_image, image;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          violation_id = req.params.id;
          _context10.next = 3;
          return regeneratorRuntime.awrap(_ViolationHelper["default"].addDateWatermarkToImage('./public/images/temp_cars/' + req.file.originalname, req.file.originalname, _Time["default"].getCurrentTime()));

        case 3:
          proccessed_image = _context10.sent;
          image = {
            path: _config.static_files_host + proccessed_image,
            date: _Time["default"].getCurrentTime(),
            localPath: './public/images/temp_cars/' + req.file.originalname,
            originalName: req.file.originalname
          };
          _context10.next = 7;
          return regeneratorRuntime.awrap(_Violation["default"].addImage({
            violation_id: violation_id,
            image: image
          }));

        case 7:
          return _context10.abrupt("return", res.status(_status_codes.OK).send(_config.static_files_host + proccessed_image));

        case 8:
        case "end":
          return _context10.stop();
      }
    }
  });
});
exports.addImage = addImage;
var getTicketPreview = (0, _async_wrapper["default"])(function _callee11(req, res) {
  var _req$body2, plate_info, rules, ticket_comment, place, place_login_time, print_option, token, decoded, ticket_preview;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _req$body2 = req.body, plate_info = _req$body2.plate_info, rules = _req$body2.rules, ticket_comment = _req$body2.ticket_comment, place = _req$body2.place, place_login_time = _req$body2.place_login_time, print_option = _req$body2.print_option;
          token = req.headers.token;
          console.log(req.body);
          _context11.next = 5;
          return regeneratorRuntime.awrap(_Auth["default"].verifyToken(token));

        case 5:
          decoded = _context11.sent;
          _context11.next = 8;
          return regeneratorRuntime.awrap(_Violation["default"].getTicketPreview({
            pnid: decoded.pnid,
            plate_info: plate_info,
            rules: rules,
            ticket_comment: ticket_comment,
            place: place,
            place_login_time: place_login_time,
            print_option: print_option
          }));

        case 8:
          ticket_preview = _context11.sent;
          return _context11.abrupt("return", res.status(_status_codes.OK).json(ticket_preview));

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  });
});
exports.getTicketPreview = getTicketPreview;