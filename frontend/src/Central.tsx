<<<<<<< HEAD
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
=======
import React, { useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import "./App.css";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";

type Props = {
  displayComponent: ReactNode;
};
>>>>>>> main

const Central: React.FC<Props> = ({displayComponent}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  let currentView = location.pathname;
  
  const TEMPLATE_PATH = '/user/templates';
  const EDIT_PATH = '/user/edit';
  const PREVIEW_PATH = '/user/preview';
  const SEND_PATH = '/user/send';
  const SENT_PATH = '/user/sent';

  const [editedFile, setEditedFile] = useState<string>("");

  return (
    <div className="App">
      <header className='fixed w-full'>
        <Header />
<<<<<<< HEAD
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
=======
      </header>
      <main className="App-header pt-24">
        <div className="flex">
          <div className='contentCenter'>
            {displayComponent}
          </div>
          <div className="contentRight">
            {(currentView !== SENT_PATH && currentView !== TEMPLATE_PATH)?
            <button onClick={(e) => {
              e.preventDefault();
              if (currentView === TEMPLATE_PATH) {
                navigate(EDIT_PATH);
              } else if (currentView === EDIT_PATH) {
                navigate(PREVIEW_PATH);
              } else if (currentView === PREVIEW_PATH) {
                navigate(SEND_PATH);
              } else if (currentView === SEND_PATH) {
                navigate(SENT_PATH);
              }
              }} className='text-sm bg-sky-500 text-white pt-2 pb-2 pr-4 pl-4'>
              {'次に進む >'}
            </button> : null}
            <br />
            
            {(currentView !== TEMPLATE_PATH)?
            <button onClick={(e) => {
              e.preventDefault();
              if (currentView === SEND_PATH) {
                navigate(PREVIEW_PATH);
              } else if (currentView === PREVIEW_PATH) {
                navigate(EDIT_PATH);
              } else if (currentView === EDIT_PATH) {
                navigate(TEMPLATE_PATH);
              } else if (currentView === SENT_PATH) {
                navigate(TEMPLATE_PATH);
              }
            }} className='text-sm bg-amber-500 text-white pt-2 pb-2 pr-4 pl-4'>
              {'< 戻る'}
            </button> : null}
>>>>>>> main
            <br />
          </div>
        </div>
      </main>
<<<<<<< HEAD
      <Footer />
    </div>
  );
}
=======
      <footer className='w-full'>
      <Footer />
      </footer>
    </div>
  );
};
>>>>>>> main

export default Central;
