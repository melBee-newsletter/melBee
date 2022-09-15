import React, { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  analytics: string;
};

const ReceiverSelect: React.FC<Props> = ({ analytics }) => {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
  const [receivers, setReceivers] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("『melBee』からのお便り");
  const navigate = useNavigate();

  if (!localStorage.getItem("subject")) {
    localStorage.setItem("subject", subject);
  }

  const handleAdd = (e: React.ChangeEvent<any>): void => {
    e.preventDefault();
    setReceivers((prevEmail) => [...prevEmail, email]);
    setEmail("");
  };

  const handleRemove = async (e: React.ChangeEvent<any>): Promise<any> => {
    e.preventDefault();
    let index = Number(e.target.id);
    let left = receivers.slice(0, index);
    let right = receivers.slice(index + 1);
    setReceivers([...left, ...right]);
  };

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
  };

  const displayEmail = (email: string, i: number) => {
    return (
      <div className="bg-gray-200 rounded-lg  mr-3 p-3 flex">
        <p>{email}</p>
        <button type="submit" id={String(i)} onClick={handleRemove}>
          <span className="deleteBtn ml-2"></span>
        </button>
      </div>
    );
  };

  const handleSubject = (subject: string) => {
    setSubject(subject);
    localStorage.setItem("subject", subject);
  };

  return (
    <div className="sendArea">
      <div>
        <h3 className="text-xl mb-6">件名</h3>
        <input
          type="text"
          placeholder="件名"
          onChange={(e) => handleSubject(e.target.value)}
          id="subjectId"
          value={subject}
          className="border-2 rounded-lg p-2 w-fit"
        />
      </div>
      <h3 className="text-xl mb-6">送信先メールアドレスをご入力ください</h3>
      <div className="flex mb-6">
        {receivers.map((email, i) => {
          return displayEmail(email, i);
        })}
      </div>
      <div>
        <form onSubmit={handleAdd}>
          <input
            className="border-2 rounded-lg p-2"
            type="email"
            value={email}
            placeholder="メールアドレス"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-amber-400 rounded-lg p-3 ml-3"> 追加 </button>
        </form>
        <div className="flex justify-center mt-6">
          <p className="bg-neutral-400 rounded-lg mr-3">
            <a href={"/user/edit"} className="p-3 block">
              &lt; 戻る
            </a>
          </p>
          <button
            type="submit"
            onClick={handleSend}
            className="bg-cyan-400 rounded-lg p-3"
          >
            送信 &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiverSelect;
