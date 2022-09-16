import React from "react";
import Profile from "../organisms/Profile";
import ContactList from "../organisms/ContactList";
import SentHistory from "../organisms/SentHistory";

const Portal: React.FC = () => {
    return (
        <div style={{width: 1400, margin: "0 auto"}}>
            <Profile />

            <ContactList />

            <SentHistory />
        </div>
    );
};

export default Portal;