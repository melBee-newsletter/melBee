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
    const [viewHistory, setViewHistory] = useState<boolean[]>(new Array(sentHistory.length).fill(false));

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
                setViewHistory((prevStat) => [...prevStat, false]);
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
                <p>{`${year}年${month}月${date}日 ${hour}時${min}分`}</p>
            </div>
        )
    };

    const handleView = (position: number) => {
        const updateView = viewHistory.map((stat, i) => i === position ? !stat : stat);
        setViewHistory(updateView);
    };

    const handleClose = (position: number) => {
        const updateView = viewHistory.map((stat, i) => i === position ? !stat : stat);
        setViewHistory(updateView);
        console.log("YAHOO", viewHistory)
    };

    const displayHistory = (history: history, i: number) => {
        return (
            <div>
                {!viewHistory[i] ? 
                <div className="flex justify-start bg-sky-800 m-5 rounded-xl py-3 pl-5">
                    <div className="flex justify-end items-center mr-5"> 
                        <h3 className="pr-5 text-lg text-white font-bold">送信日時 :</h3> 
                        <div className="bg-white rounded-lg py-1 px-4 text-left">{convertDate(history.date_sent)}
                        </div>
                    </div>
                    <div className="flex justify-end items-center mr-5">
                        <h3 className="pr-5 text-lg text-white font-bold">件名 :</h3>
                        <div className="bg-white rounded-lg py-1 px-4 text-left">『melBee』からのお便り
                        </div>
                    </div>
                    <button onClick={()=>handleView(i)} className="bg-yellow-400 rounded-xl px-3 ml-auto mr-10">詳細を見る</button>
                </div> :
                <div className="flex1 justify-center bg-sky-800 m-5 rounded-xl">
                    <div className="grid grid-cols-2 p-6 h-full w-full">
                        <div className="pl-3">
                            <div className="flex justify-end items-center mb-3 mr-5"> 
                                <h3 className="pr-5 text-lg text-white font-bold">送信日時 :</h3> 
                                <div className="bg-white rounded-lg py-1 px-4 text-left w-5/6">{convertDate(history.date_sent)}
                                </div>
                            </div>
                            <div className="flex justify-end items-center mb-3 mr-5">
                                <h3 className="pr-5 text-lg text-white font-bold">件名 :</h3>
                                <div className="bg-white rounded-lg py-1 px-4 text-left w-5/6">『melBee』からのお便り
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="pr-5 text-left text-lg ml-9 text-white font-bold">送信先 :</h3>
                            <div className="bg-gray-500 flex my-3 mr-5 flex-wrap p-4 rounded-xl h-max-36 overflow-y-auto">
                                {JSON.parse(history.recipients).map((email: string, i: number) => {
                                    return (
                                <div key={`email${i}`} className="bg-gray-200 rounded-lg  mr-3 p-3 flex h-fit text-base my-1">
                                    <p>{email}</p>
                                </div>)
                                    })}
                            </div>
                            </div>
                        </div>
                        <div className="w-full px-2 py-3 " style={{height: 600}}>
                            <div className="h-full overflow-y-scroll bg-white border-solid border-8 border-yellow-400">
                                <div
                                dangerouslySetInnerHTML={{
                                __html: history.template,
                                }}
                                className="block w-full"
                                />
                            </div> 
                        </div>
                        <div className="flex justify-center w-full">
                            <button onClick={()=>handleClose(i)} className="bg-red-400 rounded-xl px-3 mx-auto">閉じる</button>
                        </div>
                    </div>
                </div>
                }
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
                                    {displayHistory(history, i)}
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