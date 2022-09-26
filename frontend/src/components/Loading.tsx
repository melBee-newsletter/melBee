import React from "react";
import headerLogo from "../assets/logo.png";
import { Props } from "../type";

const Loading: React.FC<Props["loading"]> = ({ word }) => {
    return (
        <div className="flex justify-center items-baseline pt-72 bg-white h-screen w-full">
            <div className="flex justify-center w-full">
                <div>
                    <img src={headerLogo} alt="melBee_logo" className="animate-bounce" width="200" />
                    <p className="text-3xl font-bold">{word}<span className="animate-ping"> . . .</span></p>
                </div>
            </div>
        </div>
    );
};

export default Loading;