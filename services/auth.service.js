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
exports.deleteUser = exports.getUserById = exports.updateUser = exports.getAllUsers = exports.getUserByEmail = exports.authService = void 0;
// services/auth.service.ts
const user_schema_1 = require("../schemas/user.schema");
const authService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.User.findOneAndUpdate({ uid: userData.uid }, { $set: Object.assign({}, userData) }, { new: true, upsert: true, runValidators: true });
        if (!user) {
            throw new Error('User registration failed');
        }
        return {
            message: 'Utilisateur enregistré avec succès',
            user
        };
    }
    catch (error) {
        console.error('Error during user registration:', error);
        throw new Error('User registration failed');
    }
});
exports.authService = authService;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.User.findOne({ email });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        return {
            success: true,
            message: "User fetched successfully",
            user
        };
    }
    catch (error) {
        console.error('Error fetching user by email:', error);
        return null;
    }
});
exports.getUserByEmail = getUserByEmail;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_schema_1.User.find();
        if (!users) {
            throw new Error('User registration failed');
        }
        return users;
    }
    catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
});
exports.getAllUsers = getAllUsers;
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.User.findOneAndUpdate({ _id: id }, userData, { new: true });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        return {
            success: true,
            message: "User fetched successfully",
            user
        };
    }
    catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
});
exports.updateUser = updateUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.User.findById(id);
        if (!user) {
            return { success: false, message: "User not found" };
        }
        return {
            success: true,
            message: "User fetched successfully",
            user
        };
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return { success: false, message: "Error fetching user" };
    }
});
exports.getUserById = getUserById;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_schema_1.User.findOneAndDelete({ _id: id });
        if (!user_schema_1.User) {
            return { success: false, message: "User not found" };
        }
        return { success: true, message: "User deleted successfully" };
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, message: "Error deleting user" };
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=auth.service.js.map