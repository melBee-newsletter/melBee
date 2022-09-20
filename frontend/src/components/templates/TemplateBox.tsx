import React, { useCallback, useEffect, useState } from "react";
import Template from "../molecules/Template";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../molecules/Loading";

type template = {
  id: number;
  thumbnail: string;
  title: string;
  body: string;
};

const TemplateBox: React.FC = () => {
  const [melBeeTemplates, setMelBeeTemplates] = useState<template[]>([]);
  const [myTemplates, setMyTemplates] = useState<template[]>([]);
  const [seedDone, setSeedDone] = useState<boolean>(false);
  const [fetchTemplate, setFetchTemplate] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectMy, SetSelectMy] = useState<number | null>(null);
  const [selectMb, SetSelectMb] = useState<number | null>(null);

  const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";
  const navigate = useNavigate();

  const numOfTemplates = 12;

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
    <div className="bg-white w-screen px-8">
      {loading ? (
        <Loading word={"L O A D I N G"} />
      ) : (
        <>
          <h3>テンプレートをお選びください</h3>
          <div className="px-5 py-3 mx-8">
            {myTemplates.length > 0 && (
              <div>
                <h3 className="my-6 font-bold">
                  カスタマイズされたテンプレート
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
                            "https://us.123rf.com/450wm/iqoncept/iqoncept1702/iqoncept170200081/71501375-%E6%9C%80%E5%88%9D%E5%88%9D%E6%9C%9F%E3%81%97%E3%82%88%E3%81%86%E3%81%A8%E8%A9%A6%E3%81%BF%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%97-%E3%83%89%E3%83%A9%E3%83%95%E3%83%88-3-d-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E5%8D%98%E8%AA%9E.jpg?ver=6",
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
                          window.scrollTo(0, 0);
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
              <h3 className="my-6 font-bold">melBee テンプレート</h3>
              <div className="grid gap-4 grid-cols-4">
                {melBeeTemplates.map((template, i) => {
                  return (
                    <a
                      key={`mbTemp${i}`}
                      onClick={(e) => {
                        e.preventDefault();
                        SetSelectMb(i);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <Template template={template} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TemplateBox;
