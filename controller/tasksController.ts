import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const tasksController = {
    // Create
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user_id, list_id, name, check } = req.body;
            await prisma.tasks.create({
                data: { user_id, list_id, name, check },
            });
            res.status(200).json({ message: 'Tarefa adicionada com sucesso' });
        } catch (error) {
            next(error);
        }
    },

    // Read
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {user_id, list_id} = req.params;
            const tasks = await prisma.tasks.findMany({
                where: {
                    user_id: parseInt(user_id),
                    list_id: parseInt(list_id)
                },
                orderBy: {
                    id: 'desc'
                }
            });
            const arr = ({tasks: tasks})
            res.status(200).json(arr);
        } catch (error) {
            next(error);
        }
    },

    checkUpdate: async(req: Request, res: Response, next: NextFunction) => {
        try{
            const {user_id, id, check} = req.body;
            await prisma.tasks.update({
                    where: {user_id: parseInt(user_id), id: parseInt(id)},
                    data: {check: check}
            })
            res.status(200).json({message: 'Check atualizado'});

        } catch(error){
            next(error);
        }
    },

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