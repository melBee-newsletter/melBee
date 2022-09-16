import React from "react";
import Profile from "../organisms/Profile";
import ContactList from "../organisms/ContactList";
import SentHistory from "../organisms/SentHistory";

type Props = {
    analytics: string;
    setAnalytics: Function;
};

const Portal: React.FC<Props> = ({ analytics, setAnalytics }) => {
    return (
        <div style={{width: 1400, margin: "0 auto"}}>
            <Profile analytics={analytics} setAnalytics={setAnalytics} />

            <ContactList />

            <SentHistory />
        </div>
    );
};

export default Portal;