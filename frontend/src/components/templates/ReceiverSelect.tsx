import React, { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  analytics: string;
};

const ReceiverSelect: React.FC<Props> = ({ analytics }) => {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
  const navigate = useNavigate();

  const [subject, setSubject] = useState<string>("『melBee』からのお便り");
  const [allEmails, setAllEmails] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [receivers, setReceivers] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean[]>(new Array(allEmails.length).fill(false));
  const [selectAll, setSelectAll] = useState<boolean>(false);

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
  };

  const handleCheckAll = (e: React.ChangeEvent<any>): void => {
    setSelectAll(!selectAll);
    const updateIsChecked = isChecked.fill(!selectAll);
    setIsChecked(updateIsChecked);
  };

  const handleAdd = (e: React.ChangeEvent<any>): void => {
    e.preventDefault();
    //TODO: send the email to database to check it is NOT duplicated, 
    // >> and if it's NOT duplicated, add to database.
    // >> if duplicated, popup error message to let user know.
    setAllEmails((prevEmail) => [...prevEmail, email]);
    setIsChecked((prevStat) => [...prevStat, true]);
    setEmail("");
  };

  const displayEmailWithCheckbox = (email: string, i: number) => {
    return (
      <div key={i} className="bg-gray-200 rounded-lg  mr-3 p-3 flex h-fit text-base my-1">
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
  }, [isChecked]);

  const data = {
    receivers: {
      email: receivers,
    },
    subject: {
      subject: subject,
    },
    message_body: {
      message_body:
        (localStorage.melBeeTempStoragedraft += `<img src=https://www.google-analytics.com/collect?v=1&tid=${analytics}&cid=555&t=event&ec=emails&ea=open&dt=testemail>`),
    },
  };

  const handleSend = (e: React.ChangeEvent<any>): void => {
    e.preventDefault();
    if (receivers.length > 0) {
      axios({
        method: "post",
        url: `${BASE_URL}/email/send`,
        data: data,
      })
      .then((res: AxiosResponse) => {
        // TODO: Show something when successfully sent
        navigate("/user/sent");
        console.log(res.data);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        // TODO: Show something when error
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
    <div className="sendArea">
      <div className="flex items-center justify-center">
        <h3 className="text-xl mr-3">件名 :</h3>
        <input
          type="text"
          placeholder="件名"
          onChange={(e) => handleSubject(e.target.value)}
          id="subjectId"
          value={subject}
          className="border-2 rounded-lg p-2 w-fit text-lg"
          style={{width: 800}}
        />
      </div>
      <h3 className="text-xl mt-6 mb-2">送信先メールアドレスをお選びください</h3>
      <div className="bg-teal-600 flex mb-6 flex-wrap px-4 pt-4 rounded-xl" 
        style={{width: 1200, margin: "0 auto", height: 300, overflow: "scroll"}}>
        {allEmails.map((email, i) => {
          return displayEmailWithCheckbox(email, i);
        })}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex ml-10 text-xl">
          <input type="checkbox" onChange={handleCheckAll} />
          <p className="ml-2">全て選択</p>
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
          <button className="bg-amber-400 rounded-lg p-2 ml-3 text-lg w-28"> 追加 </button>
        </form>
      </div>    
    </div>
    <div className="flex justify-end mt-6 text-lg">
      <p className="bg-neutral-400 rounded-lg mr-5">
        <a href={"/user/edit"} className="p-3 block w-20">
          戻る
        </a>
      </p>
      <button
        type="submit"
        onClick={handleSend}
        className="bg-cyan-400 rounded-lg p-3 w-36">
        送信
      </button>
      </div>
    </div>
  );
};

export default ReceiverSelect;
