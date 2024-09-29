import { useEffect, useState } from "react";
import authFetch from "@/utils/authFetch.js";

const CheckinNumbers = () => {
    const [checkinNumbers, setCheckinNumbers] = useState({
        totalCheckIns: 0,
        dineInDinners: 0,
        takeawayDinners: 0,
        checkinsByActivity: [],
        checkinsByEvent: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCheckinNumber() {
            try {
                const response = await authFetch("/api/v1/checkin/today-checkins");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("acquire", data);

                // Ensure data structure is correct
                setCheckinNumbers({
                    totalCheckIns: data.totalCheckIns || 0,
                    dineInDinners: data.dineInDinners || 0,
                    takeawayDinners: data.takeawayDinners || 0,
                    checkinsByActivity: data.checkinsByActivity || [],
                    checkinsByEvent: data.checkinsByEvent || []
                });
            } catch (err) {
                console.error("Failed to fetch check-in numbers:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCheckinNumber();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // 显示加载中的状态
    }

    if (error) {
        return <div>Error: {error}</div>; // 显示错误信息
    }

    return (
        <div>
            <p>Check-in total: {checkinNumbers.totalCheckIns}</p>
            <br />
            <div>
                <p>Check-ins by Dinner:</p>
                <ul>
                    <li>Dine-in: {checkinNumbers.dineInDinners}</li>
                    <li>Takeaway: {checkinNumbers.takeawayDinners}</li>
                </ul>

            </div>
            <br />
            <div>
                <p>Check-ins by Activity:</p>
                {Array.isArray(checkinNumbers.checkinsByActivity) && checkinNumbers.checkinsByActivity.length > 0 ? (
                    <ul>
                        {checkinNumbers.checkinsByActivity.map(activity => (
                            <li key={activity.activityId}>
                                {activity.activityName}: {activity.checkinCount}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No check-ins by activity found.</p>
                )}
            </div>
            <br />
            <div>
                <p>Check-ins by Event:</p>
                {Array.isArray(checkinNumbers.checkinsByEvent) && checkinNumbers.checkinsByEvent.length > 0 ? (
                    <ul>
                        {checkinNumbers.checkinsByEvent.map(event => (
                            <li key={event.eventId}>
                                {event.eventName}: {event.checkinCount}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No check-ins by Event found.</p>
                )}
            </div>
            <br />
        </div>
    );
};

export default CheckinNumbers;