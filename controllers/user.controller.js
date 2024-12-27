"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.GetUserByMail = exports.GetAllUsers = exports.DeleteUser = exports.UpdateUser = exports.GetUserById = exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
const userService = __importStar(require("../services/auth.service"));
const status_1 = require("../utils/status");
const authController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        // Vérification des champs obligatoires
        if (!userData.uid || !userData.email) {
            res.status(status_1.Status.BadRequest).json({
                message: 'Les champs uid, email, et motDePasse sont obligatoires',
            });
        }
        // Création de l'utilisateur
        const newUser = yield (0, auth_service_1.authService)(userData);
        res.status(status_1.Status.Created).json({
            message: 'Utilisateur enregistré avec succès',
            user: newUser,
        });
    }
    catch (error) {
        console.error('Erreur Mongoose:', error);
        res.status(status_1.Status.InternalServerError).json({
            message: "Erreur lors de l'enregistrement de l'utilisateur",
            error: error instanceof Error ? error.message : 'Erreur inconnue',
        });
    }
});
exports.authController = authController;
const GetUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.getUserById(id);
        if (!user) {
            res.status(status_1.Status.NotFound).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(status_1.Status.InternalServerError).json({ success: false, message: "An error occurred fetching the user" });
    }
});
exports.GetUserById = GetUserById;
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userData = req.body;
        const updatedUser = yield userService.updateUser(id, userData);
        if (!updatedUser) {
            res.status(status_1.Status.NotFound).json({ success: false, message: "User not found" });
        }
        res.status(status_1.Status.Ok).json({ success: true, message: "User updated successfully", user: updatedUser });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(status_1.Status.InternalServerError).json({ success: false, message: "An error occurred updating the user" });
    }
});
exports.UpdateUser = UpdateUser;
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield userService.deleteUser(id);
        if (!result) {
            res.status(status_1.Status.NotFound).json({ success: false, message: "User not found" });
        }
        res.status(status_1.Status.Ok).json({ success: true, message: "User deleted successfully" });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(status_1.Status.InternalServerError).json({ success: false, message: "An error occurred deleting the user" });
    }
});
exports.DeleteUser = DeleteUser;
const GetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getAllUsers();
        res.status(status_1.Status.Ok).json({ success: true, message: "Users fetched successfully", users });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(status_1.Status.InternalServerError).json({ success: false, message: "An error occurred fetching the users" });
    }
});
exports.GetAllUsers = GetAllUsers;
const GetUserByMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield userService.getUserByEmail(email);
        if (!user) {
            res.status(status_1.Status.NotFound).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User fetched successfully", user });
    }
    catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(status_1.Status.InternalServerError).json({ success: false, message: "An error occurred fetching the user by email" });
    }
});
exports.GetUserByMail = GetUserByMail;
//# sourceMappingURL=user.controller.js.map