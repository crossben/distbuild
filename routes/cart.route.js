"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authGuard_midlleware_1 = require("../middlewares/authGuard.midlleware");
const router = (0, express_1.Router)();
router.get("/cart", authGuard_midlleware_1.guard);
router.delete("/cart/", authGuard_midlleware_1.guard);
//# sourceMappingURL=cart.route.js.map