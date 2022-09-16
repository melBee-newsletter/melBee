import React, { useState, useEffect } from "react";

const MyTemplates: React.FC = () => {
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
        <div className="bg-neutral-500 my-2">
            <div className="flex justify-between px-10 py-3 text-xl text-white">
                <h3>テンプレート一覧</h3>
                <button className={direction} onClick={handleExpand}>▷</button>
            </div>
            {(expand) && (
            <div className="flex justify-center">
                <div className="bg-white w-full">
                    <p>テンプレート</p>
                </div>
            </div>
            )}
        </div>
    );
};

export default MyTemplates;