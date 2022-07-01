import express from 'express';
import { nextTick } from 'process';
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel.js';


const router = express.Router();

//CREATE
router.post('/', createHotel); // ver controller folder hotel.js
//UPDATE
router.put('/:id', updateHotel)
//DELETE
router.delete('/:id', deleteHotel)
//GET
router.get('/:id', getHotel);
//GET ALL
router.get('/', getHotels);

export default router;
