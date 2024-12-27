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
exports.getMessages = exports.sendMessage = void 0;
const message_schema_1 = require("../schemas/message.schema");
const chat_schema_1 = require("../schemas/chat.schema");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, message } = req.body;
    try {
        let msg = yield message_schema_1.Message.create({ sender: req.rootUserId, message, chatId });
        msg = yield (yield msg.populate('sender', 'name profilePic email')).populate({
            path: 'chatId',
            select: 'chatName isGroup users',
            model: 'Chat',
            populate: {
                path: 'users',
                select: 'name email profilePic',
                model: 'User',
            },
        });
        yield chat_schema_1.Chat.findByIdAndUpdate(chatId, {
            latestMessage: msg,
        });
        res.status(200).send(msg);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.sendMessage = sendMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    try {
        const messages = yield message_schema_1.Message.find({ chatId })
            .populate({
            path: 'sender',
            model: 'User',
            select: 'name profilePic email',
        })
            .populate({
            path: 'chatId',
            model: 'Chat',
        });
        res.status(200).json(messages);
    }
    catch (error) {
        res.sendStatus(500).json({ error: error });
        console.log(error);
    }
});
exports.getMessages = getMessages;
//# sourceMappingURL=message.controller.js.map