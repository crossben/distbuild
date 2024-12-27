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
exports.guard = void 0;
const guard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Récupérer le token depuis le header Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        // const jwtSecret = process.env.JWT_SECRET;
        // if (!jwtSecret) {
        //     throw new Error('JWT_SECRET is not defined');
        // }
        // // Vérification du token JWT
        // const decoded = verify(token, jwtSecret);
        // req.user = decoded; // Ajouter les informations de l'utilisateur au champ req.user
        return next(); // Passer au middleware suivant
    }
    catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
});
exports.guard = guard;
//# sourceMappingURL=authGuard.midlleware.js.map