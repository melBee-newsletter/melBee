import React from "react";
import headerLogo from "../atoms/logo.png";

type Props = {
    title: string;
    content: string;
};

const Popup: React.FC<Props> = ({ title, content }) => {

    return (
        <div className="grid grid-cols-1 items-center bg-cyan-600 rounded-tl-3xl rounded-br-3xl z-50 border-4 border-black" style={{width: 450, height: 250, margin: "0 auto"}}>
            <div className="flex flex-row justify-center items-center">
                {/* <div className="flex basis-1/3 justify-center pr-5"> */}
                    <img src={headerLogo} alt="melBee_logo" className="flex basis-1/3 justify-center pr-5 pl-3 pt-5 animate-pulse" width="90" />
                {/* </div> */}
                <div className="flex justify-center basis-2/3 pt-5 pr-3">
                    <div className="">
                        <h3 className="font-bold text-2xl">{title}</h3>
                        <br />
                        <p className="text-lg">{content}</p>
                    </div>
                </div>
            </div>
            <div className="bg-yellow-400 py-2 px-3 rounded-xl mx-40 my-2 border-2 border-black">
                <button>閉じる</button>
            </div>
        </div>
    );
};

export default Popup;