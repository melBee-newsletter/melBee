import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import headerLogo from "../../../../assets/logo.png";

type Props = {
  reachLimit: boolean;
  setSendComplete: Function;
};

const SendComplete: React.FC<Props> = ({ reachLimit, setSendComplete }) => {
  const navigate = useNavigate();  
  
  return (
    <>
      <div className="flex justify-center items-center w-full">
        <div>
          <img src={headerLogo} alt="melbee-logo" className="py-2" width="200" />
          <h3 className="text-2xl my-5">送信完了しました</h3>
          <br />
        </div>
      </div>
      {!reachLimit ? (<div className="flex justify-center">
        <div>
          <button 
          className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation mr-16" 
          onClick={(e)=> {
            e.preventDefault();
            setSendComplete(false);
            }}>
              宛先を追加
          </button>
        </div>
        <div>
          <button onClick={(e) => {
              e.preventDefault();
              navigate("/user");
            }} 
            className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation ml-16">
              新規作成
              </button>
        </div>
      </div>) : 
      (<div className="block justify-center">
        <div>
          <h3 className="text-lg mb-5">本日の送信リミットに達しましたが、引き続きテンプレート作成はご利用いただけます。</h3>
        </div>
        <div>
          <button onClick={(e) => {
              e.preventDefault();
              navigate("/user");
            }} 
            className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation">
              新規作成
          </button>
        </div>
      </div>)}
      <br />
    </>
  );
};

export default SendComplete;
