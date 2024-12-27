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
exports.removeFromGroup = exports.addToGroup = exports.renameGroup = exports.creatGroup = exports.fetchAllChats = exports.accessChats = void 0;
const chat_schema_1 = require("../schemas/chat.schema");
const user_schema_1 = require("../schemas/user.schema");
const status_1 = require("../utils/status");
const accessChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId)
        res.send({ message: "Provide User's Id" });
    let chatExists = yield chat_schema_1.Chat.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: userId } } },
            { users: { $elemMatch: { $eq: req.rootUserId } } },
        ],
    })
        .populate('users', '-password')
        .populate('latestMessage');
    chatExists = yield chat_schema_1.Chat.populate(chatExists, {
        path: 'latestMessage.sender',
        select: 'name email profilePic',
    });
    if (chatExists.length > 0) {
        res.status(status_1.Status.Ok).send(chatExists[0]);
    }
    else {
        const data = {
            chatName: 'sender',
            users: [userId, req.rootUserId],
            isGroup: false,
        };
        try {
            const newChat = yield chat_schema_1.Chat.create(data);
            const chat = yield chat_schema_1.Chat.find({ _id: newChat._id }).populate('users', '-password');
            res.status(status_1.Status.Ok).json(chat);
        }
        catch (error) {
            res.status(status_1.Status.InternalServerError).send(error);
        }
    }
});
exports.accessChats = accessChats;
const fetchAllChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield chat_schema_1.Chat.find({
            users: { $elemMatch: { $eq: req.rootUserId } },
        })
            .populate('users')
            .populate('latestMessage')
            .populate('groupAdmin')
            .sort({ updatedAt: -1 });
        const finalChats = yield user_schema_1.User.populate(chats, {
            path: 'latestMessage.sender',
            select: 'name email profilePic',
        });
        res.status(status_1.Status.Ok).json(finalChats);
    }
    catch (error) {
        res.status(status_1.Status.InternalServerError).send(error);
        console.log(error);
    }
});
exports.fetchAllChats = fetchAllChats;
const creatGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatName, users } = req.body;
    if (!chatName || !users) {
        res.status(status_1.Status.NoContent).json({ message: 'Please fill the fields' });
    }
    const parsedUsers = JSON.parse(users);
    if (parsedUsers.length < 2)
        res.send(status_1.Status.NoContent).send('Group should contain more than 2 users');
    parsedUsers.push(req.rootUser);
    try {
        const chat = yield chat_schema_1.Chat.create({
            chatName: chatName,
            users: parsedUsers,
            isGroup: true,
            groupAdmin: req.rootUserId,
        });
        const createdChat = yield chat_schema_1.Chat.findOne({ _id: chat._id })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');
        // res.status(Status.Ok).json(createdChat);
        res.send(createdChat);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(status_1.Status.InternalServerError);
    }
});
exports.creatGroup = creatGroup;
const renameGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, chatName } = req.body;
    if (!chatId || !chatName)
        res.status(status_1.Status.NoContent).send('Provide Chat id and Chat name');
    try {
        const chat = yield chat_schema_1.Chat.findByIdAndUpdate(chatId, {
            $set: { chatName },
        })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');
        if (!chat)
            res.status(status_1.Status.NotFound);
        res.status(status_1.Status.Ok).send(chat);
    }
    catch (error) {
        res.status(status_1.Status.InternalServerError).send(error);
        console.log(error);
    }
});
exports.renameGroup = renameGroup;
const addToGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, chatId } = req.body;
    const existing = yield chat_schema_1.Chat.findOne({ _id: chatId });
    if (!(existing === null || existing === void 0 ? void 0 : existing.users.includes(userId))) {
        const chat = yield chat_schema_1.Chat.findByIdAndUpdate(chatId, {
            $push: { users: userId },
        })
            .populate('groupAdmin', '-password')
            .populate('users', '-password');
        if (!chat)
            res.status(status_1.Status.NotFound);
        res.status(status_1.Status.Ok).send(chat);
    }
    else {
        res.status(status_1.Status.ConflictCode).send('user already exists');
    }
});
exports.addToGroup = addToGroup;
const removeFromGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, chatId } = req.body;
    const existing = yield chat_schema_1.Chat.findOne({ _id: chatId });
    if (existing === null || existing === void 0 ? void 0 : existing.users.includes(userId)) {
        chat_schema_1.Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId },
        })
            .populate('groupAdmin', '-password')
            .populate('users', '-password')
            .then((e) => res.status(status_1.Status.Ok).send(e))
            .catch(() => res.status(status_1.Status.NotFound));
    }
    else {
        res.status(status_1.Status.ConflictCode).send('user doesnt exists');
    }
});
exports.removeFromGroup = removeFromGroup;
// export const removeContact = async (req: Request, res: Response) => { };
//# sourceMappingURL=chat.controller.js.map