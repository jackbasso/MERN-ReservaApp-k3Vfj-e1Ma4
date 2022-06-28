import express from 'express';
import { nextTick } from 'process';
import Hotel from '../models/Hotel.js';

const router = express.Router();

//CREATE
router.post('/', async (req, res) => {
  const newHotel = new Hotel(req.body)
  try {
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  } catch (err) {
    res.status(500).json(err)
  }
})
//UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, //mongoDB $set overwrites the existing value of that field with the value of the specified expression. $set appends new fields to existing documents. You can include one or more $set stages in an aggregation operation.
     {new:true}) //{new:true} luego de que se actualiza esto retorna la versión actualizada
    res.status(200).json(updatedHotel)
  } catch (err) {
    res.status(500).json(err);
  }
})
//DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("El Hotel ha sido eliminado")
  } catch (err) {
    res.status(500).json(err);
  }
})
//GET
router.get('/:id', async (req, res) => {
  try {
    const hotel = Hotel.findById(req.params.id);
    res.status(200).json(hotel);
   } catch (err) {
    res.status(500).json(err)
  }
})
//GET ALL
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    //res.status(500).json(err)
    //middleware para manejo de errores
    next(err)
  }
})

export default router;
