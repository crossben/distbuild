"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get('/users', user_controller_1.GetAllUsers);
router.get('/email/:email', user_controller_1.GetUserByMail);
router.get('/user/:id', user_controller_1.GetUserById);
router.post('/auth', user_controller_1.authController);
router.put('/update/:id', user_controller_1.UpdateUser);
router.delete('/delete:id', user_controller_1.DeleteUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map