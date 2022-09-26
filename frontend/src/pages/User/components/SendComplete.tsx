import React from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "../../../type";
import { useTranslation } from "react-i18next";

const SendComplete: React.FC<Props["sendComplete"]> = ({ reachLimit, setSendComplete }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-white py-24 mt-32 mb-28">
      <div className="">
        <div>
          <p className="text-xl text-center mb-4">{t("送信完了しました")}</p>
        </div>
      </div>
      {!reachLimit ? (
        <div className="flex justify-center">
          <div>
            <button
              className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation mr-4"
              onClick={(e) => {
                e.preventDefault();
                setSendComplete(false);
              }}
            >
              {t("宛先を追加")}
            </button>
          </div>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/user");
              }}
              className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation"
            >
              {t("新規作成")}
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <div>
            <p className="mb-4">
              {t("本日の送信リミットに達しましたが、")}
              <br />
              {t("引き続きテンプレート作成はご利用いただけます。")}
            </p>
          </div>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/user");
              }}
              className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation"
            >
              {t("新規作成")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendComplete;
