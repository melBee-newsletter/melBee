import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './Landing';
import Central from './Central';
import TemplateBox from './components/templates/TemplateBox';
import EditorBox from './components/templates/EditorBox';
import PreviewBox from './components/templates/PreviewBox';
import ReceiverSelect from './components/templates/Sending';
import Unsubscribe from './Unsubscribe';
import Portal from './components/templates/Portal';

function App() {
  const [analytics, setAnalytics] = useState<string>("");
  const [countSent, setCountSent] = useState<number>(0);
  const [reachLimit, setReachLimit] = useState<boolean>(false);
  const [sendLimit, setSendLimit] = useState<number>(0);

  useEffect(() => {
    setSendLimit(5);
    if (countSent >= sendLimit) setReachLimit(true);
  }, [countSent]);
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user" element={<Central displayComponent={<Portal analytics={analytics} setAnalytics={setAnalytics} countSent={countSent} setCountSent={setCountSent} sendLimit={sendLimit} reachLimit={reachLimit} />} reachLimit={reachLimit} />} />
          <Route path="/user/templates" element={<Central displayComponent={<TemplateBox />} reachLimit={reachLimit} />} />
          <Route path="/user/edit" element={<Central displayComponent={<EditorBox />} reachLimit={reachLimit} />} />
          <Route path="/user/preview" element={<Central displayComponent={<PreviewBox />} reachLimit={reachLimit} />} />
          <Route path="/user/send" element={<Central displayComponent={<ReceiverSelect analytics={analytics} reachLimit={reachLimit} /> } reachLimit={reachLimit} />} />
          <Route path="/unsubscribe/:user/:contact" element={<Unsubscribe />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
