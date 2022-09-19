import React, { useEffect, useState } from "react";
import headerLogo from "../atoms/logo.png";

/** HOW TO USE POPUP::
 * in the component you want the popup, please add;
 *      (1) import Popup from "__dir/Popup";
 *      (2) <Popup title={"ENTER_ERROR_TITLE"} content={"ENTER_ERROR_MESSAGE"} type={"success"} />
 * Currently we have basic 3 types of colors (feel free to change!)
 */

type Props = {
    title: string;
    content: string;
    type: string;
};

const Popup: React.FC<Props> = ({ title, content, type }) => {
    const [displayPopup, setDisplayPopup] = useState<boolean>(true);
    const [popupColor, setPopupColor] = useState<string>("");

    useEffect(() => {
        if (type === "success") {
            setPopupColor("bg-lime-600");
        } else if (type === "fail") {
            setPopupColor("bg-red-600");
        } else {
            setPopupColor("bg-cyan-600");
        };
    }, []);
   

    return (
        <>
            {displayPopup && <div className={`grid grid-cols-1 items-center rounded-tl-3xl rounded-br-3xl z-50 border-4 border-black ${popupColor}`} style={{width: 450, height: 250, margin: "0 auto"}}>
                <div className="flex flex-row justify-center items-center">
                    <img src={headerLogo} alt="melBee_logo" className="flex basis-1/3 justify-center pr-5 pl-3 pt-5 animate-pulse" width="90" />
                    <div className="flex justify-center basis-2/3 pt-5 pr-3">
                        <div className="">
                            <h3 className="font-bold text-2xl">{title}</h3>
                            <br />
                            <p className="text-lg">{content}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-yellow-400 py-2 px-3 rounded-xl mx-40 my-2 border-2 border-black">
                    <button onClick={()=>setDisplayPopup(false)}>閉じる</button>
                </div>
            </div>}
        </>
    );
};

export default Popup;