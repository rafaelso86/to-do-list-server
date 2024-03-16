"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const secretKey_1 = __importDefault(require("./secretKey"));
function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    if (authToken !== undefined) {
        const bearer = authToken.split(' ');
        const token = bearer[1];
        jwt.verify(token, secretKey_1.default, (err, data) => {
            if (err) {
                res.status(401).json({ message: 'Token inválido.' });
            }
            // else{
            //     req.token = token;
            //     req.loggedUser = {id: data.id, email: data.email};  
            //     // next();
            // }
        });
    }
    else {
        res.status(401).json({ message: 'Token inválido.' });
    }
    next();
}
exports.default = auth;
