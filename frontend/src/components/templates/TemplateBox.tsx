import React, { useEffect, useState } from "react";
import Template from "../molecules/Template";
import templateImage from "../atoms/template_sample.png";
import axios, { AxiosResponse, AxiosError } from "axios";

type template = {
  id: number;
  thumbnail: string;
  title: string;
};

const TemplateBox: React.FC = () => {
  const tempArr: template[] = [];
  const [templates, setTemplates] = useState<template[]>([]);
  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";

  const seedTemplate = () => {
    axios({
      method: "post",
      url: `${BASE_URL}/template/seed`,
      data: "tomatoTest",
    });
  };

  const getTemplate = (id: number) => {
    axios({
      method: "get",
      url: `${BASE_URL}/template/${id}`,
    })
      .then((res: AxiosResponse) => {
        let data = res.data;
        data.id = id;
        console.log(data);
        setTemplates((current) => [...current, data]);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.response!.data);
      });
  };

  const getSavedTemplate = () => {
    axios({
      method: "get",
      url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template`,
    })
      .then((res: AxiosResponse) => {
        let data = res.data;
        setTemplates((current) => [data, ...current]);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.response!.data);
      });
  };

  useEffect(() => {
    seedTemplate();
  }, []);

  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      getTemplate(i);
    }
  }, []);

  useEffect(() => {
    getSavedTemplate();
  }, []);

  return (
    <div style={{ backgroundColor: "gray" }}>
      <h3>テンプレートをお選びください</h3>
      <div className="px-5 py-3">
        <div className="grid gap-4 grid-cols-4 grid-rows-4">
          {templates.map((template) => {
            return <Template template={template} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TemplateBox;
