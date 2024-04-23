import React from "react";
import { useEffect, useState } from "react";
import "./management.css";

import ItemList from "./components/management/ItemList";
import UpdateForm from "./components/management/UpdateForm";

function Activity() {
  const [activities, setActivity] = useState([]);
  useEffect(() => {
    populateActivityData();
  }, []);

  async function populateActivityData() {
    const response = await fetch("/api/activity");
    const data = await response.json();
    console.log("data:" , data);
    setActivity(data);
  }
  console.log(activities[0]);
  console.log(activities);

  return (
    <>
      <ItemList items={activities} />
      <UpdateForm items={activities} />
    </>
  );
}
//const activities =
//    [
//        {
//            "id": 1,
//            "name": "5.31-Yoga",
//            "price": 10,
//            "startTime": {
//                "hour": 5,
//                "minute": 30
//            },
//            "endTime": {
//                "hour": 6,
//                "minute": 15
//            },
//            "daysOfWeek": [
//                1,
//                2,
//                3,
//                5
//            ]
//        },
//        {
//            "id": 2,
//            "name": "6.15-Yoga",
//            "price": 10,
//            "startTime": {
//                "hour": 6,
//                "minute": 15
//            },
//            "endTime": {
//                "hour": 7,
//                "minute": 0
//            },
//            "daysOfWeek": [
//                1,
//                2,
//                3,
//                5
//            ]
//        }
//    ];
export default Activity;
