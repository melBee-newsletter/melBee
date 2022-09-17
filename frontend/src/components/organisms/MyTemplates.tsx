import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError }  from "axios";
import Template from "../molecules/Template";

type template = {
    id: number;
    thumbnail: string;
    title: string;
};

const MyTemplates: React.FC = () => {
    const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
    const DOWN = "rotate-90";
    const UP = "-rotate-90";
    const [expand, setExpand] = useState<boolean>(false);
    const [direction, setDirection] = useState<string>(DOWN);
    const [templates, setTemplates] = useState<template[]>([]);

    const handleExpand = (e: any) => {
        e.preventDefault();
        setExpand(!expand);
    };

    useEffect(() => {
        !expand ? setDirection(DOWN) : setDirection(UP);
    }, [expand]);

    const getSavedTemplate = () => {
        axios({
          method: "get",
          url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template`,
        })
        .then((res: AxiosResponse) => {
            console.log(res.data);
            let data = res.data;
        data.map((singleTemplate: template) => {
            setTemplates((current) => [singleTemplate, ...current]);
        });
        })
        .catch((err: AxiosError<{ error: string }>) => {
            console.log(err.response!.data);
        });
    };

    return (
        <div className="bg-neutral-500 my-2">
            <div className="flex justify-between px-10 py-3 text-xl text-white">
                <h3>テンプレート一覧</h3>
                <button className={direction} onClick={handleExpand}>▷</button>
            </div>
            {(expand) && (
            <div className="flex justify-center">
                <div className="bg-white w-full">
                    <div className="grid grid-cols-4 gap-4 bg-black mx-5 my-4 rounded-lg">
                        {templates.map((template) => {
                            return <Template template={template} />;
                        })}
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default MyTemplates;