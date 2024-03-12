"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validation_1 = require("express-validation");
const user_validaton_1 = require("./user.validaton");
const user_controller_1 = require("./user.controller");
const Auth_1 = __importDefault(require("../Middleware/Auth"));
const client_1 = __importDefault(require("../Middleware/client"));
const router = (0, express_1.Router)();
router.post('/signup', (0, express_validation_1.validate)(user_validaton_1.signUpuserSchema), user_controller_1.signUp);
router.post('/login', (0, express_validation_1.validate)(user_validaton_1.logInuserSchema), user_controller_1.login);
router.put('/changePassword', Auth_1.default, client_1.default, (0, express_validation_1.validate)(user_validaton_1.changePasswordSchema), user_controller_1.changePassword);
exports.default = router;
