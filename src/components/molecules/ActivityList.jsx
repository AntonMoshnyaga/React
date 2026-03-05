import React from "react";
import ActivityItem from "./ActivityItem";

const ActivityList = ({ activities }) => {
    if (!activities || activities.length === 0) {
        return <p>Немає останніх активностей.</p>;
    }

    return (
        <div>
            <h3>Остання активність</h3>
            {activities.map((item) => (
                <ActivityItem key={item.id} action={item.action} date={item.date} />
            ))}
        </div>
    );
};

export default ActivityList;
