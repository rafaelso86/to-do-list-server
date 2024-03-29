// const jwt = require('jsonwebtoken');
// const JwtSecret = require('./secretKey.js');

import jwt from 'jsonwebtoken';
import JwtSecret from './secretKey.js';

function auth(req, res, next){
    const authToken = req.headers['authorization'];
    if(authToken !== undefined){
        const bearer = authToken.split(' ');
        const token = bearer[1];
        jwt.verify(token, JwtSecret, (err, data) => {
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
//module.exports = auth;