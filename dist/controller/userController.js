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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// JWT
const jwt = require('jsonwebtoken');
const secretKey_1 = __importDefault(require("../middleware/secretKey"));
const userController = {
    // Create
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const findEmail = yield prisma.user.findUnique({
                where: { email: email }
            });
            if (findEmail) {
                res.status(200).json({ message: 'Usuário cadastrado', status: false });
            }
            else {
                yield prisma.user.create({
                    data: { name, email, password },
                });
                res.status(200).json({ message: "Usuário criado com sucesso", status: true });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield prisma.user.findMany();
            const arr = ({ users: allUsers });
            res.status(200).json(arr);
        }
        catch (error) {
            next(error);
        }
    }),
    getOne: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield prisma.user.findFirst({
                where: { email: email, password: password },
            });
            if (!user) {
                res.status(200).json({ message: 'Usuário não encontrado', status: false });
            }
            else {
                jwt.sign({ id: user.id, email: user.email }, secretKey_1.default, { expiresIn: '24h' }, (err, token) => {
                    if (err) {
                        res.status(400).json({ message: 'Falha na autenticação', status: false });
                    }
                    else {
                        res.status(200).json({ message: 'Usuário logado com sucesso', status: true, user: { token: token, usuario_id: user.id, email: user.email } });
                    }
                });
            }
        }
        catch (error) {
            next(error);
        }
    })
};
module.exports = userController;
