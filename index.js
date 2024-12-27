"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const winston_1 = __importDefault(require("winston"));
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const mongodb_config_1 = __importDefault(require("./configs/mongodb.config"));
const winston_2 = require("./logs/winston");
const status_1 = require("./utils/status");
const user_controller_1 = require("./controllers/user.controller");
// import { Status } from './utils/status';
const app = (0, express_1.default)();
(0, mongodb_config_1.default)(); // Connexion à la base de données
const port = process.env.PORT;
const prefix = process.env.API_PREFIX || '/api';
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// const io = new Server(server);
const io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:5173',
    },
});
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
});
io.on('connection', (socket) => {
    socket.on('setup', (userData) => {
        socket.join(userData.id);
        socket.emit('connected');
    });
    socket.on('join room', (room) => {
        socket.join(room);
    });
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));
    socket.on('new message', (newMessageRecieve) => {
        const chat = newMessageRecieve.chatId;
        if (!chat.users)
            console.log('chats.users is not defined');
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieve.sender._id)
                return;
            socket.in(user._id).emit('message recieved', newMessageRecieve);
        });
    });
});
// Configuration du logger si l'environnement n'est pas en production
if (process.env.NODE_ENV !== 'production') {
    winston_2.logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
// Définir le moteur de vue (view engine) comme EJS
app.set('view engine', 'ejs');
// Spécifiez le répertoire des vues
app.set('views', path_1.default.join(__dirname, 'views')); // Dossier "views" pour stocker les fichiers .ejs
// Middleware de sécurité et d'optimisation
app.use((0, helmet_1.default)()); // Ajoute des headers de sécurité HTTP
app.disable('x-powered-by'); // Désactive l'en-tête X-Powered-By pour des raisons de sécurité
app.use((0, compression_1.default)()); // Active la compression des réponses HTTP
// Middleware pour la gestion des CORS
app.use((0, cors_1.default)({ origin: "*", methods: "GET,PUT,POST,DELETE" }));
// Middleware pour analyser les corps de requête JSON et les URL encodées
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Middleware pour servir les fichiers statiques
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Middleware de gestion des erreurs globales
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err); // Si les en-têtes sont déjà envoyés, on passe à un autre middleware d'erreur
    }
    const error = `${req.method} ${req.url} - ${err.message}`;
    winston_2.logger.error(error);
    res.status(status_1.Status.InternalServerError).send('An error occurred!');
    next();
});
// // Route de base pour afficher le fichier HTML (via EJS)
// app.get('/', (req: Request, res: Response) => {
//     res.render('index');  // Utilise "index.ejs" pour le rendu de la page
// });
// app.get('/', (req, res) => {
//     const presentationData = {
//         introduction: "Je suis développeur web passionné par la création d'applications modernes et performantes.",
//         points: [
//             "Création de sites web responsives",
//             "Développement d'applications mobiles",
//             "Gestion de base de données",
//             "Optimisation des performances web"
//         ],
//         contact: {
//             email: "contact@monemail.com",
//             phone: "+1234567890"
//         }
//     };
//     res.render('index', presentationData);
// });
// Définition des routes principales
app.use(`${prefix}/authentification`, user_route_1.default);
app.use(`${prefix}/posts`, post_route_1.default);
function getRoutes(app) {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            const methods = Object.keys(middleware.route.methods);
            methods.forEach(method => {
                var _a;
                routes.push({
                    path: ((_a = middleware === null || middleware === void 0 ? void 0 : middleware.route) === null || _a === void 0 ? void 0 : _a.path) || '',
                    method: method.toUpperCase(),
                });
            });
        }
    });
    return routes;
}
app.get('/', (req, res) => {
    const routes = getRoutes(app);
    res.render('index', { routes });
});
//user routes 
app.get('/users', user_controller_1.GetAllUsers);
app.get('/email/:email', user_controller_1.GetUserByMail);
app.get('/user/:id', user_controller_1.GetUserById);
app.post('/auth', user_controller_1.authController);
app.put('/update/:id', user_controller_1.UpdateUser);
app.delete('/delete:id', user_controller_1.DeleteUser);
//# sourceMappingURL=index.js.map