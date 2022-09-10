import React from "react";
import { useState, ReactNode, useEffect } from 'react';
import "./App.css";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import TemplateBox from "./components/templates/TemplateBox";
import EditorBox from "./components/templates/EditorBox";
import PreviewBox from "./components/templates/PreviewBox";
import ReceiverSelect from "./components/templates/ReceiverSelect";
import SendComplete from "./components/templates/SendComplete";

function Central(){
  const [view, setView] = useState<string>("template");
  const [displayComponent, setDisplayComponent] = useState<ReactNode>();
  const [editedFile, setEditedFile] = useState<string>("");

  useEffect(() => {
    setDisplayComponent(<TemplateBox setDisplayComponent={setDisplayComponent} setView={setView} setEditedFile={setEditedFile} />);
  }, [])

  return (
      <div className="App">
        <header className='fixed w-full'>
        <Header />
        </header>
        <main className="App-header pt-24">
          <div className="flex">
            <div className='contentCenter'>
              {displayComponent}
            </div>
            <div className="contentRight">
              {(view !== "done" && view !== "template")?
              <button onClick={(e) => {
                e.preventDefault();
                if (view === "template") {
                  setDisplayComponent(<EditorBox setEditedFile={setEditedFile} />);
                  setDisplayComponent(<EditorBox setEditedFile={setEditedFile} />);
                  setView("edit");
                } else if (view === "edit") {
                  setDisplayComponent(<PreviewBox editedFile={editedFile} />);
                  setView("preview");
                } else if (view === "preview") {
                  setDisplayComponent(<ReceiverSelect />);
                  setView("send");
                } else if (view === "send") {
                  setDisplayComponent(<SendComplete />);
                  setView("done");
                }
              }}>
                ⏩ 次へ
              </button> : null}
              <br />
              
              {(view !== "template")?
              <button onClick={(e) => {
                e.preventDefault();
                if (view === "send") {
                  setDisplayComponent(<PreviewBox editedFile={editedFile} />);
                  setView("preview");
                } else if (view === "preview") {
                  setDisplayComponent(<EditorBox setEditedFile={setEditedFile} />);
                  setView("edit");
                } else if (view === "edit") {
                  setDisplayComponent(<TemplateBox setDisplayComponent={setDisplayComponent} setView={setView} setEditedFile={setEditedFile} />);
                  setView("template");
                } else if (view === "done") {
                  setDisplayComponent(<TemplateBox setDisplayComponent={setDisplayComponent} setView={setView} setEditedFile={setEditedFile} />);
                  setView("template");
                }
              }}>
                ⏪ 戻る
              </button>
            ) : null}
            <br />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Central;
