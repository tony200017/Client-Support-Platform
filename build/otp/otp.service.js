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
exports.passwordReset = exports.otpByEmail = exports.verifyOtp = exports.resendOtp = exports.createOtp = exports.generateVerificationToken = exports.generateOTP = void 0;
const otp_model_1 = __importDefault(require("./otp.model"));
const crypto_1 = __importDefault(require("crypto"));
const user_service_1 = require("../user/user.service");
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const HTTPError_1 = require("../errors/HTTPError");
const otp_errorMessages_1 = require("./otp.errorMessages");
const service_1 = require("../passwordreset/service");
const generateOTP = () => __awaiter(void 0, void 0, void 0, function* () {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
});
exports.generateOTP = generateOTP;
// Function to generate a verification token
const generateVerificationToken = () => __awaiter(void 0, void 0, void 0, function* () {
    let token = crypto_1.default.randomBytes(20).toString('hex');
    return token;
});
exports.generateVerificationToken = generateVerificationToken;
//
function sendEmailWithOTPAndPhrase(email, otp, phrase) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a nodemailer transporter
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail', // You can use other services or transport options as well
            host: 'smpt.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: config_1.emailUser, // Your email address
                pass: config_1.emailPassword // Your email password
            }
        });
        // Email content
        const mailOptions = {
            from: config_1.emailUser,
            to: email,
            subject: 'Forgot password otp',
            html: `<p>Your OTP is: <h1>${otp}</h1></p>
               <p> ${phrase}</p>`
        };
        // Send email
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    });
}
//
// Function to create OTP and save it to the database
const createOtp = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // const otpRecord = await otpByEmail(email);
    // if(otpRecord){
    //     const error = new HTTPError(errorMessages.otpAlreadyexist.message,errorMessages.otpAlreadyexist.statusCode);
    //     throw error;
    // }
    const user = yield (0, user_service_1.userByEmail)(email);
    const otp = yield (0, exports.generateOTP)(); // Generate OTP
    const otpExpires = new Date(Date.now() + 10 * 60000); // Set expiration time (10 minutes from now)
    const verificationToken = yield (0, exports.generateVerificationToken)();
    // Save OTP to the database
    const newOtp = new otp_model_1.default({
        otp: otp,
        email: email,
        otpExpires: otpExpires,
        retrycount: 0, // Assuming initial retry count is 0
        userId: user._id,
        verificationToken: verificationToken // You can add logic to generate a verification token if needed
    });
    yield newOtp.save();
    //send email
    yield sendEmailWithOTPAndPhrase(email, otp, "if you want to reset you password");
    return verificationToken; // Return the generated OTP
});
exports.createOtp = createOtp;
const resendOtp = (Token) => __awaiter(void 0, void 0, void 0, function* () {
    const otpRecord = yield otp_model_1.default.findOne({ verificationToken: Token });
    if (!otpRecord) {
        const error = new HTTPError_1.HTTPError(otp_errorMessages_1.errorMessages.notfound.message, otp_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    if (otpRecord.otpExpires < new Date()) {
        const error = new HTTPError_1.HTTPError(otp_errorMessages_1.errorMessages.expireOtp.message, otp_errorMessages_1.errorMessages.expireOtp.statusCode);
        throw error;
    }
    //send email
    yield sendEmailWithOTPAndPhrase(otpRecord.email, otpRecord.otp, "if you want to reset you password");
    return otpRecord.verificationToken; // Return the generated OTP
});
exports.resendOtp = resendOtp;
const verifyOtp = (Token, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const otpRecord = yield otp_model_1.default.findOne({ verificationToken: Token });
    if (!otpRecord) {
        const error = new HTTPError_1.HTTPError(otp_errorMessages_1.errorMessages.notfound.message, otp_errorMessages_1.errorMessages.notfound.statusCode);
        throw error;
    }
    if (otpRecord.otpExpires < new Date()) {
        const error = new HTTPError_1.HTTPError(otp_errorMessages_1.errorMessages.expireOtp.message, otp_errorMessages_1.errorMessages.expireOtp.statusCode);
        throw error;
    }
    if (otp != otpRecord.otp) {
        otpRecord.retrycount++;
        otpRecord.save();
        const error = new HTTPError_1.HTTPError(otp_errorMessages_1.errorMessages.wrongOtp.message, otp_errorMessages_1.errorMessages.wrongOtp.statusCode);
        throw error;
    }
    const token = yield (0, exports.generateVerificationToken)();
    const expireDate = new Date(Date.now() + 10 * 60000); // Set expiration time (10 minutes from now)
    const passwordReset = { resetToken: token, resetExpires: expireDate, userId: otpRecord.userId };
    yield (0, service_1.createPasswordReset)(passwordReset);
    return token; // Return the generated Token
});
exports.verifyOtp = verifyOtp;
const otpByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = yield otp_model_1.default.findOne({ email: email });
    return otp;
});
exports.otpByEmail = otpByEmail;
const passwordReset = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield (0, service_1.findPasswordResetByToken)(token);
    yield (0, user_service_1.resetPasswordById)(userId.toString(), password);
});
exports.passwordReset = passwordReset;
