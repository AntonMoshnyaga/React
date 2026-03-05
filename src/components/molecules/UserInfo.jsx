import React from "react";

const UserInfo = ({ name, email, role }) => {
    return (
        <div
            style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}
        >
            <h2>{name}</h2>
            <p>Email: {email}</p>
            <p>
                Посада: <strong>{role}</strong>
            </p>
        </div>
    );
};

export default UserInfo;
