import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError }  from "axios";
import { useNavigate } from "react-router-dom";
import Template from "../molecules/Template";

type template = {
    id: number;
    thumbnail: string;
    title: string;
};

const MyTemplates: React.FC = () => {
    const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
    const navigate = useNavigate()
    const DOWN = "rotate-90";
    const UP = "-rotate-90";
    const [expand, setExpand] = useState<boolean>(false);
    const [direction, setDirection] = useState<string>(DOWN);
    const [myTemplates, setMyTemplates] = useState<template []>([]);

    const handleExpand = (e: any) => {
        e.preventDefault();
        setExpand(!expand);
    };

    useEffect(() => {
        !expand ? setDirection(DOWN) : setDirection(UP);
    }, [expand]);

    useEffect(()=> {
        axios({
            method: "get",
            url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template`,
        })
        .then((res: AxiosResponse) => {
            // console.log(res.data);
            let data = res.data;
            data.map((template: template) => {
            setMyTemplates((current) => [template, ...current]);
        });
        })
        .catch((err: AxiosError<{ error: string }>) => {
            console.log(err.response!.data);
        });
    }, []);

    const handleMyTemplate = (i: number) => {
        axios({
          method: "get",
          url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template`,
        })
        .then((res: AxiosResponse) => {
          let data = res.data;
          const index = data.length -1 -i;
          localStorage.setItem("melBeeTempStoragedraft", data[index].body);
        })
        .then(() => navigate("/user/edit"));
    };

    return (
        <div className="bg-neutral-500 my-2">
            <div className="flex justify-between px-10 py-3 text-xl text-white font-bold">
                <h3>個人テンプレート一覧</h3>
                <button className={direction} onClick={handleExpand}>▷</button>
            </div>
            {(expand) && (
            <div className="flex justify-center">
                <div className="bg-white w-full">
                    <div className="grid grid-cols-4 gap-4 bg-gray-200 mx-5 my-4 rounded-lg p-6">
                    {myTemplates.map((template, i) => {
                        return (
                        <a key={`myTemp${i}`} onClick={(e)=> {
                            e.preventDefault();
                            handleMyTemplate(i)}}>
                            <Template template={template} />
                        </a>
                        )
                    })}
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default MyTemplates;