"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.Schema({
    photo: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/9790/9790561.png',
    },
    chatName: {
        type: String,
    },
    isGroup: {
        type: Boolean,
        default: false,
    },
    users: [
        {
            type: mongoose_2.default.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    latestMessage: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Message',
    },
    groupAdmin: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});
exports.Chat = (0, mongoose_1.model)('Chat', chatSchema);
//# sourceMappingURL=chat.schema.js.map