import { useState, ReactNode } from 'react';
import "./App.css";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import TemplateBox from './components/templates/TemplateBox';
import EditorBox from './components/templates/EditorBox';
import PreviewBox from './components/templates/PreviewBox';
import ReceiverSelect from './components/templates/ReceiverSelect';
import SendComplete from './components/templates/SendComplete';


function Central(){
  const [display, setDisplay] = useState<ReactNode>(<TemplateBox />);
  const [view, setView] = useState<string>("template");

  return (
      <div className="App">
        <Header />
        <main className="App-header">
          <div className="flex">
            <div className='contentLeft'>
              {display}
            </div>
            <div className="contentRight">
              {(view !== "done")?
              <button onClick={(e) => {
                e.preventDefault();
                if (view === "template") {
                  setDisplay(<EditorBox />);
                  setView("edit");
                } else if (view === "edit") {
                  setDisplay(<PreviewBox />);
                  setView("preview");
                } else if (view === "preview") {
                  setDisplay(<ReceiverSelect />);
                  setView("send");
                } else if (view === "send") {
                  setDisplay(<SendComplete />);
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
                  setDisplay(<PreviewBox />);
                  setView("preview");
                } else if (view === "preview") {
                  setDisplay(<EditorBox />);
                  setView("edit");
                } else if (view === "edit") {
                  setDisplay(<TemplateBox />);
                  setView("template");
                } else if (view === "done") {
                  setDisplay(<TemplateBox />);
                  setView("template");
                }
              }}>
                ⏪ 戻る
              </button> : null}
              <br />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
};

export default Central;