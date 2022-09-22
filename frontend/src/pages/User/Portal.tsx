import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTemplates from "./components/MyTemplates";
import ContactList from "./components/ContactList";
import SentHistory from "./components/SentHistory";
import Profile from "./components/Profile";
import "../../components/header.css";

type Props = {
  analytics: string;
  setAnalytics: Function;
  countSent: number;
  setCountSent: Function;
  reachLimit: boolean;
  sendLimit: number;
};

interface expand {
  profile: boolean;
  contact: boolean;
  template: boolean;
  history: boolean;
  [key: string]: boolean;
}

const Portal: React.FC<Props> = ({
  analytics,
  setAnalytics,
  countSent,
  setCountSent,
  sendLimit,
  reachLimit,
}) => {
  const navigate = useNavigate();
  const [expand, setExpand] = useState<expand>({
    template: true,
    profile: false,
    contact: false,
    history: false,
  });
  const [showLimit, setShowLimit] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShowLimit(true);
    }, 800);
  }, []);

  return (
    <main className="App-header">
      <div className="w-11/12 mx-auto portalContent">
        <div className="flex justify-between mb-6">
          <div className="text-left">
            <h2 className="font-bold text-4xl">
              melBeeへようこそ!
              <br />
              <span className="text-2xl">今日はどんな手紙を書きますか？</span>
            </h2>
            <div className="my-auto">
              {!showLimit ? (
                <p className="my-4"> </p>
              ) : !reachLimit ? (
                <span className="mt-4">
                  本日 <strong>{countSent} 通</strong> 送信されました。残り{" "}
                  <strong>{sendLimit - countSent} 通</strong> 送信できます。
                </span>
              ) : (
                <span className="mt-4">
                  本日の送信リミットに達しましたが、引き続きテンプレート作成はご利用いただけます。
                </span>
              )}
            </div>
          </div>
        </div>

        <MyTemplates expand={expand.template} setExpand={setExpand} />

        <ContactList expand={expand.contact} setExpand={setExpand} />

        <SentHistory
          expand={expand.history}
          setExpand={setExpand}
          countSent={countSent}
          setCountSent={setCountSent}
        />

        <Profile
          expand={expand.profile}
          setExpand={setExpand}
          analytics={analytics}
          setAnalytics={setAnalytics}
        />
      </div>
    </main>
  );
};

export default Portal;
