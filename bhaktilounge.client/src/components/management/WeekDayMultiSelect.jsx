import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function MultiSelect({ daysOfWeek, setDaysOfWeek }) {
    const allWeekDay = [
        { value: 'Monday', label: 'Mo' },
        { value: 'Tuesday', label: 'Tu' },
        { value: 'Wednesday', label: 'We' },
        { value: 'Thursday', label: 'Th' },
        { value: 'Friday', label: 'Fr' },
        { value: 'Saturday', label: 'Sa' },
        { value: 'Sunday', label: 'Su' },
    ];

    const themeStyle = {
        control: (styles) => ({
            ...styles,
            backgroundColor: 'rgb(243,244,246)',
            borderRadius: 8,
            borderColor: 'rgb(209,213,219)',
            marginTop: 4,
            marginBottom: 16,
            filter: 'drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06))',
        }),
        option: (styles) => ({
            ...styles,
            paddingTop: 4,
            paddingBottom: 4,
        }),
    };
    return (
        <Select
            options={allWeekDay}
            closeMenuOnSelect={false}
            components={makeAnimated()}
            isMulti
            value={allWeekDay.filter((day) => daysOfWeek.includes(day.value))}
            // defaultInputValue={['Monday','Tuesday']}
            className='basic-multi-select'
            // classNamePrefix='react-select'
            onChange={(e) => {
                const weekday = e.map((e) => e.value);
                setDaysOfWeek(weekday);
            }}
            styles={themeStyle}
        />
    );
}

export default MultiSelect;
