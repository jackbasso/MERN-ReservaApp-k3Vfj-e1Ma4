import express from 'express';

const router = express.Router()

router.get('/', (req, res) => {
  res.send("Hola, este es un auth endpoint")
})

router.get('/register', (req, res) => {
  res.send("Este es el auth endpoint para registrarse")
})

export default router;