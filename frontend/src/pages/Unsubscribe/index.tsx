import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { reasonOptions } from "./unsubscribeReasons";
import { validateUserContact, unsubscribeContact, sendUnsubscribeNotification } from "./api"

const Unsubscribe: React.FC = () => {
    const location = useLocation();
    const splitPath = location.pathname.split("/");
    const USER_ID = Number(splitPath[splitPath.length - 2]);
    const RECEIVER_ID = Number(splitPath[splitPath.length - 1]);

    const [validLink, setValidLink] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean[]>(new Array(reasonOptions.length).fill(false));
    const [otherReason, setOtherReason] = useState<string>("");
    const [allGivenReasons, setAllGivenReasons] = useState<string[]>([]);
    const [email, setEmail] = useState<string>("");
    const [unsubscribed, setComplete] = useState<boolean | undefined>(false);

    useEffect(() => {
        (async function checkValidity() {
            const valid = await validateUserContact(USER_ID, RECEIVER_ID)
            setValidLink(valid);
        })();
    }, []);

    const handleCheck = (index: number) => {
        const updateIsChecked = checked.map((stat, i) => index === i ? !stat : stat);
        setChecked(updateIsChecked);
    };
    
    useEffect(()=> {
        const isChecked = reasonOptions.filter((res, i) => (checked[i]));
        setAllGivenReasons(isChecked);
    }, [checked]);

    const handleConfirm = async (e: any) => {
        e.preventDefault();
        if (otherReason) {
            allGivenReasons.push(otherReason);
        }
        const status = await unsubscribeContact(USER_ID, RECEIVER_ID, email);
        setComplete(status);
    };

    useEffect(() => {
        if (unsubscribed) sendUnsubscribeNotification(email, allGivenReasons);
    }, [unsubscribed]);

    return (
        <div>
            <header>
                <Header />
            </header>
            <div className="h-screen w-full pt-36 px-52">
            {(validLink && !unsubscribed) && (
                <div className="w-full">
                    <h1 className="text-3xl font-bold pb-5 text-center">配信停止</h1>
                    <p className="text-base font-bold text-center">ページ最下部にメールアドレスを入力して「配信停止」ボタンを押すと、配信停止処理が完了します。</p>
                    <br/>
                    <div className="justify-center">
                    <h5 className="pb-3 text-center">よろしければ以下のアンケートにご回答ください。</h5>
                    <form action="" className="text-left justify-center">
                        <div className="bg-grayGradation border-solid border-2 border-slate-400 px-10 py-5 rounded-2xl mt-2">
                        <p><strong>メールを配信停止する理由</strong> （あてはまる項目に、いくつでもチェックしてください）</p>
                        </div>
                        <div className="px-20 py-2">
                            <ul>
                                {reasonOptions.map((reason, i) => {
                                return (
                                <li key={`reason${i}`} className="py-1">
                                    <input type="checkbox" onChange={()=>handleCheck(i)} /><span className="pl-2">{reason}</span>
                                </li>
                                )})}
                            </ul>
                        </div>
                        <div className="bg-grayGradation border-solid border-2 border-slate-400 px-10 py-5 rounded-2xl mt-4">
                            <p><strong>上記以外の理由や詳しい理由</strong> <br />
                                <span className="text-sm pl-7 attention">※お問合せ等は、こちらにご記入された場合、お答えできかねますので何卒ご了承ください。</span>
                            </p>
                        </div>
                        <div className=" border-slate-400 px-20">
                            <input type="form" placeholder="解約理由" onChange={(e)=>setOtherReason(e.target.value)} value={otherReason} className="w-full h-36 my-3 px-10 border-2 border-gray-200 rounded-xl" />
                        </div>
                        <div className="flex justify-center">
                            <div>
                                <input
                                    type="email"
                                    name=""
                                    value={email}
                                    className="inputArea bg-gray-100 border-gray rounded-lg w-72 mr-8"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="メールアドレス"
                                    id="email_signup"
                                />
                                {(email) ? <button onClick={handleConfirm} className="rounded-xl px-5 py-3 drop-shadow-xl text-lg text-white font-bold bg-blueGradation mt-5 w-36">配信停止</button> :
                                <button className="grayscale rounded-xl px-5 py-3 drop-shadow-xl text-lg text-white font-bold bg-blueGradation mt-5 w-36" disabled={true}>配信停止</button>}
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            )}
            {unsubscribed && (
                <div className="flex justify-center text-2xl py-24">
                    <h1 className="text-center leading-loose">メールマガジンの配信停止を承りました。<br />
                    システムの都合上、データの反映に数日かかることがあり、<br />
                    お手続き後もメールが数件配信される場合がございます。<br />
                    誠に恐れ入りますが、何卒ご了承くださいませ。<br />
                    </h1>
                </div>
            )} 
            {(!unsubscribed && !validLink) && (
                <div className="h-full w-full flex justify-center items-center text-center text-2xl leading-loose">
                    <h1>登録内容の確認ができませんでした。<br/>
                    お客様のメールは登録解除されているかすでに受信停止済みになっております。</h1>
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