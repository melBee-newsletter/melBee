import React from "react";

type Props = {
    history: {
        date_sent: string;
        recipients: string;
        template: string;
    };
    i: number;
    viewHistory: boolean[];
    setViewHistory: Function;
}

const History: React.FC<Props> = ({ history, i, viewHistory, setViewHistory }) => {
    const convertDate = (stringDate: string) => {
        const test = new Date(stringDate);
        const year = test.getFullYear();
        const month = test.getMonth()+1;
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
    };

    return (
        <div key={`history${i}`} >
            {!viewHistory[i] ? 
            <div className="flex justify-start bg-sky-800 m-5 rounded-xl py-3 pl-5">
                <div className="flex justify-end items-center mr-5"> 
                    <h3 className="pr-5 text-lg text-white font-bold">送信日時 :</h3> 
                    <div className="bg-white rounded-lg py-1 px-4 text-xl text-left">{convertDate(history.date_sent)}
                    </div>
                </div>
                <div className="flex justify-end items-center mr-5">
                    <h3 className="pr-5 text-lg text-white font-bold">件名 :</h3>
                    <div className="bg-white rounded-lg py-1 px-4 text-xl text-left">『melBee』からのお便り
                    </div>
                </div>
                <button onClick={()=>handleView(i)} className="bg-yellow-400 rounded-xl px-3 ml-auto mr-10 text-xl">詳細を見る</button>
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

export default History;