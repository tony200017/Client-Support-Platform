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
exports.filterComplaints = exports.updateComplaint = exports.getMyComplaint = exports.getComplaint = exports.deleteComplaint = exports.addComplaint = void 0;
const HTTPError_1 = require("../errors/HTTPError");
const complaint_model_1 = require("./complaint.model");
const complaint_errorMessages_1 = require("./complaint.errorMessages");
const socket_1 = require("../socket");
// Function to add a category
const addComplaint = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const complaint = new complaint_model_1.Complaint(categoryData);
    yield complaint.save();
    console.log('Category added successfully');
    return complaint._id;
});
exports.addComplaint = addComplaint;
// Function to delete a category
const deleteComplaint = (complaintId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield complaint_model_1.Complaint.findById(complaintId);
    if (!deleted) {
        const error = new HTTPError_1.HTTPError(complaint_errorMessages_1.errorMessages.notfound.message, complaint_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    if (!(deleted.createdBy == userId)) {
        const error = new HTTPError_1.HTTPError(complaint_errorMessages_1.errorMessages.unauthorized.message, complaint_errorMessages_1.errorMessages.unauthorized.statusCode);
        throw error;
    }
    yield deleted.deleteOne();
    console.log('Complaint deleted successfully');
});
exports.deleteComplaint = deleteComplaint;
//
//
const getComplaint = (complaintId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentComplaint = yield complaint_model_1.Complaint.findById(complaintId).populate('categories');
    if (!currentComplaint) {
        const error = new HTTPError_1.HTTPError(complaint_errorMessages_1.errorMessages.notfound.message, complaint_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    if (!(currentComplaint.createdBy == userId)) {
        const error = new HTTPError_1.HTTPError(complaint_errorMessages_1.errorMessages.unauthorized.message, complaint_errorMessages_1.errorMessages.unauthorized.statusCode);
        throw error;
    }
    return currentComplaint;
});
exports.getComplaint = getComplaint;
// 
const getMyComplaint = (userId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = yield complaint_model_1.Complaint.countDocuments({ createdBy: userId });
    const totalPages = Math.ceil(totalCount / limit);
    const complaints = yield complaint_model_1.Complaint.find({ createdBy: userId })
        .limit(limit)
        .skip(startIndex)
        .populate('categories')
        .sort({ createdAt: -1 });
    const paginationInfo = {
        currentPage: page,
        totalPages: totalPages,
        totalComplaints: totalCount
    };
    return { paginationInfo, complaints };
});
exports.getMyComplaint = getMyComplaint;
const updateComplaint = (complaintId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const currentComplaint = yield complaint_model_1.Complaint.findById(complaintId).populate('categories');
    if (!currentComplaint) {
        const error = new HTTPError_1.HTTPError(complaint_errorMessages_1.errorMessages.notfound.message, complaint_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    currentComplaint.status = status;
    yield currentComplaint.save();
    (0, socket_1.getIo)().to(currentComplaint.createdBy.toString()).emit('statusChanged', "complaint status changed to " + status);
});
exports.updateComplaint = updateComplaint;
const filterComplaints = (page, limit, query) => __awaiter(void 0, void 0, void 0, function* () {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = yield complaint_model_1.Complaint.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
    const complaints = yield complaint_model_1.Complaint.find(query)
        .limit(limit)
        .skip(startIndex)
        .populate('categories')
        .sort({ createdAt: -1 });
    const paginationInfo = {
        currentPage: page,
        totalPages: totalPages,
        totalComplaints: totalCount
    };
    return { paginationInfo, complaints };
});
exports.filterComplaints = filterComplaints;
