import { createError } from '../utils/error.js';
import User from '../models/User.js';

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, //mongoDB $set overwrites the existing value of that field with the value of the specified expression. $set appends new fields to existing documents. You can include one or more $set stages in an aggregation operation.
     {new:true}) //{new:true} luego de que se actualiza esto retorna la versión actualizada
    res.status(200).json(updatedUser)
  } catch (err) {
    next();
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("El User ha sido eliminado")
  } catch (err) {
    next();
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
     res.status(200).json(hotel);
  } catch (err) {
    next();
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next();
  }
}