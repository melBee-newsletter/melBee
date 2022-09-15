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
    const [reason, setReason] = useState<string>("");

    useEffect(() => {
        //TODO : connect with backend via axios to checks if USER & CONTACT exists & also if their subscription is "true"
        if (USER && CONTACT) {
            setValidLink("unsubscribe");
        }
    }, []);

    const handleReason = (e: any) => {
        e.preventDefault();
        setReason(e.target.value);
    };

    const data = {
        receivers: {
          email: ["melbee.noreply@gmail.com"],
        },
        subject: {
          subject: "Notification of unsubscribed contact from melBee",
        },
        message_body: {
          message_body: `${CONTACT} has unsubscribed from your mailing list with the following reason: ${reason}.`
        },
    };

    const handleConfirm = (e: any) => {
        e.preventDefault();
        console.log("Unsubscribe Reason:", reason);
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
        <div>
            <header>
                <Header />
            </header>
            <div>
            {(validLink === "unsubscribe") ? (
                <div>
                    <h1>受信停止</h1>
                    <form action="">
                        <input type="form" placeholder="解約理由" onChange={handleReason}/>
                        <button onClick={handleConfirm}>確定</button>
                    </form>
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
            
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Unsubscribe;