import { useState, useEffect } from 'react';


function ActivitySelector({ onActivitySelect }) {

    const [activities, setActivities] = useState([]); // 初始化为空数组

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await fetch(`/api/v1/activity`);
            console.log("data" + response);
            const data = await response.json();
            if (data && Array.isArray(data) && data.length > 0) {
                setActivities(
                    data.map((activity) => ({
                        ...activity,
                        selected: false // 为每个事件添加默认的 selected 属性
                    })));
            } else {
                setActivities([{ id: -1, name: 'No Activity Avaliable ', price: -10, selected: false }]);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setActivities([{ id: -1, name: 'Failed to fetch data', price: -10, selected: false }]); // 错误处理，清空建议列表
        }
    };

    const [showList, setShowList] = useState(false); // 状态控制下拉列表的显示

    const handleSelectActivity = (id) => {
        const updatedActivities = activities.map(activity => {
            if (activity.id === id) {
                return { ...activity, selected: !activity.selected };
            }
            return activity;
        });

        setActivities(updatedActivities);

        const selectedActivities = updatedActivities.filter(activity => activity.selected).map(activity => activity.id);

        onActivitySelect(selectedActivities);
    };

    const toggleList = () => {
        setShowList(!showList); // 切换列表显示状态
    };

    return (
        <div className="form-container">
            <label className="input-labels">Activities</label>
            <input
                htmlFor="activities"
                type="text"
                value={"Select Activities ▼"}
                readOnly
                onClick={toggleList}
            />
            {showList && (
                <ul className="suggestions-list">
                    {activities.map((activity) => (
                        <li key={activity.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={activity.selected || false}
                                    onChange={() => handleSelectActivity(activity.id)}
                                />
                                {`${activity.name} $${activity.price}`}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ActivitySelector;
