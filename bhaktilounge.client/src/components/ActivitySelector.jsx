import { useState, useEffect } from "react";
import authFetch from "@/utils/authFetch.js";

function ActivitySelector({ onActivitySelect }) {
  const [activities, setActivities] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await authFetch(`/api/v1/CompData/CustomerOption`);
      const result = await response.json();
      const data = result.activities;
      if (data && Array.isArray(data) && data.length > 0) {
        setActivities(
          data.map((activity) => ({
            ...activity,
            selected: false, // 为每个事件添加默认的 selected 属性
          })),
        );
      } else {
        setActivities([
          {
            id: -1,
            name: "No Activity Avaliable Today",
            price: -10,
            selected: false,
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setActivities([
        { id: -1, name: "Failed to fetch data", price: -10, selected: false },
      ]); // 错误处理，清空建议列表
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSelectActivity = (id) => {
    const updatedActivities = activities.map((activity) => {
      // Check if the current activity includes dinner
      const includesDinner = activity.includeDinner;
      if (activity.id === id) {
        return { ...activity, selected: !activity.selected };
      } else if (includesDinner && activity.includeDinner) {
        // If the clicked activity includes dinner, disable other dinner-including activities
        return { ...activity, selected: false };
      }
      return activity;
    });
    setActivities(updatedActivities);
    const selectedActivities = updatedActivities.filter(
      (activity) => activity.selected,
    );
    onActivitySelect(selectedActivities);
  };

  function someDinnerActivityIsSelected() {
    return activities.some(activity => activity.includeDinner && activity.selected);
  }

  const toggleList = () => {
    setShowList(!showList);
  };

  return (
    <div className="form-group">
      <label>Activities</label>
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
            <li key={activity.id} className="multi-select-item">
              <label
                className={`multi-select-label ${activity.id === -1 ? "disabled" : ""
                  }`}
              >
                {activity.id !== -1 && (
                  <input
                    type="checkbox"
                    checked={activity.selected || false}
                    onChange={() => handleSelectActivity(activity.id)}
                    disabled={activity.includeDinner && someDinnerActivityIsSelected() && !activity.selected}
                  />
                )}
                {activity.id !== -1
                  ? `${activity.name}: $${activity.price}`
                  : activity.name}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ActivitySelector;
