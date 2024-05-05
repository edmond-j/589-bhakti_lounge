import { useState, useEffect } from 'react';


function EventSelector({ onEventSelect }) {

    const [events, setEvents] = useState([]); // 初始化为空数组

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async (value) => {
        try {
            const response = await fetch(`/api/v1/event`);
            console.log("data" + response);
            const data = await response.json();
            if (data && Array.isArray(data) && data.length > 0) {
                setEvents(data);
            } else {
                setEvents([{ id: -1, name: 'Null', price: -10, selected: false }]);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setEvents([{ id: -1, name: 'Null', price: -10, selected: false }]); // 错误处理，清空建议列表
        }
    };


    // 直接定义 options 为一个数组

    // const [events, setEvents] = useState([
    //     { id: 1, name: 'Yoga 5:30pm', price: 10, selected: false },
    //     { id: 2, name: 'Yoga 6:15pm', price: 10, selected: false },
    //     { id: 3, name: 'Workshop', price: 20, selected: false },
    //     { id: 4, name: 'Dinner', price: 12, selected: false }
    // ]);

    const [showList, setShowList] = useState(false); // 状态控制下拉列表的显示

    const handleSelectEvent = (id) => {
        const updatedEvents = events.map(event => {
            if (event.id === id) {
                return { ...event, selected: !event.selected };
            }
            return event;
        });

        setEvents(updatedEvents);

        const selectedEvents = updatedEvents.filter(event => event.selected).map(event => event.id);

        // 调用父组件的回调函数，传递所有选中的事件的ID数组
        onEventSelect(selectedEvents);
    };

    const toggleList = () => {
        setShowList(!showList); // 切换列表显示状态
    };

    return (
        <div className="form-container">
            <label className="input-labels">Events</label>
            <input
                htmlFor="events"
                type="text"
                value={"Select Events ▼"}
                readOnly
                onClick={toggleList}
            />
            {showList && (
                <ul className="suggestions-list">
                    {events.map((event) => (
                        <li key={event.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={event.selected}
                                    onChange={() => handleSelectEvent(event.id)}
                                />
                                {`${event.name} $${event.price}`}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default EventSelector;
