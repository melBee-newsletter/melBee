import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse, AxiosError } from "axios";

type Props = {
  template: {
    id: number;
    thumbnail: string;
    title: string;
  };
};

const Template: React.FC<Props> = ({ template }) => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";

  const getTemplate = (id: number) => {
    axios({
      method: "get",
      url: `${BASE_URL}/template/${id}`,
    })
      .then((res) => {
        const data = res.data;
        localStorage.setItem("melBeeTempStoragedraft", data.body);
      })
      .then(() => navigate("/user/edit"));
  };

  return (
    <div className="px-2 pb-2 pt-2" style={{ backgroundColor: "pink" }}>
      <p className="text-base pb-3">{template.title}</p>
      <div className="w-max">
        <a
          onClick={(e) => {
            e.preventDefault();
            getTemplate(template.id);
          }}
        >
          <img src={template.thumbnail} alt="template" width={200} />
        </a>
      </div>
    </div>
  );
};

export default Template;
