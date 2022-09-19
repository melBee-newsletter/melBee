import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError }  from "axios";
import { useNavigate } from "react-router-dom";
import Template from "../molecules/Template";

type template = {
    id: number;
    thumbnail: string;
    title: string;
    body: string;
};

type Props = {
    expand: boolean;
    setExpand: Function;
};

const MyTemplates: React.FC<Props> = ({ expand, setExpand }) => {
    const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
    const navigate = useNavigate()
    const DOWN = "rotate-90 text-yellow-400";
    const UP = "-rotate-90 text-yellow-400";
    const [direction, setDirection] = useState<string>(DOWN);
    const [myTemplates, setMyTemplates] = useState<template []>([]);

    const handleExpand = (e: any) => {
        e.preventDefault();
        setExpand({template: !expand});
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
        <div className="justify-center my-2 py-4 mb-8 border-2 rounded-lg drop-shadow-xl bg-white">
            <div className="flex justify-between px-10 py-3 text-xl" onClick={handleExpand}>
                <h3>保存テンプレート一覧</h3>
                <span className={direction}>▷</span>
            </div>
            {(expand) && (
            <div className="flex justify-center">
                <div className="bg-white w-full">
                    {(myTemplates.length > 0) ? (
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
                    ) : (
                        <div>
                            <p className="text-xl my-4">保存されている個人テンプレートはまだございません</p>
                        </div>
                    )}
                    
                </div>
            </div>
            )}
        </div>
    );
};

export default MyTemplates;