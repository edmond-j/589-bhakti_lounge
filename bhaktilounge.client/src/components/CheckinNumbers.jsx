import { useEffect, useState } from "react";
import authFetch from "@/utils/authFetch.js";

const CheckinNumbers = () => {
  const [checkinNumbers, setCheckinNumbers] = useState([]);

  useEffect(() => {
    async function fetchCheckinNumber() {
      authFetch("/api/v1/checkin/today-checkins")
        .then((response) => response.json())
        .then((data) => {
          console.log("acquire", data);
          setCheckinNumbers(data);
        });
    }
    fetchCheckinNumber();
  }, []);

  // const fetchCheckinNumber = async () => {
  //     try {
  //         const response = await fetch("api/v1/Checkin/today-checkins");
  //         const data = await response.json();
  //         setCheckinNumbers(data);
  //     } catch (error) {
  //         console.error('Failed to fetch data:', error);
  //         setCheckinNumbers([]);
  //     }
  // };

  return (
    <div className="flex justify-evenly">
      <p>Check-in: {checkinNumbers.totalCheckIns}</p>
      <p>Dine-in: {checkinNumbers.dineInDinners}</p>
      <p>Takeaway: {checkinNumbers.takeawayDinners}</p>
    </div>
  );
};

export default CheckinNumbers;
