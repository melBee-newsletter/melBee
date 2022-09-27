import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CSVReader from "./CSVReader";
import { useTranslation } from "react-i18next";
import { contactAPI } from "../api";
import { Event, clickEvent, Props } from "../../../type";

const ContactList: React.FC<Props["portalExpand"]> = ({
  expand,
  setExpand,
}) => {
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

  const handleExpand = (e: clickEvent) => {
    e.preventDefault();
    setExpand({ contact: !expand });
  };

  const { t } = useTranslation();

  useEffect(() => {
    !expand ? setDirection(DOWN) : setDirection(UP);
  }, [expand]);

  useEffect(() => {
    (async function getAllContacts() {
      await contactAPI.get().then((res) => {
        setContactList(res.subscribedContacts);
        setIsChecked(new Array(res.subscribedContacts.length).fill(false));
        setBlackList(res.unsubscribedContacts);
      });
    })();
  }, []);

  const displayEmail = (email: string, i: number) => {
    return (
      <div key={i} className="mr-4 last:mr-0 mb-4">
        <label className="">
          <input
            type="checkbox"
            id={String(i)}
            className="mr-1"
            checked={isChecked[i]}
            onChange={(e: Event) => handleCheck(i)}
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

  const handleAdd = async (e: clickEvent) => {
    e.preventDefault();
    if (email) {
      await contactAPI.addSingle(email).then((addSuccess) => {
        if (addSuccess) {
          setContactList((prevEmail) => [...prevEmail, email]);
          setIsChecked((prevStat) => [...prevStat, false]);
        } else {
          alert(
            t(
              "ご入力されたメールアドレスはすでに連絡先に登録されているか、配信停止となっております。"
            )
          );
        }
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
    const selected = contactList.filter((_, i) => isChecked[i]);
    setSelectedEmail(selected);
  }, [isChecked]);

  const handleRemove = async (e: clickEvent) => {
    e.preventDefault();
    await contactAPI.delete(selectedEmail).then((deleteSuccess) => {
      if (deleteSuccess) {
        const afterRemove = contactList.filter((_, i) => !isChecked[i]);
        setContactList(afterRemove);
        setIsChecked(new Array(afterRemove.length).fill(false));
      } else {
        alert(t("エラーが生じました。再度お試しください。"));
      }
    });
  };

  return (
    <div className="justify-center mb-10 md:px-5 lg:px-10 py-6 border rounded-lg drop-shadow-xl bg-white">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleExpand}
      >
        <h3 className="text-xl font-medium">{t("連絡先一覧")}</h3>
        <span className={direction}>
          <FontAwesomeIcon
            className="bg-yellow-200 rounded-lg p-1.5"
            icon={faArrowRight}
          />
        </span>
      </div>
      {expand && (
        <div className="mt-4">
          <div className="">
            <div className="scroll flex flex-wrap justify-start border rounded-xl p-[0.9rem] mb-[1.2rem]">
              {contactList.map((email, i) => {
                return displayEmail(email, i);
              })}
            </div>
          </div>
          <div className="lg:flex lg:justify-between px-2">
            <div className="text-left">
              <form onSubmit={handleAdd}>
                <label className="text-left mb-2 block">
                  {t("メールアドレスを連絡先に新規登録する")}
                </label>
                <input
                  className="border rounded-lg p-2 mb-2"
                  type="email"
                  value={email}
                  placeholder={t("メールアドレス")}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  disabled={!email}
                  className="rounded-xl px-6 py-2 drop-shadow-xl hover:drop-shadow-none text-lg text-white font-medium bg-orangeGradation ml-2 hoverEffect pushRight"
                >
                  {t("登録")}
                </button>
              </form>
              <div className="mt-3">
                <p className="mb-2">
                  {t("メールアドレス一括登録 (CSVファイル対応)")}
                </p>
                <CSVReader setContactList={setContactList} setIsChecked={setIsChecked} />
                {/* <br /> */}
                <span className="text-sm attention">
                  {t(
                    "※ファイルをアップロードすると、メールアドレスが自動登録されます"
                  )}
                  <br />
                  {t("※メールアドレスは一行目にまとめてください")}
                </span>
              </div>
            </div>

            <div className="">
              {selectedEmail.length > 0 ? (
                <div className="lg:text-right sm:text-left sm:mt-5 lg:mt-0">
                  <p className="text-base mb-2">
                    {t("選択したメールアドレスを削除する")}
                  </p>
                  <button
                    type="submit"
                    onClick={handleRemove}
                    className="rounded-xl px-6 py-2 drop-shadow-xl hover:drop-shadow-none text-lg text-white font-medium bg-redGradation hoverEffect"
                  >
                    {" "}
                    {t("削除")}{" "}
                  </button>
                </div>
              ) : (
                <div className="lg:text-right sm:text-left sm:mt-5 lg:mt-0">
                  <p className="text-base mb-2">
                    {t("メールアドレス選択後削除を行えます")}
                  </p>
                  <button className="bg-grayGradation2 rounded-xl px-6 py-2 drop-shadow-xl text-lg font-medium text-white">
                    {" "}
                    {t("削除")}{" "}
                  </button>
                </div>
              )}
            </div>
          </div>
          {blackList.length > 0 && (
            <div className="mt-10 mb-3">
              <h3 className="text-base text-red-700">{t("配信停止済み")}</h3>
              <div
                className="w-full scroll flex flex-wrap items-baseline border rounded-xl my-3 px-1"
                style={{ height: 150, overflow: "scroll" }}
              >
                {blackList.map((email, i) => {
                  return displayBlackList(email, i);
                })}
              </div>
              <p className="text-sm text-red-800">
                {t("※ 配信停止済みの連絡先にはメールを送信できません")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactList;
