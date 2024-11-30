"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePlaceRequest = exports.approvePlaceRequest = exports.updatePlaceRequestStatus = exports.getAllPlaceRequests = exports.getAllPartnerPlaceRequests = exports.getPlaceRequestById = exports.createPlaceRequest = void 0;

var _status_codes = require("../constants/status_codes.js");

var _async_wrapper = _interopRequireDefault(require("../middlewares/async_wrapper.js"));

var _PlaceRequest = _interopRequireDefault(require("../repositories/PlaceRequest.js"));

var _Validator = _interopRequireDefault(require("../repositories/Validator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create a new place request
var createPlaceRequest = (0, _async_wrapper["default"])(function _callee(req, res) {
  var _req$body, request_type, location, policy, code, requested_by_id, place_id, placeRequest;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, request_type = _req$body.request_type, location = _req$body.location, policy = _req$body.policy, code = _req$body.code, requested_by_id = _req$body.requested_by_id, place_id = _req$body.place_id;
          console.log(req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(_Validator["default"].validateNotNull({
            request_type: request_type,
            requested_by_id: requested_by_id
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_PlaceRequest["default"].createPlaceRequest({
            request_type: request_type,
            location: location,
            policy: policy,
            code: code,
            requested_by_id: requested_by_id,
            place_id: place_id
          }));

        case 6:
          placeRequest = _context.sent;
          return _context.abrupt("return", res.status(_status_codes.CREATED).json(placeRequest));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}); // Get a place request by ID

exports.createPlaceRequest = createPlaceRequest;
var getPlaceRequestById = (0, _async_wrapper["default"])(function _callee2(req, res) {
  var id, placeRequest;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_PlaceRequest["default"].getPlaceRequestById({
            place_request_id: id
          }));

        case 3:
          placeRequest = _context2.sent;

          if (placeRequest) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(_status_codes.NOT_FOUND).json({
            error: 'Place request not found'
          }));

        case 6:
          return _context2.abrupt("return", res.status(_status_codes.OK).json(placeRequest));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getPlaceRequestById = getPlaceRequestById;
var getAllPartnerPlaceRequests = (0, _async_wrapper["default"])(function _callee3(req, res) {
  var partner_id, placeRequests;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          partner_id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_PlaceRequest["default"].getAllPartnerPlaceRequests({
            partner_id: partner_id
          }));

        case 3:
          placeRequests = _context3.sent;
          return _context3.abrupt("return", res.status(_status_codes.OK).json(placeRequests));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // Get all place requests

exports.getAllPartnerPlaceRequests = getAllPartnerPlaceRequests;
var getAllPlaceRequests = (0, _async_wrapper["default"])(function _callee4(req, res) {
  var placeRequests;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_PlaceRequest["default"].getAllPlaceRequests());

        case 2:
          placeRequests = _context4.sent;
          return _context4.abrupt("return", res.status(_status_codes.OK).json(placeRequests));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // Update a place request status

exports.getAllPlaceRequests = getAllPlaceRequests;
var updatePlaceRequestStatus = (0, _async_wrapper["default"])(function _callee5(req, res) {
  var id, status, placeRequest;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          status = req.body.status;

          if (status) {
            _context5.next = 4;
            break;
          }

          return _context5.abrupt("return", res.status(_status_codes.BAD_REQUEST).json({
            error: 'Status is required'
          }));

        case 4:
          _context5.next = 6;
          return regeneratorRuntime.awrap(_PlaceRequest["default"].updatePlaceRequestStatus({
            place_request_id: id,
            status: status
          }));

        case 6:
          placeRequest = _context5.sent;

          if (placeRequest) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt("return", res.status(_status_codes.NOT_FOUND).json({
            error: 'Place request not found'
          }));

        case 9:
          return _context5.abrupt("return", res.status(_status_codes.OK).json(placeRequest));

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // Approve a place request

exports.updatePlaceRequestStatus = updatePlaceRequestStatus;
var approvePlaceRequest = (0, _async_wrapper["default"])(function _callee6(req, res) {
  var place_request_id, approval;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          place_request_id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_PlaceRequest["default"].approvePlaceRequest({
            place_request_id: place_request_id
          }));

        case 3:
          approval = _context6.sent;
          return _context6.abrupt("return", res.status(_status_codes.CREATED).json(approval));

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
}); // Delete a place request

exports.approvePlaceRequest = approvePlaceRequest;
var deletePlaceRequest = (0, _async_wrapper["default"])(function _callee7(req, res) {
  var place_request_id, deletedRequest;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          place_request_id = req.params.id;
          _context7.next = 3;
          return regeneratorRuntime.awrap(_PlaceRequest["default"].deletePlaceRequest({
            place_request_id: place_request_id
          }));

        case 3:
          deletedRequest = _context7.sent;

          if (deletedRequest) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", res.status(_status_codes.NOT_FOUND).json({
            error: 'Place request not found'
          }));

        case 6:
          return _context7.abrupt("return", res.status(_status_codes.OK).json(deletedRequest));

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.deletePlaceRequest = deletePlaceRequest;