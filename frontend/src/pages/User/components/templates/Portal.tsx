import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../organisms/Profile";
import ContactList from "../organisms/ContactList";
import MyTemplates from "../organisms/MyTemplates";
import SentHistory from "../organisms/SentHistory";
import "../../../../components/organisms/header.css";

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

  return (
    // <div className="px-10 w-screen h-screen pt-5">
    <main className="App-header">
    <div className="w-11/12 mx-auto portalContent">
      <div className="flex justify-between mb-6">
        <div className="text-left">
          <h2 className="font-bold text-3xl">
            melBeeへようこそ!
            <br />
            <span className="text-xl">今日はどんな手紙を書きますか？</span>
          </h2>
          {!reachLimit ? (
            <p className="mt-4">
              本日 <strong>{countSent} 通</strong> 送信されました。残り{" "}
              <strong>{sendLimit - countSent} 通</strong> 送信できます。
            </p>
          ) : (
            <p className="mt-4">
              本日の送信リミットに達しましたが、引き続きテンプレート作成はご利用いただけます。
            </p>
          )}
        </div>
      </div>

      <MyTemplates expand={expand.template} setExpand={setExpand} />

      <Profile
        analytics={analytics}
        setAnalytics={setAnalytics}
        expand={expand.profile}
        setExpand={setExpand}
      />

      <ContactList expand={expand.contact} setExpand={setExpand} />

      <SentHistory
        expand={expand.history}
        setExpand={setExpand}
        countSent={countSent}
        setCountSent={setCountSent}
      />
    </div>
    </main>
  );
};

export default Portal;
