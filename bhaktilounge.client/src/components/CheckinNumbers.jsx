import { useEffect, useState } from 'react';

const CheckinNumbers = () => {
    const [checkinNumbers, setCheckinNumbers] = useState([]); // 初始化为空数组

    useEffect(() => {
        async function fetchCheckinNumber() {
            fetch("/api/v1/checkin/today-checkins")
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
        <div>
            <p>Check-in: {checkinNumbers.totalCheckIns}</p>
            <p>Diners: {checkinNumbers.dinners}</p>
        </div>

    );
};

export default CheckinNumbers;