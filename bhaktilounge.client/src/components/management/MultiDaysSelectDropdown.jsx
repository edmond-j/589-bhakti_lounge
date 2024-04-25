import React, { useState, useEffect } from 'react';

function MultiDaysSelectDropdown({ initialDays }) {
  // 初始化状态为数组
  const [selectedDays, setSelectedDays] = useState([]);

  // 当初始天数改变时更新
  useEffect(() => {
    if (initialDays) {
      setSelectedDays(initialDays);
    }
  }, [initialDays]);

  // 处理选择变化
  function handleChange(event) {
    // 获取所有选中的项
    const options = event.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedDays(value);
  }

  return (
    <div>
      <label htmlFor="daysOfWeek">Days of the Week:</label>
      <select id="daysOfWeek" multiple value={selectedDays} onChange={handleChange}>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
    </div>
  );
}

export default MultiDaysSelectDropdown;
