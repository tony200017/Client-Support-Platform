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
exports.getAllCategory = exports.getCategory = exports.getCategories = exports.deleteCategory = exports.updateCategory = exports.addCategory = void 0;
const HTTPError_1 = require("../errors/HTTPError");
const category_model_1 = require("./category.model");
const category_errorMessages_1 = require("./category.errorMessages");
// Function to add a category
const addCategory = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const category = new category_model_1.Category(categoryData);
    yield category.save();
    console.log('Category added successfully');
    return category._id;
});
exports.addCategory = addCategory;
// Function to update a category
const updateCategory = (categoryId, categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the category exists
    const existingCategory = yield category_model_1.Category.findById(categoryId);
    if (!existingCategory) {
        const error = new HTTPError_1.HTTPError(category_errorMessages_1.errorMessages.notfound.message, category_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    yield category_model_1.Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
    console.log('Category updated successfully');
});
exports.updateCategory = updateCategory;
// Function to delete a category
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield category_model_1.Category.findByIdAndDelete(categoryId);
    if (!deleted) {
        const error = new HTTPError_1.HTTPError(category_errorMessages_1.errorMessages.notfound.message, category_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    console.log('Category deleted successfully');
});
exports.deleteCategory = deleteCategory;
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.find();
});
exports.getCategories = getCategories;
//
const getCategory = (complaintId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentCategory = yield category_model_1.Category.findById(complaintId);
    if (!currentCategory) {
        const error = new HTTPError_1.HTTPError(category_errorMessages_1.errorMessages.notfound.message, category_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    return currentCategory;
});
exports.getCategory = getCategory;
// 
const getAllCategory = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = yield category_model_1.Category.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const categories = yield category_model_1.Category.find()
        .limit(limit)
        .skip(startIndex)
        .sort({ createdAt: -1 });
    const paginationInfo = {
        currentPage: page,
        totalPages: totalPages,
        totalCategories: totalCount
    };
    return { paginationInfo, categories };
});
exports.getAllCategory = getAllCategory;
