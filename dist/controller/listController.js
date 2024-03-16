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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const listController = {
    // Create
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user_id, name, status } = req.body;
            yield prisma.list.create({
                data: { user_id, name, status },
            });
            res.status(200).json({ message: "Lista criada com sucesso", status: true });
        }
        catch (error) {
            next(error);
        }
    }),
    // Read
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user_id } = req.params;
            const lists = yield prisma.list.findMany({
                where: { user_id: parseInt(user_id) },
                orderBy: { id: 'desc' }
            });
            const arr = ({ lista: lists });
            res.json(arr);
        }
        catch (error) {
            next(error);
        }
    }),
    statusUpdate: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user_id, list_id, status } = req.body;
            const lists = yield prisma.list.update({
                where: { user_id: parseInt(user_id), id: parseInt(list_id) },
                data: { status: status }
            });
            const arr = ({ lista: lists });
            res.status(200).json({ message: 'Status da lista atualizada', arr });
        }
        catch (error) {
            next(error);
        }
    }),
    // Delete
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user_id, id } = req.body;
            yield prisma.tasks.deleteMany({
                where: {
                    user_id: parseInt(user_id),
                    list_id: parseInt(id)
                }
            });
            yield prisma.list.delete({
                where: {
                    user_id: parseInt(user_id),
                    id: parseInt(id)
                }
            });
            res.status(200).json({ message: 'Lista deletada com sucesso', status: true });
        }
        catch (error) {
            next(error);
        }
    })
};
module.exports = listController;
