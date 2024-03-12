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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordById = exports.userById = exports.userByEmail = exports.loginService = exports.addUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("./user.model"));
const HTTPError_1 = require("../errors/HTTPError");
const user_errorMessages_1 = require("./user.errorMessages");
const config_1 = require("../config");
const addUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield user_model_1.default.findOne({ email: userData.email });
    if (checkUser) {
        const error = new HTTPError_1.HTTPError(user_errorMessages_1.errorMessages.userAlreadyexist.message, user_errorMessages_1.errorMessages.userAlreadyexist.statusCode);
        throw error;
    }
    userData.password = yield bcryptjs_1.default.hash(userData.password, 12);
    const user = new user_model_1.default(userData);
    yield user.save();
    console.log('user added successfully');
    return user._id;
});
exports.addUser = addUser;
const loginService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    let email = loginData.email;
    let password = loginData.password;
    const user = yield user_model_1.default.findOne({ email: email });
    if (!user) {
        const error = new HTTPError_1.HTTPError(user_errorMessages_1.errorMessages.notfound.message, user_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    const result = yield bcryptjs_1.default.compare(password, user.password);
    if (!result) {
        const error = new HTTPError_1.HTTPError(user_errorMessages_1.errorMessages.wrongPassword.message, user_errorMessages_1.errorMessages.wrongPassword.statusCode);
        throw error;
    }
    const token = jsonwebtoken_1.default.sign({ email: user.email, userId: user._id.toString() }, config_1.jwtRandomString, { expiresIn: '1h' });
    return { token, userId: user._id.toString() };
});
exports.loginService = loginService;
const userByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: email });
    if (!user) {
        const error = new HTTPError_1.HTTPError(user_errorMessages_1.errorMessages.notfound.message, user_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    return user;
});
exports.userByEmail = userByEmail;
const userById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        const error = new HTTPError_1.HTTPError(user_errorMessages_1.errorMessages.notfound.message, user_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    return user;
});
exports.userById = userById;
const resetPasswordById = (Id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(Id);
    if (!user) {
        const error = new HTTPError_1.HTTPError(user_errorMessages_1.errorMessages.notfound.message, user_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    user.password = yield bcryptjs_1.default.hash(password, 12);
    ;
    yield user.save();
});
exports.resetPasswordById = resetPasswordById;
