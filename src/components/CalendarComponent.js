import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({tasks, onDateSelect}) => {
  const [date, setDate] = useState(null); // Inicializa el estado como null

  useEffect(() => {
    setDate(new Date()); // Establece la fecha solo en el cliente
  }, []);

  const onDateChange = (newDate) => {
    setDate(newDate);
    // console.log("Fecha seleccionada:", newDate);
    onDateSelect(newDate);
  };

  if (date === null) {
    return null; // Renderiza nada hasta que el estado se haya inicializado
  }

  return (
    <div className="custom-calendar">
      <Calendar onChange={onDateChange} value={date} />
      <br />
      <p className='date'>Seleted date {date.toDateString()}</p>
    </div>
  );
};

export default CalendarComponent;
