import React, { useEffect, useState } from "react";

type Props = {
  editedFile: string;
  setEditedFile: Function;
};

const PreviewBox: React.FC<Props> = ({ editedFile, setEditedFile }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEditedFile(localStorage.melBeeTempStoragedraft);
    console.log(localStorage.melBeeTempStoragedraft, "LOCALSTORAGE");
    console.log(editedFile, "EDITEDFILE");
    setTimeout(() => {
      setLoaded(!loaded);
    }, 1000);
  });

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
