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
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const post_schema_1 = require("../schemas/post.schema");
;
const createPost = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Création d'un nouveau post avec les données reçues
        const newPost = new post_schema_1.Post({
            title: params.title,
            description: params.description,
            price: params.price,
            discountPercentage: params.discountPercentage || 0,
            category: params.category,
            subcategory: params.subcategory,
            brand: params.brand,
            quantity: params.quantity,
            owner: params.creator, // Assurez-vous que ce champ est bien défini et correspond à l'utilisateur
            ownerId: params.ownerId,
            ownerRole: params.ownerRole,
            images: params.images || [],
            tags: params.tags || [],
            weight: params.weight || 0,
        });
        // Sauvegarde du post dans la base de données
        const savedPost = yield newPost.save();
        // Retourner le post sauvegardé
        return savedPost;
    }
    catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Error creating post.");
    }
});
exports.createPost = createPost;
// Example usage:
// const newPostData: CreatePostParams = {
//   title: "Smartphone X",
//   description: "Latest model with advanced features",
//   price: 999.99,
//   category: ["Electronics", "Smartphones"],
//   brand: "TechCo",
//   quantity: 100,
//   owner: "user123",
//   images: [
//     { url: "https://example.com/image1.jpg", alt: "Smartphone X front view" },
//     { url: "https://example.com/image2.jpg", alt: "Smartphone X back view" }
//   ],
//   sku: "TECH-SP-X-001"
// };
//
// try {
//   const createdPost = await createPost(newPostData);
//   console.log("Post created:", createdPost);
// } catch (error) {
//   console.error("Failed to create post:", error);
// }
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_schema_1.Post.find().exec();
        if (!posts || posts.length === 0) {
            throw new Error("No posts found.");
        }
        return posts;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error getting posts:", error);
            throw new Error(error.message || "Error getting posts.");
        }
    }
});
exports.getPosts = getPosts;
const getPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_schema_1.Post.findById(id).exec();
        return post;
    }
    catch (error) {
        console.error("Error getting post by id:", error);
        throw new Error("Error getting post by id.");
    }
});
exports.getPostById = getPostById;
const updatePost = (id, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_schema_1.Post.findByIdAndUpdate(id, params, { new: true }).exec();
        return post;
    }
    catch (error) {
        console.error("Error updating post:", error);
        throw new Error("Error updating post.");
    }
});
exports.updatePost = updatePost;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_schema_1.Post.findByIdAndDelete(id).exec();
        return post;
    }
    catch (error) {
        console.error("Error deleting post:", error);
        throw new Error("Error deleting post.");
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=post.service.js.map