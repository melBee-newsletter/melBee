import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../organisms/Profile";
import ContactList from "../organisms/ContactList";
import MyTemplates from "../organisms/MyTemplates";
import SentHistory from "../organisms/SentHistory";

type Props = {
    analytics: string;
    setAnalytics: Function;
};

interface expand {
    profile: boolean;
    contact: boolean;
    template: boolean;
    history: boolean;
    [key: string]: boolean;
};

const Portal: React.FC<Props> = ({ analytics, setAnalytics }) => {
    const navigate = useNavigate();
    const [expand, setExpand] = useState<expand>({
        profile: false,
        contact: false,
        template: false,
        history: false,});

    return (
        <div className="px-10 w-screen h-screen">
            <div className="flex justify-end">
                <button onClick={(e) => { navigate("/user/templates")}} className="bg-yellow-400 rounded-xl px-5 py-1 my-3 mr-6 border-solid border-black border-4 animate-pulse font-bold">
                    新規作成
                </button>
            </div>

            <Profile analytics={analytics} setAnalytics={setAnalytics} expand={expand.profile} setExpand={setExpand} />

            <ContactList expand={expand.contact} setExpand={setExpand} />

            <MyTemplates expand={expand.template} setExpand={setExpand} />
            
            <SentHistory expand={expand.history} setExpand={setExpand} />
        </div>
    );
};

export default Portal;