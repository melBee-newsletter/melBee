import React from "react";
import { useNavigate } from "react-router-dom";
import EditorBox from "../templates/EditorBox";

type Props = {
  template: {
    thumbnail: string;
    title: string;
  };
};

const Template: React.FC<Props> = ({ template }) => {
  const navigate = useNavigate();

  return (
    <div className="px-2 pb-2 pt-2" style={{ backgroundColor: "pink" }}>
      <p className="text-base pb-3">{template.title}</p>
      <div className="w-max">
        <a
          onClick={(e) => {
            e.preventDefault();
            //second parameter should be the tempate HTML string.
            localStorage.setItem(
              "melBeeTempStoragedraft",
              "default page! <img src = 'https://drive.tiny.cloud/1/fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9/0d286852-c67d-4694-9d4d-815aceb001d1'></img><img src = 'https://drive.tiny.cloud/1/fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9/0d286852-c67d-4694-9d4d-815aceb001d1'></img><img src = 'https://drive.tiny.cloud/1/fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9/0d286852-c67d-4694-9d4d-815aceb001d1'></img>"
            );
            navigate("/user/edit");
          }}
        >
          <img src={template.thumbnail} alt="template" width={200} />
        </a>
      </div>
    </div>
  );
};

export default Template;
