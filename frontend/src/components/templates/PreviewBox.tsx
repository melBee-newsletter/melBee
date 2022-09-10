import React from "react";

type Props = {
  editedFile: string;
};

const PreviewBox: React.FC<Props> = ({ editedFile }) => {
  return (
    <div style={{ backgroundColor: "yellow" }}>
      <h3>プレビュー</h3>
      <h5>内容をご確認ください</h5>
      <br />
      <div
        dangerouslySetInnerHTML={{
          __html: editedFile,
        }}
      />
    </div>
  );
};

export default PreviewBox;
