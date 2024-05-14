import { useEffect, useState } from 'react';
//import '../App.css';

const CheckinNumbers = () => {
    const [checkinNumbers, setCheckinNumbers] = useState([]); // 初始化为空数组

    useEffect(() => {
        fetchCheckinNumber();
    }, []);

    const fetchCheckinNumber = async () => {
        try {
            const response = await fetch(`api/v1/Checkin/today-checkins`);
            const data = await response.json();
            setCheckinNumbers(data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setCheckinNumbers([]);
        }
    };

    return (
        <div>
            <p>Check-in: {checkinNumbers.totalCheckIns}</p>
            <p>Diners: {checkinNumbers.dinners}</p>
        </div>

    );
};

export default CheckinNumbers;