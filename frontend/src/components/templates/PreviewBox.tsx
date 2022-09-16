import React from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

const PreviewBox: React.FC = () => {
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";

  const createUserTemplate = () => {
    axios({
      method: "post",
      url: `"${BASE_URL}/user/template"`,
      data: localStorage.melBeeTempStoragedraft,
    })
      .then((res: AxiosResponse) => {
        // TODO: Show something when successfully singed up
        console.log(res.data);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        // TODO: Show something when error caused
        window.confirm("パスワードが入力されていません。");
        console.log(err.response!.data);
      });
  };

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
