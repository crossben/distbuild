"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const authGuard_midlleware_1 = require("../middlewares/authGuard.midlleware");
const router = (0, express_1.Router)();
router.get('/', post_controller_1.GetPost);
router.get('/:id', post_controller_1.GetPostById);
router.post('/create', post_controller_1.createPostController);
router.put('/:id', authGuard_midlleware_1.guard, post_controller_1.UpdatePost);
router.delete('/:id', authGuard_midlleware_1.guard, post_controller_1.DeletePost);
exports.default = router;
//# sourceMappingURL=post.route.js.map