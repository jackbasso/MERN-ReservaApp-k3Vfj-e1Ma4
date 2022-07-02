import express from 'express';
import { nextTick } from 'process';
import { verifyToken } from '../utils/verifyToken.js';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';

const router = express.Router();


router.get('/checkAuthentication', verifyToken, (req, res, next) => {
  res.send("hola estás autenticado!")
});
//UPDATE
router.put('/:id', updateUser)
//DELETE
router.delete('/:id', deleteUser)
//GET
router.get('/:id', getUser);
//GET ALL
router.get('/', getUsers);

export default router;
