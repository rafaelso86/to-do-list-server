import {Request, Response, NextFunction} from 'express';
const jwt = require('jsonwebtoken');
import JwtSecret from './secretKey';

interface IAuth{
    token?: any
    loggedUser?: any
    headers?: any
}

function auth(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers['authorization'];
    if(authToken !== undefined){
        const bearer = authToken.split(' ');
        const token: any = bearer[1];
        jwt.verify(token, JwtSecret, (err: any, data: any) => {
            if(err){
                res.status(401).json({message: 'Token inválido.'})        
            }
            // else{
            //     req.token = token;
            //     req.loggedUser = {id: data.id, email: data.email};  
            //     // next();
            // }
        });
    }
    else{
        res.status(401).json({message: 'Token inválido.'})
    }
    next();
}

export default auth;