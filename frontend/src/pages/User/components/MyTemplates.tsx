import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Template from "./Template";
import Loading from "../../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { template } from "../../../type";
import { getMelbeeTemplates, getMyTemplates, seedTemplate, deleteMyTemplate } from "../api";
import { clickEvent } from "../../../type";

type Props = {
  expand: boolean;
  setExpand: Function;
};

const MyTemplates: React.FC<Props> = ({ expand, setExpand }) => {
  const navigate = useNavigate();
  const DOWN = "rotate-90";
  const UP = "-rotate-90";
  const [direction, setDirection] = useState<string>(DOWN);
  const [melBeeTemplates, setMelBeeTemplates] = useState<template[]>([]);
  const [myTemplates, setMyTemplates] = useState<template[]>([]);
  const [selectMy, SetSelectMy] = useState<number | null>(null);
  const [selectMb, SetSelectMb] = useState<number | null>(null);
  const [seedDone, setSeedDone] = useState<boolean>(false);
  const [fetchTemplate, setFetchTemplate] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleExpand = (e: clickEvent) => {
    e.preventDefault();
    setExpand({ template: !expand });
  };

  useEffect(() => {
    !expand ? setDirection(DOWN) : setDirection(UP);
  }, [expand]);

  useEffect(() => {
    (async function () {
      await seedTemplate().then((seeded) => {
        setSeedDone(seeded);
      });
    })();
  }, []);

  useEffect(() => {
    (async function getAllTemplates() {
      const idToFetchAll = 0;
      const allTemplates = await getMelbeeTemplates(idToFetchAll);
      setMelBeeTemplates(allTemplates);
    })();

    (async function () {
      const allMyTemplates = await getMyTemplates();
      setMyTemplates(allMyTemplates);
      setFetchTemplate(true);
    })();
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
      localStorage.setItem("melBeeTempStoragedraft", myTemplates[i].body);
      navigate("/user/edit");
    };
    if (selectMy !== null) handleMyTemplate(selectMy);
  }, [selectMy]);

  useEffect(() => {
    const handleMelBeeTemplate = async (i: number) => {
      const templateId = melBeeTemplates[i].id;
      const chosenTemplate = await getMelbeeTemplates(templateId);
      localStorage.setItem("melBeeTempStoragedraft", chosenTemplate[0].body);
      navigate("/user/edit");
    };
    if (selectMb !== null) handleMelBeeTemplate(selectMb);
  }, [selectMb]);

  const handleRemove = async (i: number) => {
    const confirmDelete = window.confirm("保存テンプレートを削除しますか？");
    const templateId = myTemplates[i].id;
    if (confirmDelete) {
      await deleteMyTemplate(templateId)
      .then((deleteSuccess) => {
        if (deleteSuccess) {
          (async function () {
            const allMyTemplates = await getMyTemplates();
            setMyTemplates(allMyTemplates);
            alert("テンプレートが削除されました。")
          })();
        } else {
          alert("エラーが生じました。再度お試しください。");
        }
      });
    };
  };

  return (
    <>
      {loading && <Loading word={"L O A D I N G"} />}
      <div className="justify-center sm:px-5 lg:px-10 py-6 mb-10 border rounded-lg drop-shadow-xl bg-white">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleExpand}
        >
          <h3 className="text-xl font-medium">メールを作成</h3>
          <span className={direction}>
            {" "}
            <FontAwesomeIcon
              className="bg-yellow-200 rounded-lg p-1.5"
              icon={faArrowRight}
            />
          </span>
        </div>
        {expand && (
          <div className="md:flex md:justify-center">
            <div className="">
              {myTemplates.length > 0 && (
                <div>
                  <p className="mt-4 mb-7 font-bold">保存テンプレート</p>
                  <div className="md:grid lg:grid md:gap-2 lg:gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {localStorage.melBeeTempStoragedraft && (
                      <a
                        className="mb-5 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/user/edit");
                        }}
                      >
                        <Template
                          template={{
                            id: NaN,
                            thumbnail: "",
                            title: "下書き",
                            body: localStorage.melBeeTempStoragedraft,
                          }}
                        />
                      </a>
                    )}
                    {myTemplates.map((template, i) => {
                      return (
                        <div key={`myTemp${i}`} className="relative">
                          <a
                            className="mb-5 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              SetSelectMy(i);
                            }}
                          >
                            <Template template={template} />
                          </a>
                          <button
                            type="submit"
                            value={i}
                            onClick={(e: clickEvent) => {
                              e.preventDefault();
                              handleRemove(i);
                            }}
                            className="absolute top-3 right-1 rounded-xl px-2 text-sm text-white bg-redGradation"
                          >
                            削除
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <p className="mt-5 mb-7 font-bold">
                  melBeeオリジナル テンプレート
                </p>
                <div className="md:grid md:gap-2 lg:gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {melBeeTemplates.map((template, i) => {
                    return (
                      <div key={`mbTemp${i}`}>
                        <a
                          className="mb-5 cursor-pointer"
                          key={`mbTemp${i}`}
                          onClick={(e) => {
                            e.preventDefault();
                            SetSelectMb(i);
                          }}
                        >
                          <Template template={template} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyTemplates;
