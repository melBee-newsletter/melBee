import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveMyTemplate } from "./api";

type Props = {
  reachLimit: boolean;
};

interface templateToSave {
  title: string,
  thumbnail: string,
  body: string,
};

const PreviewBox: React.FC<Props> = ({ reachLimit }) => {
  const navigate = useNavigate();
  const EDIT_PATH = "/user/edit";
  const SEND_PATH = "/user/send";

  const [title, setTitle] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (title) {
      const templateToSave: templateToSave = {
        title: title,
        thumbnail: "",
        body: localStorage.melBeeTempStoragedraft,
      }
      const isSaved = await saveMyTemplate(templateToSave);
      setSaved(isSaved);
    } else {
      alert(
        "テンプレートを保存するにはタイトルが必要です。\n タイトルを入力してください。"
      );
    }
  };

  return (
    <div className="w-full px-10">
      <div className="flex justify-end w-11/12 mx-auto mb-4">
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
      </div>
      <div className="text-left">
        {!saved ? (
          <form onSubmit={handleSave}>
            <label>
              作成テンプレートタイトル
              <input
                type="text"
                placeholder="タイトル（２０文字まで）"
                maxLength={20}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-lg p-2"
              />
            </label>
            <p className="text-sm attention mt-1 mb-3">
              {/* 個人テンプレートに保存し、編集されたテンプレートを引き続きご利用いただけます。 */}
              ※
              作成したテンプレートは自動保存されるため、引き続きご利用いただけます。
            </p>
            <button className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation">
              保存
            </button>
          </form>
        ) : (
          <div className="text-xl">テンプレートが保存されました。</div>
        )}
      </div>
      <h3 className="mt-8 text-2xl">プレビュー</h3>
      <h5>送信前に内容をご確認ください</h5>
      <br />
      <div
        dangerouslySetInnerHTML={{
          __html: localStorage.melBeeTempStoragedraft,
        }}
      />
    </div>
  );
};

export default PreviewBox;
