import React from 'react';
import '../App.css';

const DinersNumber = () => {

    // const fetchDinersNumber = async () => {
    //     try {
    //         const response = await fetch(`/api/v1/activity`);
    //         console.log("data" + response);
    //         const data = await response.json();
    //         if (data && Array.isArray(data) && data.length > 0) {
    //             setActivities(
    //                 data.map((activity) => ({
    //                     ...activity,
    //                     selected: false // 为每个事件添加默认的 selected 属性
    //                 })));
    //         } else {
    //             setActivities([{ id: -1, name: 'No Activity Avaliable ', price: -10, selected: false }]);
    //         }
    //     } catch (error) {
    //         console.error('Failed to fetch data:', error);
    //         setActivities([{ id: -1, name: 'Failed to fetch data', price: -10, selected: false }]); // 错误处理，清空建议列表
    //     }
    // };

    return (
        <>
            <h3>Today's Diners: </h3>
        </>

    );
};

export default DinersNumber;