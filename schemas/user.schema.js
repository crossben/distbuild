"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// models/user.model.ts
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const UserSchema = new mongoose_1.Schema({
    uid: {
        type: String,
        required: [true, "le uid est obligatoire"],
        unique: true
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, "l'email est obligatoire"],
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error('Invalid email address');
            }
        }
    },
    displayName: {
        type: String,
        trim: true,
    },
    telephone: {
        type: String,
        trim: true,
    },
    motDePasse: {
        type: String,
        trim: true,
    },
    pays: {
        type: String,
        trim: true,
    },
    region: {
        type: String,
        trim: true,
    },
    quartier: {
        type: String,
        trim: true,
    },
    dateNaissance: {
        type: Date,
        trim: true,
    },
    sexe: {
        type: String,
        trim: true,
    },
    photo: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        default: 'user',
        trim: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
        trim: true,
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.schema.js.map