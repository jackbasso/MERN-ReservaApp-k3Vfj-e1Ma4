import { useState } from 'react';
import { faCircleXmark, faDiagramNext } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';


export const Reserve = ({setOpen, hotelId}) => {
  const [ selectedRooms, setSelectedRooms ] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext)
  const navigate = useNavigate()
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter((item)=> item !== value)
    );
  };

  // Get exact days from the date range
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end){
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  }
  // List with all selected dates from the client
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)
  // Check room availability
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => 
    alldates.includes(new Date(date).getTime())
    );
    return !isFound
  };


  const handleClick = async () => {
    try {
      await Promise.all(selectedRooms.map(roomId=>{
      const res = axios.put(`/rooms/availability/${roomId}`, {dates:alldates})
      return res.data;
      })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>setOpen(false)} />
        <span>Select your rooms</span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">Max people <b>{item.maxPeople}</b></div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
               { item.roomNumbers.map((roomNumber) => (
              <div className="room">
                <label>{roomNumber.number}</label>
                <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
              </div>
              ))}
            </div>
           
          </div>
        ))}
        <button onClick={handleClick} className="rButton">Reserve Now!</button>
      </div> 
    </div>
  )
}

