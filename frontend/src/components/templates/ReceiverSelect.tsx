import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError }  from 'axios';
import { useNavigate } from 'react-router-dom';

function ReceiverSelect(){
    const BASE_URL = "http://localhost:8000";
    const [receivers, setReceivers] = useState<string []>([]);
    const [email, setEmail] =useState<string>("");
    const [subject, setSubject] = useState<string>("『melBee』からのお便り");
    const navigate = useNavigate();

    if (!localStorage.getItem("subject")) {
        localStorage.setItem("subject", subject);
    };

    const handleAdd = (e: React.ChangeEvent<any>): void => {
            e.preventDefault();
            setReceivers(prevEmail =>[...prevEmail, email]);
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
        "receivers": {
            "email": receivers,
          },
          "subject": {
            "subject": subject,
          },
          "message_body": {
            "message_body": localStorage.melBeeTempStoragedraft,
          }
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
            navigate('/user/sent');
            console.log(res.data);
        })
        .catch((err: AxiosError<{ error: string }>) => {
            // TODO: Show something when error
            alert('エラーが生じました。お宛先のメールアドレス及び件名を今一度ご確認ください。');
            console.log(err.response!.data);
        });
    };
    
    const displayEmail = (email: string, i: number) => {
        return(
            <div className='inline-flex align-middle pr-4 pl-4 m-px text-base'>
                <p >{email}</p>
                <button type="submit" id={String(i)} onClick={handleRemove}>❌</button>
            </div>
        );
    };
    
    const handleSubject = (subject: string) => {
        setSubject(subject);
        localStorage.setItem("subject", subject);
    };
    
    return (
        <div style={{backgroundColor: "yellow"}}>
            <p>送信先のメールアドレスと件名をご入力ください</p>
            <div className='bg-white w-200 h-200 pt-10 pb-10'>
                <div className='bg-gray-300 h-fit w-fit rounded-xl'>
                    {receivers.map((email, i) => {
                        return displayEmail(email, i);
                    })}
                </div>
            </div>
            <div>
                <form onSubmit={handleAdd}>
                <p>メールアドレス</p>
                    <input type="email" value={email} placeholder='メールアドレス' onChange={(e) => setEmail(e.target.value)} />
                    <button> 追加 </button>
                </form>
            </div>
            <div>
                <p>件名</p>
                    <input type="text" placeholder='件名' onChange={(e) => handleSubject(e.target.value)} id='subjectId' value={subject} />
            </div>
            <button type="submit" onClick={handleSend} className="bg-black text-white" >送信</button>
        </div>
    );
};

export default ReceiverSelect;