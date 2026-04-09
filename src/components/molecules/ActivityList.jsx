import React from "react";
import ActivityItem from "./ActivityItem";

const ActivityList = ({ activities }) => {
    // Штучний стейт для виклику рендеру батька
    const [count, setCount] = React.useState(0);

    // ОПТИМІЗАЦІЯ: useCallback фіксує посилання на функцію в пам'яті.
    // Вона не буде створюватися наново при кожному рендері батька.
    const handleLike = React.useCallback(() => {
        console.log("Дія: Like");
    }, []); // Порожній масив, бо вона ні від чого не залежить


    if (!activities || activities.length === 0) {
        return <p>Немає останніх активностей.</p>;
    }

    return (
        <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Остання активність</h3>
                <div>
                    <button onClick={() => setCount(c => c + 1)}>
                        Оновити батька (count: {count})
                    </button>
                </div>
            </div>
            <p><small>Клік по цій кнопці перемальовує <code>ActivityList</code>. Дивіться в консоль, щоб побачити логи дітей.</small></p>
            {activities.map((item) => (
                <ActivityItem 
                    key={item.id} 
                    action={item.action} 
                    date={item.date} 
                    onLike={handleLike} 
                />
            ))}
        </div>
    );
};


export default ActivityList;
