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
exports.DeletePost = exports.UpdatePost = exports.GetPostById = exports.GetPost = exports.createPostController = void 0;
const post_service_1 = require("../services/post.service");
const status_1 = require("../utils/status");
const createPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price, discountPercentage, category, subcategory, brand, quantity, images, tags, weight, creator, ownerId, ownerRole } = req.body;
        // const owner = req.params;  // Prendre l'ID de l'owner passé dans l'URL (comme dans le code initial)
        // Vérification des champs obligatoires
        if (!creator || !ownerId || !ownerRole) {
            res.status(status_1.Status.Unauthorized).json({ message: 'Unauthorized: User not authenticated' });
            return;
        }
        if (!title || !description || !price || !category || !quantity) {
            res.status(status_1.Status.BadRequest).json({ message: 'Missing required fields' });
            return;
        }
        // Construction de l'objet postData
        const postData = {
            title, description, price, discountPercentage, category, subcategory, brand, quantity, creator, ownerId, ownerRole, images, tags, weight,
        };
        // Appel du service pour créer un post
        const newPost = yield (0, post_service_1.createPost)(postData);
        // Réponse réussie
        res.status(status_1.Status.Created).json({
            message: 'Post created successfully',
            post: newPost
        });
    }
    catch (error) {
        console.error('Error in createPostController:', error);
        res.status(status_1.Status.InternalServerError).json({ message: 'Internal server error' });
    }
});
exports.createPostController = createPostController;
const GetPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, post_service_1.getPosts)();
        res.status(status_1.Status.Ok).json(posts);
    }
    catch (error) {
        console.error('Error in GetPost:', error);
        res.status(status_1.Status.InternalServerError).json({ message: 'Internal server error' });
    }
});
exports.GetPost = GetPost;
const GetPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(status_1.Status.BadRequest).json({ message: 'Missing required fields' });
        }
        const post = (0, post_service_1.getPostById)(id);
        res.status(status_1.Status.Ok).json(post);
    }
    catch (error) {
        console.error('Error in createPostController:', error);
        res.status(status_1.Status.InternalServerError).json({ message: 'Internal server error' });
    }
});
exports.GetPostById = GetPostById;
const UpdatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, creator, ownerId, ownerRole } = req.params;
        const { title, description, price, discountPercentage, category, subcategory, brand, quantity, images, tags, weight, } = req.body;
        if (!id || !title || !description || !price || !category || !quantity) {
            res.status(status_1.Status.BadRequest).json({ message: 'Missing required fields' });
        }
        const postData = {
            title, description, price, discountPercentage, category, subcategory, brand, quantity, images, tags, weight, creator, ownerId, ownerRole
        };
        const updatedPost = yield (0, post_service_1.createPost)(postData);
        res.status(status_1.Status.Ok).json({
            message: 'Post updated successfully',
            post: updatedPost
        });
    }
    catch (error) {
        console.error('Error in createPostController:', error);
        res.status(status_1.Status.InternalServerError).json({ message: 'Internal server error' });
    }
});
exports.UpdatePost = UpdatePost;
const DeletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(status_1.Status.BadRequest).json({ message: 'Missing required fields' });
        }
        const post = (0, post_service_1.deletePost)(id);
        res.status(status_1.Status.Ok).json(post);
    }
    catch (error) {
        console.error('Error in createPostController:', error);
        res.status(status_1.Status.InternalServerError).json({ message: 'Internal server error' });
    }
});
exports.DeletePost = DeletePost;
//# sourceMappingURL=post.controller.js.map