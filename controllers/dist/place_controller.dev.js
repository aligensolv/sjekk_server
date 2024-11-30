"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCarsRegisteredByPlaceDashboard = exports.createCarFromPlaceDashboard = exports.getPlaceProfile = exports.getAllPlaceDashboards = exports.createPlaceDashboard = exports.deleteAllPlaces = exports.deletePlaceDashboard = exports.deletePlace = exports.updatePlace = exports.createPlace = exports.getPlace = exports.getPlacesCount = exports.getAllPlaces = void 0;

var _Place = _interopRequireDefault(require("../repositories/Place.js"));

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _custom_error_class = _interopRequireDefault(require("../interfaces/custom_error_class.js"));

var _PlaceProfile = _interopRequireDefault(require("../models/PlaceProfile.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllPlaces = (0, _async_wrapper["default"])(function _callee(req, res, next) {
  var places;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Place["default"].getAllPlaces());

        case 2:
          places = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.OK).json(places));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getAllPlaces = getAllPlaces;
var getPlacesCount = (0, _async_wrapper["default"])(function _callee2(req, res, next) {
  var count;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_Place["default"].getPlacesCount());

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
exports.getPlacesCount = getPlacesCount;

var getPlace = function getPlace(req, res) {
  var place_id, place;
  return regeneratorRuntime.async(function getPlace$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          place_id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_Place["default"].getPlace({
            place_id: place_id
          }));

        case 4:
          place = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(place));

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(_status_codes.INTERNAL_SERVER).send(_context3.t0));

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getPlace = getPlace;
var createPlace = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var data, newPlace;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          data = req.body;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Place["default"].createPlace(data));

        case 3:
          newPlace = _context4.sent;
          return _context4.abrupt("return", res.status(_status_codes.OK).json(newPlace));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.createPlace = createPlace;
var updatePlace = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var place_id, _req$body, location, policy, code, partner_id, updated;

  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          place_id = req.params.id;
          _req$body = req.body, location = _req$body.location, policy = _req$body.policy, code = _req$body.code, partner_id = _req$body.partner_id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_Place["default"].updatePlace({
            place_id: place_id,
            location: location,
            policy: policy,
            code: code,
            partner_id: partner_id
          }));

        case 4:
          updated = _context5.sent;
          return _context5.abrupt("return", res.status(_status_codes.OK).json({
            success: updated,
            message: 'Place updated successfully'
          }));

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.updatePlace = updatePlace;
var deletePlace = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var place_id, deleted;
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          place_id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_Place["default"].deletePlace({
            place_id: place_id
          }));

        case 3:
          deleted = _context6.sent;
          return _context6.abrupt("return", res.status(_status_codes.OK).json({
            success: deleted,
            message: 'Place was deleted successfully'
          }));

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.deletePlace = deletePlace;
var deletePlaceDashboard = (0, _async_wrapper["default"])(function _callee6(req, res) {
  var dashboard_id, deleted;
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          dashboard_id = req.params.dashboard_id;
          _context7.next = 3;
          return regeneratorRuntime.awrap(_Place["default"].deletePlaceDashboard({
            dashboard_id: dashboard_id
          }));

        case 3:
          deleted = _context7.sent;
          return _context7.abrupt("return", res.status(_status_codes.OK).json({
            success: deleted,
            message: 'Place was deleted successfully'
          }));

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.deletePlaceDashboard = deletePlaceDashboard;
var deleteAllPlaces = (0, _async_wrapper["default"])(function _callee7(req, res) {
  var count;
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(_Place["default"].deleteAllPlaces());

        case 2:
          count = _context8.sent;
          return _context8.abrupt("return", res.status(_status_codes.OK).json({
            count: count,
            message: 'All places were deleted successfully'
          }));

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
});
exports.deleteAllPlaces = deleteAllPlaces;
var createPlaceDashboard = (0, _async_wrapper["default"])(function _callee8(req, res) {
  var place_id, _req$body2, access_code, access_username, place_name, place_type, free_parking_hours, result;

  return regeneratorRuntime.async(function _callee8$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          place_id = req.params.id;
          _req$body2 = req.body, access_code = _req$body2.access_code, access_username = _req$body2.access_username, place_name = _req$body2.place_name, place_type = _req$body2.place_type, free_parking_hours = _req$body2.free_parking_hours;
          _context9.next = 4;
          return regeneratorRuntime.awrap(_Place["default"].createPlaceDashboard({
            place_id: place_id,
            access_code: access_code,
            access_username: access_username,
            place_name: place_name,
            place_type: place_type,
            free_parking_hours: free_parking_hours
          }));

        case 4:
          result = _context9.sent;
          return _context9.abrupt("return", res.status(_status_codes.OK).json(result));

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
});
exports.createPlaceDashboard = createPlaceDashboard;
var getAllPlaceDashboards = (0, _async_wrapper["default"])(function _callee9(req, res) {
  var place_id, result;
  return regeneratorRuntime.async(function _callee9$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          place_id = req.params.id;
          _context10.next = 3;
          return regeneratorRuntime.awrap(_Place["default"].getAllPlaceDashboards({
            place_id: place_id
          }));

        case 3:
          result = _context10.sent;
          return _context10.abrupt("return", res.status(_status_codes.OK).json(result));

        case 5:
        case "end":
          return _context10.stop();
      }
    }
  });
});
exports.getAllPlaceDashboards = getAllPlaceDashboards;
var getPlaceProfile = (0, _async_wrapper["default"])(function _callee10(req, res) {
  var client, result;
  return regeneratorRuntime.async(function _callee10$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          client = req.params.client;
          _context11.next = 3;
          return regeneratorRuntime.awrap(_Place["default"].getPlaceProfile(client));

        case 3:
          result = _context11.sent;
          return _context11.abrupt("return", res.status(_status_codes.OK).json(result));

        case 5:
        case "end":
          return _context11.stop();
      }
    }
  });
});
exports.getPlaceProfile = getPlaceProfile;
var createCarFromPlaceDashboard = (0, _async_wrapper["default"])(function _callee11(req, res) {
  var dashboard_id, plate_number, result;
  return regeneratorRuntime.async(function _callee11$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          dashboard_id = req.params.id;
          plate_number = req.body.plate_number;
          _context12.next = 4;
          return regeneratorRuntime.awrap(_Place["default"].createCarFromPlaceDashboard({
            plate_number: plate_number,
            dashboard_id: dashboard_id
          }));

        case 4:
          result = _context12.sent;
          return _context12.abrupt("return", res.status(_status_codes.OK).json(result));

        case 6:
        case "end":
          return _context12.stop();
      }
    }
  });
});
exports.createCarFromPlaceDashboard = createCarFromPlaceDashboard;
var getAllCarsRegisteredByPlaceDashboard = (0, _async_wrapper["default"])(function _callee12(req, res) {
  var place_dashboard_id, result;
  return regeneratorRuntime.async(function _callee12$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          place_dashboard_id = req.params.id;
          _context13.next = 3;
          return regeneratorRuntime.awrap(_Place["default"].getAllCarsRegisteredByPlaceDashboard({
            place_dashboard_id: place_dashboard_id
          }));

        case 3:
          result = _context13.sent;
          return _context13.abrupt("return", res.status(_status_codes.OK).json(result));

        case 5:
        case "end":
          return _context13.stop();
      }
    }
  });
});
exports.getAllCarsRegisteredByPlaceDashboard = getAllCarsRegisteredByPlaceDashboard;