import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './pages/Landing/Landing';
import User from './pages/User/User';
import EditorBox from './pages/User/components/templates/EditorBox';
import PreviewBox from './pages/User/components/templates/PreviewBox';
import Sending from './pages/User/components/templates/Sending';
import Unsubscribe from './pages/Unsubscribe/Unsubscribe';
import Portal from './pages/User/components/templates/Portal';

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
          <Route path="/user" element={<User displayComponent={<Portal analytics={analytics} setAnalytics={setAnalytics} countSent={countSent} setCountSent={setCountSent} sendLimit={SEND_LIMIT} reachLimit={reachLimit} />} reachLimit={reachLimit} />} />
          <Route path="/user/edit" element={<User displayComponent={<EditorBox />} reachLimit={reachLimit} />} />
          <Route path="/user/preview" element={<User displayComponent={<PreviewBox reachLimit={reachLimit} />} reachLimit={reachLimit} />} />
          <Route path="/user/send" element={<User displayComponent={<Sending analytics={analytics} reachLimit={reachLimit} setCountSent={setCountSent} /> } reachLimit={reachLimit} />} />
          <Route path="/unsubscribe/:user/:contact" element={<Unsubscribe />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
