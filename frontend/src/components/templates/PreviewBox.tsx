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

<<<<<<< HEAD
const PreviewBox: React.FC<Props> = ({editedFile}) => {
    return (
        <div style={{backgroundColor: "yellow"}}>
            <h3>プレビュー</h3>
            <h5>内容をご確認ください</h5>
            <br />
            <div
            dangerouslySetInnerHTML={{
                __html: editedFile
              }}
            />
        </div>
    );

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

=======
>>>>>>> main
export default PreviewBox;
