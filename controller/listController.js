//import { PrismaClient } from '@prisma/client'
//const prisma = new PrismaClient();

const prisma = require('@prisma/client');

const listController = {
    // Create
    create: async(req, res, next) => {
        try {
            const {user_id, name, status} = req.body;

            await prisma.list.create({
                data: {user_id, name, status},
            });
            res.status(200).json({message: "Lista criada com sucesso", status: true});
        } catch(error) {
            next(error)
        }
    },

    // Read
    getAll: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const lists = await prisma.list.findMany({
                where: {user_id: parseInt(user_id)},
                orderBy: {id: 'desc'}
            });
            const arr = ({lista: lists})
            res.json(arr);
        } catch (error) {
            next(error);
        }
    },

    statusUpdate: async(req, res, next) => {
        try{
            const { user_id, list_id, status } = req.body;
            const lists = await prisma.list.update({
                where: {user_id: parseInt(user_id), id: parseInt(list_id)},
                data: {status: status}
            });
            const arr = ({lista: lists})
            res.status(200).json({message: 'Status da lista atualizada', arr});
        } catch(error) {
            next(error);
        }
    },

    // Delete
    delete: async (req, res, next) => {
        try{
            const {user_id, id} = req.body;      
            
            await prisma.tasks.deleteMany({
                where: {
                    user_id: parseInt(user_id),
                    list_id: parseInt(id)
                }
            })

            await prisma.list.delete({
                where: {
                    user_id: parseInt(user_id),
                    id: parseInt(id)
                }
            })
            res.status(200).json({message: 'Lista deletada com sucesso', status: true});
        } catch(error) {
            next(error);
        }
    }
};

module.exports = listController;