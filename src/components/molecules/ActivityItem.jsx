import React from "react";

const ActivityItem = ({ action, date }) => {
    return (
        <div style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
            <p style={{ margin: 0, fontWeight: "bold" }}>{action}</p>
            <small style={{ color: "gray" }}>{date}</small>
        </div>
    );
};

export default ActivityItem;
