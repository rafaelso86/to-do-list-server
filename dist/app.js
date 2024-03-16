"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./middleware/auth"));
const app = (0, express_1.default)();
var cors = require('cors');
const port = 3333;
// Controller
const userController = require('./controller/userController');
const listController = require('./controller/listController');
const tasksController = require('./controller/tasksController');
app.use(cors());
app.use(express_1.default.json());
// Routes
app.post('/user/create', userController.create);
app.post('/user/login', userController.getOne);
app.get('/user/all', auth_1.default, userController.getAll);
app.post('/list/create', auth_1.default, listController.create);
app.get('/list/show/:user_id', auth_1.default, listController.getAll);
app.post('/list/status-update', auth_1.default, listController.statusUpdate);
app.post('/list/delete', auth_1.default, listController.delete);
app.post('/task/create', auth_1.default, tasksController.create);
app.get('/tasks/show/:user_id/:list_id', auth_1.default, tasksController.getAll);
app.post('/tasks/check-update', auth_1.default, tasksController.checkUpdate);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
app.listen(port, () => console.log('REST API server ready at: http://localhost:' + port));
