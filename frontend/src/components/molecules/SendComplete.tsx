import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../atoms/logo.png";

type Props = {
  reachLimit: boolean;
  setSendComplete: Function;
};

const SendComplete: React.FC<Props> = ({ reachLimit, setSendComplete }) => {
  return (
    <>
      <div className="flex justify-center">
        <div>
          <img src={headerLogo} alt="melbee-logo" className="py-2" width="200" />
          <h3>送信完了しました</h3>
          <br />
        </div>
      </div>
      {!reachLimit ? <div className="flex justify-around">
        <div>
          <button className="bg-sky-400 text-white rounded px-4 mr-5" onClick={()=>setSendComplete(false)}>宛先を追加</button>
        </div>
        <div>
          <Link to={"/user"} className="bg-amber-300 text-white rounded px-4 ml-5">新規作成</Link>
        </div>
      </div> : 
      (<div className="block justify-center">
        <div>
          <h3>本日の送信リミットに達しましたが、引き続きテンプレート作成はご利用いただけます。</h3>
        </div>
        <div>
          <Link to={"/user"} className="bg-amber-300 text-white rounded px-4 ml-5">新規作成</Link>
        </div>
      </div>)}
      <br />
    </>
  );
};

export default SendComplete;
