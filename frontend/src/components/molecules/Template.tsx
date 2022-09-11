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
            localStorage.setItem(
              "melBeeTempStoragedraft",
              "Hi Hiro! <img src = 'https://i.ibb.co/Kb5gPZC/melbee.png'>"
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
