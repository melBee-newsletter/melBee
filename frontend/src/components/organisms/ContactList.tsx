import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
  const [isChecked, setIsChecked] = useState<boolean[]>(
    new Array(contactList.length).fill(false)
  );
  const [selectedEmail, setSelectedEmail] = useState<string[]>([]);

  const handleExpand = (e: any) => {
    e.preventDefault();
    setExpand({ contact: !expand });
  };

  useEffect(() => {
    !expand ? setDirection(DOWN) : setDirection(UP);
  }, [expand]);

  const displayEmail = (email: string, i: number) => {
    return (
      <div key={i} className="flex mr-5 mb-2 p-2">
        <input
          type="checkbox"
          id={String(i)}
          className="mr-1"
          checked={isChecked[i]}
          onChange={() => handleCheck(i)}
        />
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
    }
  };

  const handleCheck = (position: any | void) => {
    const updateIsChecked = isChecked.map((stat, i) =>
      i === position ? !stat : stat
    );
    setIsChecked(updateIsChecked);
  };

  useEffect(() => {
    const selected = contactList.filter((email, i) => {
      return isChecked[i];
    });
    setSelectedEmail(selected);
  }, [isChecked]);

  return (
    <div className="justify-center my-2 px-10 py-6 mb-8 border rounded-lg drop-shadow-xl bg-white">
      <div
        className="flex justify-between text-lg font-medium"
        onClick={handleExpand}
      >
        <h3>連絡先一覧</h3>
        <span className={direction}>
          <FontAwesomeIcon
            className="bg-yellow-200 rounded-lg p-1.5"
            icon={faArrowRight}
          />
        </span>
      </div>
      {expand && (
        <div className="">
          <div className="">
            <div className="w-full">
              <div className="w-10/12 scroll flex flex-wrap items-baseline border rounded-r-md mb-5">
                {contactList.map((email, i) => {
                  return displayEmail(email, i);
                })}
              </div>
            </div>
            <div className="flex px-2">
              <div className="text-left  w-7/12">
                <form onSubmit={handleAdd}>
                  <label className="text-left">
                    メールアドレスを連絡先に新規登録する
                  </label>
                  <input
                    className="border rounded-lg p-2 text-base"
                    type="email"
                    value={email}
                    placeholder="メールアドレス"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: 350 }}
                  />
                  <button className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation ml-3">
                    {" "}
                    登録{" "}
                  </button>
                </form>
              </div>
              <div className="">
                {selectedEmail.length > 0 ? (
                  <div className="text-right">
                    <p className="text-base">
                      選択したメールアドレスを連絡先から削除する
                    </p>
                    <button className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-red-500">
                      {" "}
                      削除{" "}
                    </button>
                  </div>
                ) : (
                  <div className="text-right">
                    <p className="">メールアドレス選択後、削除を行えます</p>
                    <button className="bg-slate-400 rounded-xl px-6 py-2 drop-shadow-xl text-lg font-medium text-gray-500">
                      {" "}
                      削除{" "}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {blackList.length > 0 && (
              <div className="my-5">
                <h3 className="text-base">配信停止済み</h3>
                <div
                  className="bg-gray-500 flex mb-2 flex-wrap px-4 pt-4 rounded-xl w-full"
                  style={{ height: 150, overflow: "scroll" }}
                >
                  {blackList.map((email, i) => {
                    return displayEmail(email, i);
                  })}
                </div>
                <p className="text-sm text-red-800">
                  ※ 配信停止済みの連絡先にはメールを送信できません
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
