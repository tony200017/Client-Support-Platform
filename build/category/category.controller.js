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
exports.categories = exports.categoryGet = exports.allCategories = exports.categoryDelete = exports.categoryUpdate = exports.categoryAdd = void 0;
const category_service_js_1 = require("./category.service.js");
const categoryAdd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, category_service_js_1.addCategory)(req.body);
        res.status(201).json({
            message: 'created successfully!'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.categoryAdd = categoryAdd;
const categoryUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, category_service_js_1.updateCategory)(req.params.id, req.body);
        res.status(200).json({
            message: "updated successfuly"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.categoryUpdate = categoryUpdate;
const categoryDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, category_service_js_1.deleteCategory)(req.params.id);
        res.status(200).json({
            message: "deleted successfuly"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.categoryDelete = categoryDelete;
const allCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, category_service_js_1.getCategories)();
        res.status(200).json(categories);
    }
    catch (error) {
        next(error);
    }
});
exports.allCategories = allCategories;
const categoryGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, category_service_js_1.getCategory)(req.params.id);
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.categoryGet = categoryGet;
const categories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complaints = yield (0, category_service_js_1.getAllCategory)(Number(req.query.page), Number(req.query.limit));
        res.status(200).json(complaints);
    }
    catch (error) {
        next(error);
    }
});
exports.categories = categories;
