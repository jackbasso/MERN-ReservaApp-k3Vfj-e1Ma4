import jwt from 'jsonwebtoken';
import { createError } from './error.js'

export const verifyToken = (req, res, next) => { //1:05
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

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin){
      next()
    } else {
        return next(createError(403, "No está autorizado!"));
    }
  });
}

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.isAdmin){
      next()
    } else {
      return next(createError(403, "No está autorizado!"));
    }
  });
}