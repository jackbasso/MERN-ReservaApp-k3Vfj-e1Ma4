import express from 'express';
import { nextTick } from 'process';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';

const router = express.Router();


// router.get('/checkAuthentication', verifyToken, (req, res, next) => {
//   res.send("hola estás autenticado!")
// });
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//   res.send("Hola usuario, estás logueado por lo que puedes eliminar la cuenta")
// })
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//   res.send("Hola admin, estás logueado por lo que puedes eliminar cualquier cuenta")
// })
//UPDATE
router.put('/:id', verifyUser, updateUser)
//DELETE
router.delete('/:id', verifyUser, deleteUser)
//GET
router.get('/:id', verifyUser, getUser);
//GET ALL
router.get('/', verifyAdmin, getUsers);

export default router;
