import React, { useCallback, useState, useEffect } from "react";
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
    const [melBeeTemplates, setMelBeeTemplates] = useState<template[]>([]);
    const [myTemplates, setMyTemplates] = useState<template []>([]);
    const [selectMy, SetSelectMy] = useState<number | null>(null);
    const [selectMb, SetSelectMb] = useState<number | null>(null);
    const [seedDone, setSeedDone] = useState<boolean>(false);
    const [fetchTemplate, setFetchTemplate] = useState<boolean>(false);
    const [display, setDisplay] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const numOfTemplates = 12;

    const handleExpand = (e: any) => {
        e.preventDefault();
        setExpand({template: !expand});
    };

    useEffect(() => {
        !expand ? setDirection(DOWN) : setDirection(UP);
    }, [expand]);

    const seedTemplate = useCallback(() => {
        axios({
          method: "post",
          url: `${BASE_URL}/template/seed`,
          data: "tomatoTest",
        })
          .then((res: AxiosResponse) => {
            setSeedDone(true);
          })
          .catch((err: AxiosError<{ error: string }>) => {
            console.log(err.response!.data);
          });
    }, []);
    
    useEffect(() => {
        seedTemplate();
    }, [seedTemplate]);

    useEffect(() => {
        const getTemplate = (id: number) => {
            axios({
            method: "get",
            url: `${BASE_URL}/template/${id}`,
        })
        .then((res: AxiosResponse) => {
            let data = res.data;
            data.id = id;
            setMelBeeTemplates((current) => [...current, data]);
        })
        .catch((err: AxiosError<{ error: string }>) => {
            console.log(err.response!.data);
        });
    };

    for (let i = 1; i <= numOfTemplates; i++) {
        getTemplate(i);
    }

    const getSavedTemplate = () => {
        axios({
            method: "get",
            url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template`,
        })
        .then((res: AxiosResponse) => {
            let data = res.data;
            data.map((template: template) => {
                setMyTemplates((current) => [template, ...current]);
                setFetchTemplate(true);
            });
        })
        .catch((err: AxiosError<{ error: string }>) => {
            console.log(err.response!.data);
        });
    };
        getSavedTemplate();
    }, [seedDone]);

    useEffect(() => {
        setTimeout(() => {
            setDisplay(true);
        }, 1000);
    }, [fetchTemplate]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [display]);

    useEffect(() => {
        const handleMyTemplate = (i: number) => {
            axios({
            method: "get",
            url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template`,
        })
        .then((res: AxiosResponse) => {
            let data = res.data;
            const index = data.length - 1 - i;
            localStorage.setItem("melBeeTempStoragedraft", data[index].body);
        })
        .then(() => navigate("/user/edit"));
    };
        if (selectMy !== null) handleMyTemplate(selectMy);
    }, [selectMy]);

    useEffect(() => {
        const handleMelBeeTemplate = (i: number) => {
            const templateId = melBeeTemplates[i].id;
            axios({
            method: "get",
            url: `${BASE_URL}/template/${templateId}`,
        })
        .then((res) => {
            const data = res.data;
            localStorage.setItem("melBeeTempStoragedraft", data.body);
        })
        .then(() => navigate("/user/edit"));
    };
        if (selectMb !== null) handleMelBeeTemplate(selectMb);
    }, [selectMb]);

    return (
        <div className="justify-center my-2 py-4 mb-8 border-2 rounded-lg drop-shadow-xl bg-white">
            <div className="flex justify-between px-10 py-3 text-xl" onClick={handleExpand}>
                {(expand) ? <h3><strong>手紙を送ろう</strong></h3> : <h3>テンプレート一覧</h3> }
                <span className={direction}>▷</span>
            </div>
            {(expand) && (
            <div className="flex justify-center">
                <div className="bg-white w-full">
                    {myTemplates.length > 0 && (
              <div>
                <h3 className="my-6 font-bold">
                  保存されたテンプレート
                </h3>
                <div className="grid gap-4 grid-cols-4">
                  {localStorage.melBeeTempStoragedraft && (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/user/edit");
                      }}
                    >
                      <Template
                        template={{
                          id: NaN,
                          thumbnail:
                            "",
                          title: "下書き",
                          body: localStorage.melBeeTempStoragedraft,
                        }}
                      />
                    </a>
                  )}
                  {myTemplates.map((template, i) => {
                    return (
                      <a
                        key={`myTemp${i}`}
                        onClick={(e) => {
                          e.preventDefault();
                          SetSelectMy(i);
                        }}
                      >
                        <Template template={template} />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <h3 className="my-6 font-bold">melBeeオリジナル テンプレート</h3>
              <div className="grid gap-4 grid-cols-4">
                {melBeeTemplates.map((template, i) => {
                  return (
                    <a
                      key={`mbTemp${i}`}
                      onClick={(e) => {
                        e.preventDefault();
                        SetSelectMb(i);
                      }}
                    >
                      <Template template={template} />
                    </a>
                  );
                })}
              </div>
            </div>  
                </div>
            </div>
            )}
        </div>
    );
};

export default MyTemplates;