import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponse, AxiosError } from "axios";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";

const Unsubscribe: React.FC = () => {
    const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
    const location = useLocation();
    const splitPath = location.pathname.split("/");
    const USER = splitPath[splitPath.length - 2];
    const CONTACT = splitPath[splitPath.length - 1];

    const [validLink, setValidLink] = useState<string>("");
    const [otherReason, setOtherReason] = useState<string>("");
    const reasonOptions = ["メールが長い（htmlメールなどで重い）から", "配信回数が多いから", "登録したメールアドレスを使わなくなるから", "登録した覚えがないから", "メールの内容に興味が持てなかったから", "メールの情報がもの足りなかったから"]
    const [checked, setChecked] = useState<boolean[]>(new Array(reasonOptions.length).fill(false));
    const [allGivenReasons, setAllGivenReasons] = useState<string[]>([]);

    useEffect(() => {
        //TODO : connect with backend via axios to checks if USER & CONTACT exists & also if their subscription is "true"
        if (USER && CONTACT) {
            setValidLink("unsubscribe");
        }
    }, []);

    const handleCheck = (index: number) => {
        const updateIsChecked = checked.map((stat, i) => index === i ? !stat : stat);
        setChecked(updateIsChecked);
    };

    const handleReason = (e: any) => {
        e.preventDefault();
        setOtherReason(e.target.value);
    };

    useEffect(()=> {
        const isChecked = reasonOptions.filter((res, i) => {
            return (checked[i]);
        });
        setAllGivenReasons(isChecked);
    }, [checked])

    // useEffect(()=> {
    //     allGivenReasons[reasonOptions.length] = otherReason;
    // }, [otherReason])

    const data = {
        receivers: {
          email: ["melbee.noreply@gmail.com"],
        },
        subject: {
          subject: "Notification of unsubscribed contact from melBee",
        },
        message_body: {
          message_body: `${CONTACT} has unsubscribed from your mailing list with the following reason: ${allGivenReasons}.`
        },
    };

    const handleConfirm = (e: any) => {
        e.preventDefault();
        if (otherReason) {
            allGivenReasons.push(otherReason);
        }
        // console.log("Unsubscribe Reason:", allGivenReasons);
        //TODO : Able to add sender's email as part of the email to send the unsubscribed reason of a contact
        axios({
            method: "post",
            url: `${BASE_URL}/email/send`,
            data: data,
        })
        .then((res: AxiosResponse) => {
            // TODO: Show something when successfully sent
            setValidLink("completed");
            console.log(res.data);
        })
        .catch((err: AxiosError<{ error: string }>) => {
            // TODO: Show something when error
            console.log(err.response!.data);
        });
    };


    return (
        <div className="App top">
            <header>
                <Header />
            </header>
            <div>
            {(validLink === "unsubscribe") ? (
                <div style={{width: "80%", margin: "0 auto"}}>
                    <h1 className="text-3xl font-bold pb-5">配信停止</h1>
                    <p>ページ最下部の「配信停止」ボタンを押すと、配信停止処理が完了します。</p>
                    <br />
                    <div className="justify-center">
                    <h5 className="pb-3">よろしければ以下のアンケートにご回答ください。</h5>
                    <form action="" className="text-left justify-center">
                        <div className="bg-slate-300 border-solid border-2 border-slate-400 px-10 py-5">
                        <p>メールを配信停止する理由 （あてはまる項目に、いくつでもチェックしてください）</p>
                        </div>
                        <div className="border-solid border-2 border-slate-400 border-y-0 px-20 py-2">
                            <ul>
                                {reasonOptions.map((reason, i) => {
                                return (
                                <li key={`reason${i}`} className="py-1">
                                    <input type="checkbox" onChange={()=>handleCheck(i)} /><span className="pl-2">{reason}</span>
                                </li>
                                )})}
                            </ul>
                        </div>
                        <div className="bg-slate-300 border-solid border-2 border-slate-400 px-10 py-5">
                            <p>上記以外の理由や詳しい理由 <br />
                                <span className="pl-7">※お問合せ等は、こちらにご記入された場合、お答えできかねますので何卒ご了承ください。</span>
                            </p>
                        </div>
                        <div className="border-solid border-2 border-slate-400 border-t-0 px-20">
                            <input type="form" placeholder="解約理由" onChange={handleReason} style={{width: "100%", height: 100}} value={otherReason} className="my-3 px-10" />
                        </div>
                        <div className="flex justify-center pt-4">
                            <button onClick={handleConfirm} className="bg-violet-300 rounded-lg px-4 py-1">配信停止</button>
                        </div>
                    </form>
                    </div>
                </div>
            )
            : (validLink === "completed") ? (
                <div>
                    <h1>メールマガジンの配信停止を承りました。<br />
                    システムの都合上、データの反映に数日かかることがあり、<br />
                    お手続き後もメールが数件配信される場合がございます。<br />
                    誠に恐れ入りますが、何卒ご了承くださいませ。<br />
                    </h1>
                </div>
            ) 
            : (
                <div>
                    <h1>登録内容の確認が不可能、または受信停止済みになっております。</h1>
                </div>
            )}
            </div>
            
            <footer className="bottom-0">
                <Footer />
            </footer>
        </div>
    );
};

export default Unsubscribe;