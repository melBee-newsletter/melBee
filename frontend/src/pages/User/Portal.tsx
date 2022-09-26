import React, { useEffect, useState } from "react";
import MyTemplates from "./components/MyTemplates";
import ContactList from "./components/ContactList";
import SentHistory from "./components/SentHistory";
import MarketingTool from "./components/MarketingTool";
import Loading from "../../components/Loading";
import "../../components/header.css";
import { portalMessage } from "./components/portalMessage";
import { expand, Props } from "../../type";

const Portal: React.FC<Props["portal"]> = ({
  analytics,
  setAnalytics,
  countSent,
  setCountSent,
  sendLimit,
  reachLimit,
}) => {
  const [expand, setExpand] = useState<expand>({
    template: true,
    marketingTool: false,
    contact: false,
    history: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [showLimit, setShowLimit] = useState<boolean>(false);
  const [todayMessage, setTodayMessage] = useState<string>("");

  useEffect(() => {
    const messageIndex = Math.floor(Math.random() * portalMessage.length);
    setTodayMessage(portalMessage[messageIndex]);
    setTimeout(() => {
      setShowLimit(true);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div>
      {loading ? (
        <Loading word={"L O A D I N G"} />
      ) : (
        <div className="portalContent pt-20 mb-40">
          <div className="flex justify-between mb-6">
            <div className="text-left">
              <h2 className="font-bold lg:text-3xl sm:text-[1.6rem]">
                melBeeへようこそ!
              </h2>
              {showLimit && (
                <p className="lg:mt-1 lg:text-lg font-bold">{todayMessage}</p>
              )}
              <div className="mt-2">
                {!showLimit ? (
                  <p className="my-4"> </p>
                ) : !reachLimit ? (
                  <span>
                    本日 <strong>{countSent} 通</strong> 送信されました。残り{" "}
                    <strong>{sendLimit - countSent} 通</strong> 送信できます。
                  </span>
                ) : (
                  <span>
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
            setCountSent={setCountSent}
          />

          <MarketingTool
            expand={expand.marketingTool}
            setExpand={setExpand}
            analytics={analytics}
            setAnalytics={setAnalytics}
          />
        </div>
      )}
    </div>
  );
};

export default Portal;
