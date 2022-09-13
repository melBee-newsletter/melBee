import React, { useEffect, useState } from "react";
import Template from "../molecules/Template";
import templateImage from "../atoms/template_sample.png";

type template = {
  id: number;
  thumbnail: string;
  title: string;
};

const TemplateBox: React.FC = () => {
  const [templates, setTemplates] = useState<template[]>([]);

  // This is just for test.

  const sample1 = {
    id: 1,
    thumbnail:
      "https://drive.tiny.cloud/1/fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9/cf60aaa8-ba81-4b50-b49b-2b573398a465",
    title: "Florist",
  };

  const sample2 = {
    id: 2,
    thumbnail:
      "https://drive.tiny.cloud/1/fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9/75a11271-7c01-4411-8caf-7dd2d17b12c9",
    title: "Wedding Invitation",
  };

  const sample3 = {
    id: 3,
    thumbnail:
      "https://drive.tiny.cloud/1/fl35fbae1uoirilftuwgiaq0j9tyhw36quejctjkra1aeap9/2987c80d-40bb-4bc1-8740-3b5c278aecda",
    title: "TomatoShop",
  };

  const temps = [sample1, sample2, sample3];

  useEffect(() => {
    setTemplates(temps);
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
