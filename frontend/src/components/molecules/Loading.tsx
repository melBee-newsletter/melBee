import React from "react";
import headerLogo from "../atoms/logo.png";

const Loading: React.FC = () => {
    return (
        <div className="fixed bg-white w-screen h-screen">
            <div className="flex justify-center">
                <div>
                    <img src={headerLogo} alt="melBee_logo" className="animate-bounce" width="200" />
                    <p>LOADING・・・</p>
                </div>
            </div>
        </div>
    );
};

export default Loading;