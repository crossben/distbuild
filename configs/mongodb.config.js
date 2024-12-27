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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const Dbconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGODB_URI = process.env.MONGO_DB_URI;
    if (MONGODB_URI) {
        try {
            yield mongoose_1.default.connect(MONGODB_URI);
            console.log("MongoDB connected successfully.");
        }
        catch (error) {
            console.error("MongoDB connection failed:", error);
            process.exit(1);
        }
    }
    else {
        console.error("MONGODB_URI is undefined.");
        process.exit(1);
    }
});
exports.default = Dbconnect;
//# sourceMappingURL=mongodb.config.js.map