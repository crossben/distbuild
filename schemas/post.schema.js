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
exports.Post = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ImageSchema = new mongoose_1.Schema({
    url: { type: String, required: [true, "le url est obligatoire"] },
    alt: { type: String, required: [true, "le alt est obligatoire"] }
});
const ReviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: [true, "le user est obligatoire"] },
    rating: { type: Number, required: [true, "le rating est obligatoire"], min: 1, max: 5 },
    comment: { type: String, required: [true, "le commentaire est obligatoire"] },
    createdAt: { type: Date, default: Date.now }
});
const LikeSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: [true, "le user est obligatoire"] },
    liketype: { type: 'string', required: [true, "le type de like est obligatoire"], default: 'like' }
});
const PostSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "le titre est obligatoire"], trim: true },
    description: { type: String, required: [true, "la description est obligatoire"] },
    price: { type: Number, required: [true, "le prix est obligatoire"], min: 0 },
    discountPercentage: { type: Number, min: 0, max: 100, default: 0 },
    category: [{ type: String, required: false, default: 'agriculture' }],
    subcategory: { type: String, required: false, default: 'fruit' },
    brand: { type: String, required: false, default: 'agriculture' },
    quantity: { type: Number, required: [true, "la quentite est obligatoire"], min: 0 },
    creator: { type: String, required: [true, "le creator est obligatoire"] },
    ownerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: [true, "le id du creator est obligatoire"] },
    ownerRole: { type: String, required: [true, "le role du creator est obligatoire"] },
    images: [ImageSchema],
    likes: [LikeSchema],
    reviews: [ReviewSchema],
    tags: [{ type: String }],
    weight: { type: String, required: [true, "le poids est obligatoire"], default: '0' },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});
// Virtual for calculating the current price (with discount applied)
PostSchema.virtual('currentPrice').get(function () {
    return this.price * (1 - this.discountPercentage / 100);
});
// Method to add a review and update the average rating
PostSchema.methods.addReview = function (userId, rating, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        this.reviews.push({ user: userId, rating, comment, createdAt: new Date() });
        yield this.save();
    });
};
// Index for faster querying
PostSchema.index({ title: 'text', description: 'text', tags: 'text' });
exports.Post = (0, mongoose_1.model)('Post', PostSchema);
// console.log('Post model created successfully');
//# sourceMappingURL=post.schema.js.map