import jwt from 'jsonwebtoken';
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
  if(!token) {
    return next(createError(401, "No está autenticado!"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token no válido!"));
    req.user = user;
    next(); // siguiente middleware
  });
};
//1:05