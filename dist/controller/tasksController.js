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
const tasksController = {
    // Create
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user_id, list_id, name, check } = req.body;
            yield prisma.tasks.create({
                data: { user_id, list_id, name, check },
            });
            res.status(200).json({ message: 'Tarefa adicionada com sucesso' });
        }
        catch (error) {
            next(error);
        }
    }),
    // Read
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user_id, list_id } = req.params;
            const tasks = yield prisma.tasks.findMany({
                where: {
                    user_id: parseInt(user_id),
                    list_id: parseInt(list_id)
                },
                orderBy: {
                    id: 'desc'
                }
            });
            const arr = ({ tasks: tasks });
            res.status(200).json(arr);
        }
        catch (error) {
            next(error);
        }
    }),
    checkUpdate: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user_id, id, check } = req.body;
            yield prisma.tasks.update({
                where: { user_id: parseInt(user_id), id: parseInt(id) },
                data: { check: check }
            });
            res.status(200).json({ message: 'Check atualizado' });
        }
        catch (error) {
            next(error);
        }
    }),
    // getOne: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { listId } = req.params;
    //         const tasks = await prisma.tasks.findUnique({
    //             where: { listId: parseInt(listId) },
    //         });
    //         if (!tasks) {
    //             res.status(404).json({ message: 'tasks not found' });
    //             return;
    //         }
    //         res.json(tasks);
    //     } catch (error) {
    //         next(error);
    //     }
    // },
    // // Update
    // update: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { id } = req.params;
    //         const { title, description } = req.body;
    //         const updatedtasks = await prisma.tasks.update({
    //             where: { id: parseInt(id) },
    //             data: { title, description },
    //         });
    //         res.json(updatedtasks);
    //     } catch (error) {
    //         next(error);
    //     }
    // },
    // // Delete
    // delete: async (req: Request, res: Response, next: any) => {
    //     try {
    //         const { id } = req.params;
    //         await prisma.tasks.delete({
    //             where: { id: parseInt(id) },
    //         });
    //         res.json({ message: 'Deletado com sucesso', status: true })
    //         res.status(204).end();
    //     } catch (error) {
    //         res.json({ message: 'Erro ao deletar', status: false })
    //         next(error);
    //     }
    // },
};
module.exports = tasksController;
