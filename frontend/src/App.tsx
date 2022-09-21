import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './Landing';
import Central from './Central';
import EditorBox from './components/templates/EditorBox';
import PreviewBox from './components/templates/PreviewBox';
import Sending from './components/templates/Sending';
import Unsubscribe from './Unsubscribe';
import Portal from './components/templates/Portal';

function App() {
  const [analytics, setAnalytics] = useState<string>("");
  const [countSent, setCountSent] = useState<number>(0);
  const [reachLimit, setReachLimit] = useState<boolean>(false);
  const SEND_LIMIT = 5;

  useEffect(() => {
    if (countSent >= SEND_LIMIT) setReachLimit(true);
  }, [countSent]);
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user" element={<Central displayComponent={<Portal analytics={analytics} setAnalytics={setAnalytics} countSent={countSent} setCountSent={setCountSent} sendLimit={SEND_LIMIT} reachLimit={reachLimit} />} reachLimit={reachLimit} />} />
          <Route path="/user/edit" element={<Central displayComponent={<EditorBox />} reachLimit={reachLimit} />} />
          <Route path="/user/preview" element={<Central displayComponent={<PreviewBox reachLimit={reachLimit} />} reachLimit={reachLimit} />} />
          <Route path="/user/send" element={<Central displayComponent={<Sending analytics={analytics} reachLimit={reachLimit} countSent={countSent} setCountSent={setCountSent} /> } reachLimit={reachLimit} />} />
          <Route path="/unsubscribe/:user/:contact" element={<Unsubscribe />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
