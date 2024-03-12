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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const user_routes_1 = __importDefault(require("./user/user.routes"));
const opt_routes_1 = __importDefault(require("./otp/opt.routes"));
const errorMiddleware_1 = __importDefault(require("./Middleware/errorMiddleware"));
const category_routes_1 = __importDefault(require("./category/category.routes"));
const complaint_routes_1 = __importDefault(require("./complaint/complaint.routes"));
const socket_1 = require("./socket");
//
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)(config_1.mongodbConnection);
            console.log('Connected Successfully');
        }
        catch (err) {
            console.error(err);
        }
    });
}
connectToDatabase();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/users', user_routes_1.default);
app.use('/otp', opt_routes_1.default);
app.use('/category', category_routes_1.default);
app.use('/complaint', complaint_routes_1.default);
app.use(errorMiddleware_1.default);
const server = app.listen(3000, () => {
    console.log("server started");
    const io = (0, socket_1.init)(server);
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('join', room => {
            console.log("client joined room ", room);
            socket.join(room);
        });
    });
});
