import { useEffect, useState } from 'react';
import '../App.css';

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
            <h5>Total Check-in Today: {checkinNumbers.totalCheckIns}</h5>
            <h5>Total Diners Today: {checkinNumbers.dinners}</h5>
        </div>

    );
};

export default CheckinNumbers;