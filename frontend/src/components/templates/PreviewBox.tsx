import React, { useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

const PreviewBox: React.FC = () => {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";

  const addEditedTemplate = () => {
    console.log(sessionStorage.melbeeID);
    axios({
      method: "post",
      url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template`,
      data: {
        title: "Saved Template",
        thumbnail:
          "https://drive.tiny.cloud/1/fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9/2dee0dc9-0afd-4bf9-a258-559073a64208",
        body: localStorage.melBeeTempStoragedraft,
      },
    })
      .then((res: AxiosResponse) => {
        // TODO: Show something when successfully singed up
        console.log(res.data);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        // TODO: Show something when error caused
        window.confirm("何かやばい事が起こりました。");
        console.log(err.response!.data);
      });
  };

  useEffect(() => {
    addEditedTemplate();
  }, []);

  return (
    <div style={{ backgroundColor: "yellow" }}>
      <h3>プレビュー</h3>
      <h5>内容をご確認ください</h5>
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
