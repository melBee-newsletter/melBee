import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError }  from "axios";

type history = {
    date_sent: string;
    recipients: string;
    template: string;
}
const SentHistory: React.FC = () => {
    const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
    const DOWN = "rotate-90";
    const UP = "-rotate-90";
    const [expand, setExpand] = useState<boolean>(false);
    const [direction, setDirection] = useState<string>(DOWN);
    const [sentHistory, setSentHistory] = useState<history[]>([]);

    const handleExpand = (e: any) => {
        e.preventDefault();
        setExpand(!expand);
    };

    useEffect(() => {
        !expand ? setDirection(DOWN) : setDirection(UP);
    }, [expand]);

    useEffect(() => {
        axios({
            method: "get",
            url: `${BASE_URL}/user/${sessionStorage.melbeeID}/sent_history`,
        })
        .then((res: AxiosResponse) => {
            let data = res.data;
            data.map((history: history) => {
                setSentHistory((current) => [history, ...current]);
            })
        })
        .catch((err: AxiosError<{ error: string }>) => {
            console.log(err.response!.data);
        });
    }, []);

    const convertDate = (stringDate: string) => {
        const test = new Date(stringDate);
        const year = test.getFullYear();
        const month = test.getMonth();
        const date = test.getDate();
        const hour = test.getHours();
        const min = test.getMinutes();
        return (
            <div>
                <p>{`${year}年 ${month}月 ${date}日 ${hour}:${min}`}</p>
            </div>
        )
    };

    const displayHistory = (history: history) => {
        return (
            <div className="bg-rose-300 m-5">
                <div className="">
                    <p className=""> 送信日時 <span>{convertDate(history.date_sent)}</span> </p>
                    <div className="bg-gray-500 flex my-3 mx-6 flex-wrap p-4 rounded-xl h-max-36 overflow-y-auto">
                        {JSON.parse(history.recipients).map((email: string, i: number) => {
                            return (
                            <div key={`email${i}`} className="bg-gray-200 rounded-lg  mr-3 p-3 flex h-fit text-base my-1">
                                <p>{email}</p>
                            </div>)
                        })}
                    </div>
                </div>
                <div className="block p-5">
                <div
                    dangerouslySetInnerHTML={{
                    __html: history.template,
                    }}
                    className="bg-white"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="bg-neutral-500 my-2">
            <div className="flex justify-between px-10 py-3 text-xl text-white font-bold">
                <h3>送信履歴</h3>
                <button className={direction} onClick={handleExpand}>▷</button>
            </div>
            {(expand) && (
            <div className="flex justify-center">
                <div className="bg-white w-full">
                    {(sentHistory.length > 0) ? (
                        <div className="bg-black mx-5 my-4 p-1 rounded-lg">
                        {sentHistory.map((history, i) => {
                            return (
                                <div key={`history${i}`}>
                                    {displayHistory(history)}
                                </div>
                            )
                        })}
                       </div>
                    ) : (<div>
                        <p className="text-xl my-4">送信履歴はまだございません</p>
                    </div>)}
                   
                </div>
            </div>
            )}
        </div>
    );
};

export default SentHistory;