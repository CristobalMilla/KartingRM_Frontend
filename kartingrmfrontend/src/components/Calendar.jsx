import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import rentService from "../services/rent.service";

const CalendarPage = () => {
  const localizer = momentLocalizer(moment); // Configurar el calendario para utilizar moment.jsx
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Usar axios y asyc/await para conectar al back
    //CAMBIAR A SERVICE
    const fetchRents = /*async*/ () => {
      try {
        /*const response = await axios.get("/api/rent/"); 
        const rents = response.data;*/
        rentService
              .getAll()
              .then((response) => {
                console.log("Mostrando lista de todos las rent", response.data);
                const rents = response.data;
              });

        //Mapear la data obtenida al formato del calendario
        const formattedEvents = rents.map((rent) => ({
            //Utiliza code y mainName para "nombar" los eventos
          title: `${rent.code} - ${rent.mainName}`,
          start: new Date(`${rent.date}T${rent.starTime}`),
          end: new Date(`${rent.date}T${rent.endTime}`),
        }));

        setEvents(formattedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar rents:", error);
        setLoading(false);
      }
    };

    fetchRents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Calendario de Rentas</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
