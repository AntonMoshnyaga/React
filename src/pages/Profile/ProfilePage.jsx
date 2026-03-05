import React, { useState, useEffect } from "react";
import UserInfo from "../../components/molecules/UserInfo";
import ActivityList from "../../components/molecules/ActivityList";

const ProfilePage = () => {
    // Контейнер тримає стан
    const [userData, setUserData] = useState(null);
    const [activities, setActivities] = useState([]);

    // Імітація запиту на сервер
    useEffect(() => {
        // В реальному житті тут був би fetch() або axios
        setUserData({
            name: "Іван Бойко",
            email: "ivan.boyko@example.com",
            role: "Frontend Розробник",
        });

        setActivities([
            { id: 1, action: "Увійшов у систему", date: "Сьогодні, 10:00" },
            { id: 2, action: "Оновив профіль", date: "Вчора, 14:30" },
            { id: 3, action: "Завантажив звіт", date: "12 Вересня" },
        ]);
    }, []);

    // Поки дані "завантажуються"
    if (!userData) {
        return <div>Завантаження профілю...</div>;
    }

    return (
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
            <aside style={{ flex: 1 }}>
                <UserInfo
                    name={userData.name}
                    email={userData.email}
                    role={userData.role}
                />
            </aside>
            <main style={{ flex: 2 }}>
                <ActivityList activities={activities} />
            </main>
        </div>
    );
};

export default ProfilePage;
