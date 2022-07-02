import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';


export const register = async (req, res, next) => {
  try {
    // encriptar password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    const newUser = new User({
       username: req.body.username,
      email: req.body.email,
      password: hash
    });
    await newUser.save()
    res.status(200).send("Usuario creado exitosamente")

  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({username:req.body.username})
    if(!user) return next(createError(404, "Usuario no encontrado!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if(!isPasswordCorrect) return next(createError(400, "Usuario o contraseña incorrecto!"))
    
    const token = jwt.sign({ id:user._id, isAdmin:user.isAdmin }, process.env.JWT) // la secretkey la generé en la terminal con => openssl rand -base64 32 y la pasé al .env

    const {password, isAdmin, ...otherDetails} = user._doc // para no mostrar el password ni el isAdmin, si solo dejo user me devuelve un objeto completo pero la info está en _doc
    res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherDetails});
  } catch (err) {
    next(err)
  }
}