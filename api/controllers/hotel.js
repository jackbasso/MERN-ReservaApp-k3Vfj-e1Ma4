import { createError } from '../utils/error.js';
import Hotel from '../models/Hotel.js';

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body)
  try {
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)  
  } catch (err) {
    next(); 
  }
}

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, //mongoDB $set overwrites the existing value of that field with the value of the specified expression. $set appends new fields to existing documents. You can include one or more $set stages in an aggregation operation.
     {new:true}) //{new:true} luego de que se actualiza esto retorna la versión actualizada
    res.status(200).json(updatedHotel)
  } catch (err) {
    next();
  }
}

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("El Hotel ha sido eliminado")
  } catch (err) {
    next();
  }
}

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
     res.status(200).json(hotel);
  } catch (err) {
    next();
  }
}

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query; // filtrar x min y max
  try {
    //const hotels = await Hotel.find(req.query).limit(req.query.limit);
    const hotels = await Hotel.find({...others, cheapestPrice: { $gt: min | 1, $lt: max || 999},}).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next();
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",")
  try {
    const list = await Promise.all(cities.map(city=>{
      return Hotel.countDocuments({city:city})
    }))
    res.status(200).json(list);
  } catch (err) {
    next();
  }
}

export const countByType = async (req, res, next) => {
   try {
    const hotelCount = await Hotel.countDocuments({type:"hotel"});
    const apartmentCount = await Hotel.countDocuments({type:"apartment"});
    const resortCount = await Hotel.countDocuments({type:"resort"});
    const villaCount = await Hotel.countDocuments({type:"villa"});
    const cabinCount = await Hotel.countDocuments({type:"cabin"});
    
    res.status(200).json([
      {type:"hotels", count:hotelCount},
      {type:"apartments", count:apartmentCount},
      {type:"resorts", count:resortCount},
      {type:"villas", count:villaCount},
      {type:"cabins", count:cabinCount},
    ]);
  } catch (err) {
    next(err);
  }
}