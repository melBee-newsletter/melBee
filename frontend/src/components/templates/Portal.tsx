import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../organisms/Profile";
import ContactList from "../organisms/ContactList";
import MyTemplates from "../organisms/MyTemplates";
import SentHistory from "../organisms/SentHistory";

type Props = {
    analytics: string;
    setAnalytics: Function;
};

const Portal: React.FC<Props> = ({ analytics, setAnalytics }) => {
    const navigate = useNavigate();

    return (
        <div className="px-10 w-screen h-screen">
            <div className="flex justify-end">
                <button onClick={(e) => { navigate("/user/templates")}} className="bg-yellow-400 rounded-xl px-5 py-1 my-3 border-solid border-black border-4">
                    新規作成
                </button>
            </div>

            <Profile analytics={analytics} setAnalytics={setAnalytics} />

            <ContactList />

            <MyTemplates />
            
            <SentHistory />
        </div>
    );
};

export default Portal;