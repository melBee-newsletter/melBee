import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveMyTemplate } from "./api";
import { templateToSave } from "../../type";
import { clickEvent } from "../../type";

type Props = {
  reachLimit: boolean;
};

const PreviewBox: React.FC<Props> = ({ reachLimit }) => {
  const navigate = useNavigate();
  const EDIT_PATH = "/user/edit";
  const SEND_PATH = "/user/send";

  const [title, setTitle] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = async (e: clickEvent) => {
    e.preventDefault();
    if (title) {
      const templateToSave: templateToSave = {
        title: title,
        thumbnail: "",
        body: localStorage.melBeeTempStoragedraft,
      };
      const isSaved = await saveMyTemplate(templateToSave);
      setSaved(isSaved);
    } else {
      alert(
        "テンプレートを保存するにはタイトルが必要です。\n タイトルを入力してください。"
      );
    }
  };

  return (
    <div className="pt-20 mb-28">
      <h2 className="text-xl font-medium ">プレビュー</h2>
      <p className="mb-4">送信前に内容をご確認ください</p>
      {/* <div className="flex justify-end mx-auto mb-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(EDIT_PATH);
          }}
          className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation mr-4"
        >
          {"編集"}
        </button>
        {!reachLimit ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(SEND_PATH);
            }}
            className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation"
          >
            {"送信"}
          </button>
        ) : (
          <h3>申し訳ございません、本日の送信リミットに達しました。</h3>
        )}
      </div> */}
      <div
        dangerouslySetInnerHTML={{
          __html: localStorage.melBeeTempStoragedraft,
        }}
      />
      <div className="flex justify-center mx-auto mb-4 mt-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(EDIT_PATH);
          }}
          className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-grayGradation mr-4"
        >
          {"戻る"}
        </button>
        {!reachLimit ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(SEND_PATH);
            }}
            className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation"
          >
            {"送信"}
          </button>
        ) : (
          <h3>申し訳ございません、本日の送信リミットに達しました。</h3>
        )}
      </div>
      <div className="w-4/6 mx-auto mt-10">
        {!saved ? (
          <form onSubmit={handleSave}>
            <label className="text-left">
              <span className="text-lg font-bold">
                作成テンプレートタイトル
              </span>
              <br />
              作成したテンプレートは保存可能です。
              <input
                type="text"
                placeholder="タイトル（２０文字まで）"
                maxLength={20}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-lg p-2 w-full mt-2"
              />
            </label>
            <p className="text-sm attention mt-1 mb-3 text-left">
              ※ただし、ログアウト・画面を閉じると、下書きデータは削除されます。
            </p>
            <button className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-blueGradation">
              保存
            </button>
          </form>
        ) : (
          <div className="text-xl">テンプレートが保存されました。</div>
        )}
      </div>
    </div>
  );
};

export default PreviewBox;
