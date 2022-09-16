import React, { useEffect, useState } from "react";

const Profile: React.FC = () => {
    const DOWN = "rotate-90";
    const UP = "-rotate-90";
    const [expand, setExpand] = useState<boolean>(false);
    const [direction, setDirection] = useState<string>(DOWN);

    const handleExpand = (e: any) => {
        e.preventDefault();
        setExpand(!expand);
    };

    useEffect(() => {
        !expand ? setDirection(DOWN) : setDirection(UP);
    }, [expand]);

    return (
        <div className="bg-sky-200 justify-center">
            <div className="flex justify-between px-10 py-3 text-xl">
                <h3>登録情報</h3>
                <button className={direction} onClick={handleExpand}>▷</button>
            </div>
            {(expand) && (
                <div className="flex justify-center">
                <div className="bg-white w-full">
                    <p>登録内容</p>
                </div>
            </div>
            )}
        </div>
    );
};

export default Profile;