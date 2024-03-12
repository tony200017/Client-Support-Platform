"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.complaintUpdate = exports.getComplaints = exports.myComplaints = exports.complaintGet = exports.complaintDelete = exports.complaintAdd = void 0;
const complaint_service_js_1 = require("./complaint.service.js");
const complaintAdd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.createdBy = req.userId;
        yield (0, complaint_service_js_1.addComplaint)(req.body);
        res.status(201).json({
            message: 'created successfully!'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.complaintAdd = complaintAdd;
const complaintDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, complaint_service_js_1.deleteComplaint)(req.params.id, req.userId);
        res.status(200).json({
            message: "deleted successfuly"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.complaintDelete = complaintDelete;
const complaintGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complaint = yield (0, complaint_service_js_1.getComplaint)(req.params.id, req.userId);
        res.status(200).json(complaint);
    }
    catch (error) {
        next(error);
    }
});
exports.complaintGet = complaintGet;
const myComplaints = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complaints = yield (0, complaint_service_js_1.getMyComplaint)(req.userId, Number(req.query.page), Number(req.query.limit));
        res.status(200).json(complaints);
    }
    catch (error) {
        next(error);
    }
});
exports.myComplaints = myComplaints;
const getComplaints = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId ? String(req.query.userId) : undefined;
    const status = req.query.status ? String(req.query.status) : undefined;
    let query = {};
    if (userId) {
        query['createdBy'] = userId; // Ensure status is in uppercase
    }
    if (status) {
        query['status'] = status; // Ensure status is in uppercase
    }
    try {
        const complaints = yield (0, complaint_service_js_1.filterComplaints)(Number(req.query.page), Number(req.query.limit), query);
        res.status(200).json(complaints);
    }
    catch (error) {
        next(error);
    }
});
exports.getComplaints = getComplaints;
const complaintUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, complaint_service_js_1.updateComplaint)(req.params.id, req.body.status);
        res.status(200).json({
            message: "updated successfuly"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.complaintUpdate = complaintUpdate;
