import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

// JWT
const jwt = require('jsonwebtoken');
import JwtSecret from '../middleware/secretKey';

interface IAuth{
    loggedUser?: any,
    body?: any,
}

const userController = {
    // Create
    create: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const {name, email, password} = req.body;

            const findEmail = await prisma.user.findUnique({
                where: {email: email}
            });

            if(findEmail){
                res.status(200).json({message: 'Usuário cadastrado', status: false});
            }

            else{
                await prisma.user.create({
                    data: {name, email, password},
                });
                res.status(200).json({message: "Usuário criado com sucesso", status: true});
            }
        } catch(error) {
            next(error)
        }
    },

    getAll: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const allUsers = await prisma.user.findMany();
            const arr = ({users: allUsers});
            res.status(200).json(arr);
        } catch(error){
            next(error);
        }
    },

    getOne: async(req: IAuth, res: Response, next: NextFunction) => {
        try{
            const {email, password} = req.body;

            const user = await prisma.user.findFirst({
                where: { email: email, password: password },
            });

            if(!user){
                res.status(200).json({message: 'Usuário não encontrado', status: false});
            }
            else{
                jwt.sign({id: user.id, email: user.email}, JwtSecret, {expiresIn: '24h'}, (err: any, token: string) => {
                    if(err){
                        res.status(400).json({message: 'Falha na autenticação', status: false});
                    }
                    else{
                        res.status(200).json({message: 'Usuário logado com sucesso', status: true, user: {token: token, usuario_id: user.id, email: user.email}})
                    }
                });
            }
        } catch(error){
            next(error);
        }
    }
}

module.exports = userController;