import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CSVReader from "./CSVReader";

type Props = {
  expand: boolean;
  setExpand: Function;
};

interface contact {
  email: string;
  id: number;
  is_subscribed: boolean;
}

const ContactList: React.FC<Props> = ({ expand, setExpand }) => {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
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

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/user/${sessionStorage.melbeeID}/contact_list/`,
    })
      .then((res: AxiosResponse) => {
        let data = res.data;
        const notBlackList = data.filter(
          (contact: contact) => contact.is_subscribed
        );
        notBlackList.map((contact: contact) => {
          const email = contact.email;
          setContactList((prevEmail) => [...prevEmail, email]);
          setIsChecked((prevStat) => [...prevStat, false]);
        });
        const blackList = data.filter(
          (contact: contact) => !contact.is_subscribed
        );
        blackList.map((contact: contact) => {
          const email = contact.email;
          setBlackList((prevEmail) => [...prevEmail, email]);
        });
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.response!.data);
      });
  }, []);

  const displayEmail = (email: string, i: number) => {
    return (
      <div key={i} className="flex mr-5 mb-1 p-1">
        <label>
          <input
            type="checkbox"
            id={String(i)}
            className="mr-2"
            checked={isChecked[i]}
            onChange={() => handleCheck(i)}
          />
          {email}
        </label>
      </div>
    );
  };

  const displayBlackList = (email: string, i: number) => {
    return (
      <div key={i} className="flex mr-5 mb-1 p-1">
        <p className="text-red-600">{email}</p>
      </div>
    );
  };

  const handleAdd = (e: React.ChangeEvent<any>): void => {
    e.preventDefault();
    if (email) {
      const data = {
        email: email,
        user_id: sessionStorage.melbeeID,
        is_subscribed: true,
      };
      axios({
        method: "post",
        url: `${BASE_URL}/user/contact_list`,
        data: data,
      })
        .then((res: AxiosResponse) => {
          setContactList((prevEmail) => [...prevEmail, email]);
          setIsChecked((prevStat) => [...prevStat, false]);
        })
        .catch((err: AxiosError<{ error: string }>) => {
          alert(
            "ご入力されたメールアドレスはすでに連絡先に登録されているか、配信停止となっております。"
          );
          console.log(err.response!.data);
        });
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

  const handleRemove = (e: React.ChangeEvent<any>): void => {
    e.preventDefault();
    axios({
      method: "delete",
      url: `${BASE_URL}/user/${sessionStorage.melbeeID}/contact_list`,
      data: selectedEmail,
    })
      .then((res: AxiosResponse) => {
        const afterRemove = contactList.filter((email, i) => !isChecked[i]);
        setContactList(afterRemove);
        setIsChecked(new Array(afterRemove.length).fill(false));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        alert("エラーが生じました。再度お試しください。");
        console.log(err.response!.data);
      });
  };

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
              <div className="w-full scroll flex flex-wrap items-baseline content-start border rounded-xl my-3 px-1">
                {contactList.map((email, i) => {
                  return displayEmail(email, i);
                })}
              </div>
            </div>
            <div className="flex justify-between px-2">
              <div className="text-left">
                <form onSubmit={handleAdd}>
                  <label className="text-left mb-2 block">
                    メールアドレスを連絡先に新規登録する
                  </label>
                  <input
                    className="border rounded-lg p-2 text-base mb-2"
                    type="email"
                    value={email}
                    placeholder="メールアドレス"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: 350 }}
                  />
                  <button
                    disabled={!email}
                    className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation ml-2"
                  >
                    {" "}
                    登録{" "}
                  </button>
                </form>
                <div className="mt-3">
                  <p className="mb-2">
                    メールアドレス一括登録 (CSVファイル対応)
                  </p>
                  <CSVReader setContactList={setContactList} />
                    {/* <br /> */}
                    <span className="text-sm attention">
                      ※ファイルをアップロードすると、メールアドレスが自動登録されます
                      <br />
                      ※メールアドレスは一列目にまとめてください
                    </span>
                </div>
              </div>

              <div className="">
                {selectedEmail.length > 0 ? (
                  <div className="text-right">
                    <p className="text-base mb-2">
                      選択したメールアドレスを削除する
                    </p>
                    <button
                      type="submit"
                      onClick={handleRemove}
                      className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-redGradation"
                    >
                      {" "}
                      削除{" "}
                    </button>
                  </div>
                ) : (
                  <div className="text-right">
                    <p className="text-base mb-2">
                      メールアドレス選択後削除を行えます
                    </p>
                    <button className="bg-grayGradation rounded-xl px-6 py-2 drop-shadow-xl text-lg font-medium text-white">
                      {" "}
                      削除{" "}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {blackList.length > 0 && (
              <div className="mt-10 mb-3">
                <h3 className="text-base text-red-700">配信停止済み</h3>
                <div
                  className="w-full scroll flex flex-wrap items-baseline border rounded-xl my-3 px-1"
                  style={{ height: 150, overflow: "scroll" }}
                >
                  {blackList.map((email, i) => {
                    return displayBlackList(email, i);
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
