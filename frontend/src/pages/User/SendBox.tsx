import React, { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import Loading from "../../components/Loading";
import SendComplete from "./components/SendComplete";
import { useNavigate } from "react-router-dom";

type Props = {
  analytics: string;
  reachLimit: boolean;
  setCountSent: Function;
};

interface contact {
  email: string;
  id: number;
  is_subscribed: boolean;
};

type history = {
  date_sent: string;
  recipients: string;
  template: string;
  subject: string;
};

const SendBox: React.FC<Props> = ({ analytics, reachLimit, setCountSent }) => {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
  const navigate = useNavigate();
  const [subject, setSubject] = useState<string>("『melBee』からのお便り");
  const [allEmails, setAllEmails] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [receivers, setReceivers] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean[]>(new Array(allEmails.length).fill(false));
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [updateReceiver, setUpdateReceiver] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [sendComplete, setSendComplete] = useState<boolean>(false);

  let TEMPLATE = localStorage.melBeeTempStoragedraft
  const DATE = new Date();
  
  useEffect(() => {
    if (analytics) TEMPLATE += `<img src=https://www.google-analytics.com/collect?v=1&tid=${analytics}&cid=555&t=event&ec=emails&ea=open&dt=testemail>`;
    axios({
      method: "get",
      url: `${BASE_URL}/user/${sessionStorage.melbeeID}/contact_list`,
    })
    .then((res: AxiosResponse) => {
      let data = res.data;
      const notBlackList = data.filter((contact: contact) => contact.is_subscribed);
      notBlackList.map((contact: contact) => {
        const email = contact.email;
        setAllEmails((prevEmail) => [...prevEmail, email]);
        setIsChecked((prevStat) => [...prevStat, false]);
      });
    })
    .catch((err: AxiosError<{ error: string }>) => {
      console.log(err.response!.data);
    });
  }, []);

  if (!localStorage.getItem("subject")) {
    localStorage.setItem("subject", subject);
  }

  const handleSubject = (subject: string) => {
    setSubject(subject);
    localStorage.setItem("subject", subject);
  };
  
  const handleCheck = (position: any | void) => {
    const updateIsChecked = isChecked.map((stat, i) => i === position ? !stat : stat);
    setIsChecked(updateIsChecked);
    setUpdateReceiver(!updateReceiver);
  };

  const handleCheckAll = (e: React.ChangeEvent<any>): void => {
    setSelectAll(!selectAll);
    const updateIsChecked = isChecked.fill(!selectAll);
    setIsChecked(updateIsChecked);
    setUpdateReceiver(!updateReceiver);
  };

  const handleAdd = (e: React.ChangeEvent<any>): void => {
    e.preventDefault();
    if (email) {
      const data = {
        email: email,
        user_id: sessionStorage.melbeeID,
        is_subscribed: true,
      }
      axios({
        method: "post",
        url: `${BASE_URL}/user/contact_list`,
        data: data,
      })
      .then((res: AxiosResponse) => {
        setAllEmails((prevEmail) => [...prevEmail, email]);
        setIsChecked((prevStat) => [...prevStat, true]);
        setUpdateReceiver(!updateReceiver);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        alert("ご入力されたメールアドレスはすでに連絡先に登録されているか、配信停止となっております。");
        console.log(err.response!.data);
      });      
      setEmail("");
    };
  };

  const displayEmailWithCheckbox = (email: string, i: number) => {
    return (
      <div key={i} className="flex rounded-lg mr-3 px-3 py-1 h-fit text-base my-1">
        <input type="checkbox" id={String(i)} checked={isChecked[i]} onChange={()=>handleCheck(i)} className="mr-2" />
        <p>{email}</p>
      </div>
    );
  };

  useEffect(() => {
    const selectedEmails = allEmails.filter((email, i) => {
      return (isChecked[i]);
    });
    setReceivers(selectedEmails);
  }, [updateReceiver]);

  const handleSend = (e: React.ChangeEvent<any>): void => {
    e.preventDefault();
    const data = {
      email: receivers,
      subject: subject,
      message_body: TEMPLATE,
      user_id: sessionStorage.melbeeID,
    };
    if (receivers.length > 0) {
      setLoading(true);
      axios({
        method: "post",
        url: `${BASE_URL}/email/send`,
        data: data,
      })
      .then((res: AxiosResponse) => {
        setSendComplete(true);
        setLoading(false);
        axios({
          method: "post",
          url: `${BASE_URL}/user/${sessionStorage.melbeeID}/sent_history`,
          data: {
            recipients: JSON.stringify(receivers),
            template: TEMPLATE,
            date_sent: DATE.toString(),
            user_id: sessionStorage.melbeeID,
            subject: subject
          }
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.log(err.response!.data);
        });
      }).then(() => {
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
            setCountSent(newCountSent += 1);
          }
        };
    
        axios({
          method: "get",
          url: `${BASE_URL}/user/${sessionStorage.melbeeID}/sent_history`,
        })
          .then((res: AxiosResponse) => {
            let data = res.data;
            data.map((history: history) => {
              checkSentDate(history.date_sent);
            });
          })
          .catch((err: AxiosError<{ error: string }>) => {
            console.log(err.response!.data);
          });
      })
      .catch((err: AxiosError<{ error: string }>) => {
        alert(
          "エラーが生じました。お宛先のメールアドレス及び件名を今一度ご確認ください。"
        );
        console.log(err.response!.data);
      });
    } else {
      alert("送信先を選択してください");
    }
  };

  return (
    <>
    {loading && <Loading word={"S E N D I N G"} />}
    {sendComplete && <SendComplete reachLimit={reachLimit} setSendComplete={setSendComplete} />}
    {reachLimit && !sendComplete && 
      (<div className="flex justify-center">
        <h3>申し訳ございません、本日の送信リミットに達しました。</h3>
      </div>)}
    {!reachLimit && !sendComplete &&
      <div className="sendArea">
        <div className="flex items-center justify-start pl-6">
          <h3 className="text-xl mr-3">件名 :</h3>
          <input
            type="text"
            placeholder="件名"
            onChange={(e) => handleSubject(e.target.value)}
            id="subjectId"
            value={subject}
            className="border rounded-lg p-2 text-lg"
            style={{width: 800}}
          />
        </div>
        <h3 className="text-xl mt-6 mb-2">送信先メールアドレスをお選びください</h3>
        <div className="w-full scroll flex flex-wrap content-start border items-start rounded-xl my-3 px-3 py-1" 
          style={{height: 300}}>
          {allEmails.map((email, i) => {
            return displayEmailWithCheckbox(email, i);
          })}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex ml-10 text-xl">
            <input type="checkbox" onChange={handleCheckAll} disabled={!allEmails.length} />
              {!selectAll ? <p className="text-base ml-2">すべて選択</p> : <p className="text-base ml-2">すべて解除</p> }
          </div>
      
          <div className="pr-10">
            <form onSubmit={handleAdd}>
              <input
              className="border rounded-lg p-2 text-base"
              type="email"
              value={email}
              placeholder="メールアドレス"
              onChange={(e) => setEmail(e.target.value)}
              style={{width: 350}}
              />
              <button className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation ml-3 w-28"> 追加 </button>
            </form>
          </div>    
        </div>
        <div className="flex justify-end mt-6 text-lg pr-10">
          <button 
            onClick={(e) => {
              e.preventDefault();
              navigate("/user/preview")
            }}
            className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-grayGradation ml-3 w-28">
            戻る
          </button>
          <button
            type="submit"
            onClick={handleSend}
            className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation ml-3 w-36">
            送信
          </button>
        </div>
      </div>}
    </>
  );
};

export default SendBox;
