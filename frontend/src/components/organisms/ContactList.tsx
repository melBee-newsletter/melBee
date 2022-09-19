import React, { useState, useEffect } from "react";

type Props = {
    expand: boolean;
    setExpand: Function;
};

const ContactList: React.FC<Props> = ({ expand, setExpand }) => {
    const DOWN = "rotate-90";
    const UP = "-rotate-90";
    const [direction, setDirection] = useState<string>(DOWN);

    const [contactList, setContactList] = useState<string[]>([]);
    const [blackList, setBlackList] = useState<string[]>([]);
    const [email, setEmail] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean[]>(new Array(contactList.length).fill(false));
    const [selectedEmail, setSelectedEmail] = useState<string[]>([]);

    const handleExpand = (e: any) => {
        e.preventDefault();
        setExpand({contact: !expand});
    };

    useEffect(() => {
        !expand ? setDirection(DOWN) : setDirection(UP);
    }, [expand]);

    const displayEmail = (email: string, i: number) => {
        return (
          <div key={i} className="bg-gray-200 rounded-lg  mr-3 p-3 flex h-fit text-base my-1">
            <input type="checkbox" id={String(i)} className="mr-2" checked={isChecked[i]} onChange={()=>handleCheck(i)} />
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
          setIsChecked((prevStat) => [...prevStat, false]);
          setEmail("");
        };
    };

    const handleCheck = (position: any | void) => {
        const updateIsChecked = isChecked.map((stat, i) => i === position ? !stat : stat);
        setIsChecked(updateIsChecked);
    };
    
    useEffect(() => {
        const selected = contactList.filter((email, i) => {
          return (isChecked[i]);
        });
        setSelectedEmail(selected);
      }, [isChecked]);

    return (
        <div className="bg-neutral-500 hover:bg-neutral-600 my-2">
            <div className="flex justify-between px-10 py-3 text-xl text-white font-bold" onClick={handleExpand}>
                <h3>連絡先一覧</h3>
                <span className={direction}>▷</span>
            </div>
            {(expand) && (
            <div className="flex justify-center">
                <div className="bg-white w-full px-6">
                    <div className="mt-5">
                        <div className="bg-teal-600 flex mb-3 flex-wrap px-4 pt-4 rounded-xl w-full" 
                            style={{height: 300, overflow: "scroll"}}>
                            {contactList.map((email, i) => {
                            return displayEmail(email, i);
                            })}
                        </div>
                    </div>
                    <div className="flex justify-between px-2">
                        <div className="w-96">
                            {(selectedEmail.length > 0) ? 
                            <div className="flex-1 justify-end">
                                <button className="bg-rose-400 rounded-lg p-2 ml-3 px-8 text-lg"> 削除 </button>
                                <p className="text-base">選択したメールアドレスを連絡先から削除する</p>
                            </div> :
                            <div className="flex-1 justify-end">
                            <button className="bg-slate-400 rounded-lg p-2 ml-3 px-8 text-lg text-gray-500"> 削除 </button>
                            <p className="text-base text-gray-300">メールアドレスを選択すると連絡先から削除できます</p>
                            </div> }
                        </div>
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
                            <p className="text-base text-left">メールアドレスを連絡先に新規登録する</p>
                        </div>
                    </div>
                    {(blackList.length > 0) && <div className="my-5">
                        <h3 className="text-base">配信停止済み</h3>
                        <div className="bg-gray-500 flex mb-2 flex-wrap px-4 pt-4 rounded-xl w-full" 
                            style={{height: 150, overflow: "scroll"}}>
                            {blackList.map((email, i) => {
                            return displayEmail(email, i);
                            })}
                        </div>
                        <p className="text-sm text-red-800">※ 配信停止済みの連絡先にはメールを送信できません</p>
                    </div>}
                </div>
            </div>
            )}
        </div>
    );
};

export default ContactList;