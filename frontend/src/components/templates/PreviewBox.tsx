import React, { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

const PreviewBox: React.FC = () => {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
  const [title, setTitle] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);

  // const addEditedTemplate = () => {
  //   console.log(sessionStorage.melbeeID);
  //   axios({
  //     method: "post",
  //     url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template`,
  //     data: {
  //       title: `Saved Template ${Date().toLocaleString()}`,
  //       thumbnail:
  //         "https://drive.tiny.cloud/1/fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9/2dee0dc9-0afd-4bf9-a258-559073a64208",
  //       body: localStorage.melBeeTempStoragedraft,
  //     },
  //   })
  //     .then((res: AxiosResponse) => {
  //       // TODO: Show something when successfully singed up
  //       console.log(res.data);
  //     })
  //     .catch((err: AxiosError<{ error: string }>) => {
  //       // TODO: Show something when error caused
  //       window.confirm("何かやばい事が起こりました。");
  //       console.log(err.response!.data);
  //     });
  // };

  // useEffect(() => {
  //   addEditedTemplate();
  // }, []);

  const handleSave = (e: React.ChangeEvent<any>): void => {
    e.preventDefault();
    if (title) {
      axios({
        method: "post",
        url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template`,
        data: {
          title: title,
          thumbnail:
            "https://drive.tiny.cloud/1/fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9/2dee0dc9-0afd-4bf9-a258-559073a64208",
          body: localStorage.melBeeTempStoragedraft,
        },
      })
        .then((res: AxiosResponse) => {
          // TODO: Show something when successfully singed up
          setSaved(true);
          console.log(res.data);
        })
        .catch((err: AxiosError<{ error: string }>) => {
          // TODO: Show something when error caused
          window.confirm("何かやばい事が起こりました。");
          console.log(err.response!.data);
        });
    } else {
      alert(
        "テンプレートを保存するにはタイトルが必要です。\n タイトルを入力してください。"
      );
    }
  };

  return (
    <div className="h-screen w-full px-10">
      <h3>プレビュー</h3>
      <h5>内容をご確認ください</h5>
      <br />
      <div
        dangerouslySetInnerHTML={{
          __html: localStorage.melBeeTempStoragedraft,
        }}
      />
      {!saved ? (
        <form onSubmit={handleSave}>
          <p className="text-sm mt-8 mb-3">
            個人テンプレートに保存し、編集されたテンプレートを引き続きご利用いただけます。
          </p>
          <input
            type="text"
            placeholder="タイトル（２０文字まで）"
            maxLength={20}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 rounded-lg p-2 text-lg mr-5"
          />
          <button className="rounded-xl px-6 py-2 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation">
            保存
          </button>
        </form>
      ) : (
        <div className="text-xl">テンプレートが保存されました。</div>
      )}
    </div>
  );
};

export default PreviewBox;
