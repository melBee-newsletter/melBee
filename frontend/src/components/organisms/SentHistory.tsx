import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError }  from "axios";
import History from "../molecules/History"

type history = {
    date_sent: string;
    recipients: string;
    template: string;
};

type Props = {
    expand: boolean;
    setExpand: Function;
};

const SentHistory: React.FC<Props> = ({ expand, setExpand }) => {
    const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
    const DOWN = "rotate-90";
    const UP = "-rotate-90";
    const [direction, setDirection] = useState<string>(DOWN);
    const [sentHistory, setSentHistory] = useState<history[]>([]);
    const [viewHistory, setViewHistory] = useState<boolean[]>(new Array(sentHistory.length).fill(false));

    const handleExpand = (e: any) => {
        e.preventDefault();
        setExpand({history: !expand});
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
                setViewHistory((prevStat) => [...prevStat, false]);
            })
        })
        .catch((err: AxiosError<{ error: string }>) => {
            console.log(err.response!.data);
        });
    }, []);

    return (
        <div className="bg-neutral-500 hover:bg-neutral-600 my-2">
            <div className="flex justify-between px-10 py-3 text-xl text-white font-bold" onClick={handleExpand}>
                <h3>送信履歴</h3>
                <span className={direction}>▷</span>
            </div>
            {(expand) && (
            <div className="flex justify-center">
                <div className="bg-white w-full">
                    {(sentHistory.length > 0) ? (
                        <div className="bg-green-600 mx-5 my-4 p-1 py-4 rounded-lg">
                        {sentHistory.map((history, i) => {
                            return (
                                <div key={`history${i}`}>
                                    {<History history={history} i={i} viewHistory={viewHistory} setViewHistory={setViewHistory} />}
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