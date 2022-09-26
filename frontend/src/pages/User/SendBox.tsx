import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import SendComplete from "./components/SendComplete";
import { useNavigate } from "react-router-dom";
import "./sendbox.css";
import { contactAPI, emailAPI, sentHistoryAPI } from "./api";
import { clickEvent, Props } from "../../type";
import { useTranslation } from "react-i18next";

const SendBox: React.FC<Props["send"]> = ({
  analytics,
  reachLimit,
  setCountSent,
}) => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<string>("『melBee』からのお便り");
  const [allEmails, setAllEmails] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [receivers, setReceivers] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean[]>(
    new Array(allEmails.length).fill(false)
  );
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [updateReceiver, setUpdateReceiver] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [sendComplete, setSendComplete] = useState<boolean>(false);
  const { t } = useTranslation();
  let TEMPLATE = localStorage.melBeeTempStoragedraft;
  const DATE = new Date();

  useEffect(() => {
    if (analytics)
      TEMPLATE += `<img src=https://www.google-analytics.com/collect?v=1&tid=${analytics}&cid=555&t=event&ec=emails&ea=open&dt=testemail>`;
    (async function getAllContacts() {
      await contactAPI.get().then((res) => {
        setAllEmails(res.subscribedContacts);
        setIsChecked(new Array(res.subscribedContacts.length).fill(false));
      });
    })();
    if (!localStorage.getItem("subject")) {
      localStorage.setItem("subject", subject);
    }
  }, []);

  const handleSubject = (subject: string) => {
    setSubject(subject);
    localStorage.setItem("subject", subject);
  };

  const handleCheck = (position: any | void) => {
    const updateIsChecked = isChecked.map((stat, i) =>
      i === position ? !stat : stat
    );
    setIsChecked(updateIsChecked);
    setUpdateReceiver(!updateReceiver);
  };

  const handleCheckAll = (e: clickEvent) => {
    setSelectAll(!selectAll);
    const updateIsChecked = isChecked.fill(!selectAll);
    setIsChecked(updateIsChecked);
    setUpdateReceiver(!updateReceiver);
  };

  const handleAdd = async (e: clickEvent) => {
    e.preventDefault();
    if (email) {
      await contactAPI.addSingle(email).then((addSuccess) => {
        if (addSuccess) {
          setAllEmails((prevEmail) => [...prevEmail, email]);
          setIsChecked((prevStat) => [...prevStat, false]);
          setUpdateReceiver(!updateReceiver);
        } else {
          alert(
            "ご入力されたメールアドレスはすでに連絡先に登録されているか、配信停止となっております。"
          );
        }
      });
      setEmail("");
    }
  };

  const displayEmailWithCheckbox = (email: string, i: number) => {
    return (
      <div
        key={i}
        className="flex rounded-lg mr-3 px-3 py-1 h-fit text-base my-1"
      >
        <input
          type="checkbox"
          id={String(i)}
          checked={isChecked[i]}
          onChange={() => handleCheck(i)}
          className="mr-2"
        />
        <p>{email}</p>
      </div>
    );
  };

  useEffect(() => {
    const selectedEmails = allEmails.filter((email, i) => {
      return isChecked[i];
    });
    setReceivers(selectedEmails);
  }, [updateReceiver]);

  const handleSend = async (e: clickEvent) => {
    e.preventDefault();
    const emailBody = {
      email: receivers,
      subject: subject,
      message_body: TEMPLATE,
      user_id: sessionStorage.melbeeID,
    };
    if (receivers.length > 0) {
      setLoading(true);
      await emailAPI
        .send(emailBody)
        .then((sendComplete) => {
          setSendComplete(sendComplete);
          setLoading(!sendComplete);
        })
        .then(async () => {
          const sentHistory = {
            subject: subject,
            recipients: receivers.toString(),
            template: TEMPLATE,
            date_sent: DATE.toString(),
            user_id: sessionStorage.melbeeID,
          };
          await sentHistoryAPI.save(sentHistory);
        })
        .then(async () => {
          const sentHistory = await sentHistoryAPI.get();
          const TODAY = {
            year: DATE.getFullYear(),
            month: DATE.getMonth() + 1,
            day: DATE.getDay(),
          };

          let newCountSent = 0;

          const checkSentDate = (stringDate: string) => {
            const sentDate = new Date(stringDate);
            if (
              sentDate.getFullYear() === TODAY.year &&
              sentDate.getMonth() + 1 === TODAY.month &&
              sentDate.getDay() === TODAY.day
            ) {
              setCountSent((newCountSent += 1));
            }
          };
          for (let i = 0; i < sentHistory.length; i++) {
            checkSentDate(sentHistory[i].date_sent);
          }
        });
    } else {
      alert("送信先を選択してください");
    }
  };

  return (
    <div>
      {loading ? (
        <Loading word={"S E N D I N G"} />
      ) : (
        <div>
          {sendComplete && (
            <SendComplete
              reachLimit={reachLimit}
              setSendComplete={setSendComplete}
            />
          )}
          {reachLimit && !sendComplete && (
            <div className="flex justify-center">
              <p>{t("申し訳ございません、本日の送信リミットに達しました。")}</p>
            </div>
          )}
          {!reachLimit && !sendComplete && (
            <div className="sendArea pt-24 mx-auto mb-28">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-1">
                  {t("メールタイトルのご入力")}
                </h2>
                <p className="mb-5">
                  {t("送信するメールのタイトルをご入力ください。")}
                </p>
                <input
                  type="text"
                  placeholder={t("メールタイトルの入力をしてください。")}
                  onChange={(e) => handleSubject(e.target.value)}
                  id="subjectId"
                  value={subject}
                  className="border rounded-lg p-2 text-lg sendTitle w-full"
                />
              </div>
              <h2 className="text-xl font-bold mb-1">{t("メールアドレスの選択")}</h2>
              <p className="mb-4">{t("送信先メールアドレスを選択してください。")}</p>
              <div className="flex text-xl pl-6">
                <input
                  type="checkbox"
                  onChange={handleCheckAll}
                  disabled={!allEmails.length}
                />
                {!selectAll ? (
                  <p className="text-base ml-2">{t("アドレスを全て選択")}</p>
                ) : (
                  <p className="text-base ml-2">{t("アドレスを全て解除")}</p>
                )}
              </div>
              <div className="scroll flex flex-wrap border items-start rounded-xl mt-2 mb-4 px-3 py-1 bg-white">
                {allEmails.map((email, i) => {
                  return displayEmailWithCheckbox(email, i);
                })}
              </div>
              <div className="mb-8">
                <div>
                  <p className="mb-2 text-left">
                    {t("メールアドレスを新規登録したい方は、こちらからご入力いただけます。")}
                  </p>
                  <div className="text-left">
                    <form onSubmit={handleAdd}>
                      <input
                        className="border rounded-lg p-2 text-base w-3/6"
                        type="email"
                        value={email}
                        placeholder={t("新規メールアドレスの登録はこちらから")}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation ml-2 w-28">
                        {" "}
                        {t("追加")}{" "}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/user/preview");
                  }}
                  className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-grayGradation"
                >
                  &lt; {t("プレビュー")}
                </button>
                <button
                  type="submit"
                  onClick={handleSend}
                  className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation ml-6 w-28"
                >
                  {t("送信")}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SendBox;
