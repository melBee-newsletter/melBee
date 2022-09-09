import React, { useEffect, useState } from "react";

type Props = {
  editedFile: string;
  setEditedFile: Function;
};

const PreviewBox: React.FC<Props> = ({ editedFile, setEditedFile }) => {
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
