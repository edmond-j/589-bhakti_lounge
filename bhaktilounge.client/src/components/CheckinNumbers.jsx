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

    return (
        <div className="flex justify-evenly">
            <p>Check-in: {checkinNumbers.totalCheckIns}</p>
            <p>Dine-in: {checkinNumbers.dineInDinners}</p>
            <p>Takeaway: {checkinNumbers.takeawayDinners}</p>
        </div>
    );
};

export default CheckinNumbers;