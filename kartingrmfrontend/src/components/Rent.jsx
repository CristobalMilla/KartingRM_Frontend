import React, { useState, useEffect } from "react";
import axios from "axios";
import feeTypeService from "../services/feeType.service";
import rentService from "../services/rent.service";
import receiptService from "../services/receipt.service"

const Rent = () => {
  const [step, setStep] = useState(1); // Tracking para las steps
  const [feeTypes, setFeeTypes] = useState([]); // Opciones de feetypes
  //Selecciones
  const [selectedFeeType, setSelectedFeeType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  //Datos iniciales
  const [mainName, setMainName] = useState("");
  const [mainRut, setMainRut] = useState("");
  const [peopleAmount, setPeopleAmount] = useState(1);
  const [groupInputs, setGroupInputs] = useState([]);
  const [summary, setSummary] = useState(null);

  // Fetch Fee Types
  useEffect(() => {
    const fetchFeeTypes = () => {
      try {
        feeTypeService
              .getAll()
              .then((response) => {
                console.log("Mostrando lista de todos los feetye", response.data);
                setFeeTypes(response.data);
              })
      } catch (error) {
        console.error("Error fetching fee types:", error);
      }
    };

    fetchFeeTypes();
  }, []);

  // Handle navegacion de steps
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  // Fetch available slots based on selected date and fee type
  //CAMBIAR A SERVICE
  const fetchAvailableSlots = () => {
    try {
        const response = rentService.getAvailableSlots({
            date: selectedDate,
            totalDuration: selectedFeeType.totalDuration,
        });
        setAvailableSlots(response.data);
    } catch (error) {
        console.error("Error fetching available slots:", error);
    }
  };

  // Generar inputs del recivo segun peopleAmount, con el nombre del cliente y el descuento aplicado
  useEffect(() => {
    const inputs = [];
    for (let i = 0; i < peopleAmount; i++) {
      inputs.push({ clientName: "", priceDiscount: 0 });
    }
    setGroupInputs(inputs);
  }, [peopleAmount]);

  // Calcular el resumen de la renta
  const calculateSummary = () => {
    const feePrice = selectedFeeType.price;
    const receipts = groupInputs.map((input, index) => {
      const sizeDiscount =
        peopleAmount >= 11
          ? 0.3
          : peopleAmount >= 6
          ? 0.2
          : peopleAmount >= 3
          ? 0.1
          : 0.0;
        //Variables de renta
      const effectiveDiscount = Math.max(sizeDiscount, input.priceDiscount / 100);
      const priceDiscounted = Math.round(feePrice * (1 - effectiveDiscount));
      const ivaPrice = Math.round(priceDiscounted * 0.27);
      const finalPrice = priceDiscounted + ivaPrice;

      return {
        ...input,
        sizeDiscount,
        priceDiscounted,
        ivaPrice,
        finalPrice,
      };
    });
    //Calculo del totalPrice
    const totalPrice = receipts.reduce((sum, receipt) => sum + receipt.finalPrice, 0);
    //Variables para el resumen
    setSummary({
      feeType: selectedFeeType,
      date: selectedDate,
      startTime: selectedTime,
      endTime: calculateEndTime(selectedTime, selectedFeeType.totalDuration),
      receipts,
      totalPrice,
    });
  };
  //Calculo de la hora de termino
  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(endMinutes / 60);
    return `${String(endHours).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;
  };
  //Guardar los datos ingresados y calculados en la renta final
  const saveRent = async () => {
    try {
      const rentData = {
        mainName,
        mainRut,
        peopleAmount,
        feeTypeId: selectedFeeType.id,
        date: selectedDate,
        startTime: selectedTime,
        endTime: summary.endTime,
        priceTotal: summary.totalPrice,
      };

      const rentResponse = rentService.createComplete(rentData);

      const receiptsData = summary.receipts.map((receipt) => ({
        ...receipt,
        rentId: rentResponse.data.id,
      }));

      receiptService.create(receiptsData);

      alert("Rent successfully saved");
    } catch (error) {
      console.error("Error saving rent:", error);
    }
  };
  //HTML
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">New Rent</h1>

      {step === 1 && (
        <div>
          <h2 className="text-xl mb-2">Seleccione la tarifa</h2>
          <ul>
            {feeTypes.map((feeType) => (
              <li
                key={feeType.id}
                onClick={() => {
                  setSelectedFeeType(feeType);
                  nextStep();
                }}
                className="cursor-pointer bg-white p-2 mb-2 rounded shadow hover:bg-gray-200"
              >
                {feeType.name} - {feeType.lapNumber} laps, {feeType.price} USD
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl mb-2">Seleccione el dia</h2>
          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 rounded mb-4"
          />
          <button
            onClick={() => {
              fetchAvailableSlots();
              nextStep();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl mb-2">Seleccione un horario</h2>
          <ul>
            {availableSlots.map((slot) => (
              <li
                key={slot}
                onClick={() => {
                  setSelectedTime(slot);
                  nextStep();
                }}
                className="cursor-pointer bg-white p-2 mb-2 rounded shadow hover:bg-gray-200"
              >
                {slot}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl mb-2">Ingresar detalle</h2>
          <input
            type="text"
            placeholder="Main Name"
            value={mainName}
            onChange={(e) => setMainName(e.target.value)}
            className="border p-2 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Main RUT"
            value={mainRut}
            onChange={(e) => setMainRut(e.target.value)}
            className="border p-2 rounded mb-2"
          />
          <input
            type="number"
            min={1}
            max={15}
            placeholder="People Amount"
            value={peopleAmount}
            onChange={(e) => setPeopleAmount(Number(e.target.value))}
            className="border p-2 rounded mb-4"
          />
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-xl mb-2">Ingresar datos del grupo</h2>
          {groupInputs.map((input, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Client Name"
                value={input.clientName}
                onChange={(e) =>
                  setGroupInputs((prev) =>
                    prev.map((grp, i) =>
                      i === index ? { ...grp, clientName: e.target.value } : grp
                    )
                  )
                }
                className="border p-2 rounded mb-2"
              />
              <input
                type="number"
                placeholder="Price Discount (%)"
                value={input.priceDiscount}
                onChange={(e) =>
                  setGroupInputs((prev) =>
                    prev.map((grp, i) =>
                      i === index ? { ...grp, priceDiscount: Number(e.target.value) } : grp
                    )
                  )
                }
                className="border p-2 rounded"
              />
            </div>
          ))}
          <button
            onClick={() => {
              calculateSummary();
              nextStep();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}

      {step === 6 && summary && (
        <div>
          <h2 className="text-xl mb-4">Resumen</h2>
          <p>
            <strong>Tipo de Tarifa:</strong> {summary.feeType.name}
          </p>
          <p>
            <strong>Fecha:</strong> {summary.date}
          </p>
          <p>
            <strong>Hora de inicio:</strong> {summary.startTime}
          </p>
          <p>
            <strong>Hora de termino:</strong> {summary.endTime}
          </p>
          <p>
            <strong>Precio total:</strong> {summary.totalPrice} CLP
          </p>
          <button
            onClick={saveRent}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirmar y guardar
          </button>
        </div>
      )}

      {step > 1 && (
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black px-4 py-2 rounded mt-4"
        >
          Regresar
        </button>
      )}
    </div>
  );
};

export default Rent;
