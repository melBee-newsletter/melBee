import React from "react";

const PreviewBox: React.FC = () => {
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
