import React from "react";

const ActivityItem = ({ action, date, onLike }) => {
    // Відстежуємо рендер у консолі
    console.log(`ActivityItem (${action}) відрендерився!`);

    return (
        <div style={{ borderBottom: "1px solid #eee", padding: "10px 0", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>{action}</p>
                <small style={{ color: "gray" }}>{date}</small>
            </div>
            <button 
                onClick={onLike}
                style={{ cursor: 'pointer', padding: '5px 10px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
                Like
            </button>
        </div>
    );
};


export default React.memo(ActivityItem);
