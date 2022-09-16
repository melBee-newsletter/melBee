import React, { useState, useEffect } from "react";

const ContactList: React.FC = () => {
    const DOWN = "rotate-90";
    const UP = "-rotate-90";
    const [expand, setExpand] = useState<boolean>(false);
    const [direction, setDirection] = useState<string>(DOWN);

    const [contactList, setContactList] = useState<string[]>([]);
    const [blackList, setBlackList] = useState<string[]>([]);
    const [email, setEmail] = useState<string>("");

    const handleExpand = (e: any) => {
        e.preventDefault();
        setExpand(!expand);
    };

    useEffect(() => {
        !expand ? setDirection(DOWN) : setDirection(UP);
    }, [expand]);

    const displayEmail = (email: string, i: number) => {
        return (
          <div key={i} className="bg-gray-200 rounded-lg  mr-3 p-3 flex h-fit text-base my-1">
            <input type="checkbox" id={String(i)} className="mr-2" />
            <p>{email}</p>
          </div>
        );
    };

    const handleAdd = (e: React.ChangeEvent<any>): void => {
        e.preventDefault();
        if (email) {
          //TODO: send the email to database to check it is NOT duplicated, 
          // >> and if it's NOT duplicated, add to database.
          // >> if duplicated, popup error message to let user know.
          setContactList((prevEmail) => [...prevEmail, email]);
          setEmail("");
        };
    };

    return (
        <div className="bg-orange-200">
            <div className="flex justify-between px-10 py-3 text-xl">
                <h3>連絡先一覧</h3>
                <button className={direction} onClick={handleExpand}>▷</button>
            </div>
            {(expand) && (
            <div className="flex justify-center">
                <div className="bg-white w-full">
                    <div className="mt-5">
                        {/* <h3>一覧</h3> */}
                        <div className="bg-teal-600 flex mb-6 flex-wrap px-4 pt-4 rounded-xl" 
                            style={{width: 1200, margin: "0 auto", height: 300, overflow: "scroll"}}>
                            {contactList.map((email, i) => {
                            return displayEmail(email, i);
                            })}
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <div>
                            <form onSubmit={handleAdd}>
                            <input
                                className="border-2 rounded-lg p-2 text-base"
                                type="email"
                                value={email}
                                placeholder="メールアドレス"
                                onChange={(e) => setEmail(e.target.value)}
                                style={{width: 350}}
                                />
                            <button className="bg-amber-400 rounded-lg p-2 ml-3 text-lg w-28"> 登録 </button>
                            </form>
                            <p className="text-base">連絡先のメールアドレスを新規登録する</p>
                        </div>
                    <div>
                        <button className="bg-rose-400 rounded-lg p-2 ml-3 text-lg w-28"> 削除 </button>
                        <p className="text-base">選択したメールアドレスを連絡先から削除する</p>
                    </div>
                    </div>    
                    <div className="my-5">
                        <h3 className="text-base">配信停止済み</h3>
                        <div className="bg-gray-500 flex mb-6 flex-wrap px-4 pt-4 rounded-xl" 
                            style={{width: 1200, margin: "0 auto", height: 150, overflow: "scroll"}}>
                            {blackList.map((email, i) => {
                            return displayEmail(email, i);
                            })}
                        </div>
                        <p className="text-sm text-red-800">※ 配信停止済みの連絡先にはメールを送信できません</p>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default ContactList;