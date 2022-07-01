import express from 'express';
import { register } from "../controllers/auth.js"

const router = express.Router()

router.get('/', (req, res) => {
  res.send("Hola, este es un auth endpoint")
})

router.post('/register', register);

export default router;