import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: {rooms: savedRoom._id},
      });
    } catch (err) {
      next(err)
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err)
  }
}

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body}, //mongoDB $set overwrites the existing value of that field with the value of the specified expression. $set appends new fields to existing documents. You can include one or more $set stages in an aggregation operation.
     {new:true}) //{new:true} luego de que se actualiza esto retorna la versión actualizada
    res.status(200).json(updatedRoom)
  } catch (err) {
    next();
  }
}

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: {rooms: req.params.id}, // $pull metodo de mongoose
      });
    } catch (err) {
      next(err)
    }
    res.status(200).json("El Room ha sido eliminado")
  } catch (err) {
    next();
  }
}

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
     res.status(200).json(room);
  } catch (err) {
    next();
  }
}

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next();
  }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne({"roomNumbers._id": req.params.id}, {
      $push: {
        "roomNumbers.$.unavailableDates": req.body.dates // This is a way to update nested properties in MongoDB instead of create a new model
      }
    })
    res.status(200).json("Rooms status has been updated.")
  } catch (err) {
    next(err);
  }
}