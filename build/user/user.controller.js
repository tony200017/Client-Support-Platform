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
exports.changePassword = exports.login = exports.signUp = void 0;
const user_service_js_1 = require("./user.service.js");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_service_js_1.addUser)(req.body);
        res.status(201).json({
            message: 'User created successfully!'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authObj = yield (0, user_service_js_1.loginService)(req.body);
        res.status(200).json(authObj);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_service_js_1.resetPasswordById)(req.userId, req.body.password);
        res.status(200).json({
            message: "password changed"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.changePassword = changePassword;
