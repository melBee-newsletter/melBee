import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './Landing';
import Central from './Central';
import TemplateBox from './components/templates/TemplateBox';
import EditorBox from './components/templates/EditorBox';
import PreviewBox from './components/templates/PreviewBox';
import ReceiverSelect from './components/templates/ReceiverSelect';
import SendComplete from './components/templates/SendComplete';
import Unsubscribe from './Unsubscribe';
import Portal from './components/templates/Portal';

function App() {
  const [analytics, setAnalytics] = useState("");
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user" element={<Central displayComponent={<Portal />} />} />
          <Route path="/user/templates" element={<Central displayComponent={<TemplateBox />} />} />
          <Route path="/user/edit" element={<Central displayComponent={<EditorBox analytics={analytics} setAnalytics={setAnalytics}/>} />} />
          <Route path="/user/preview" element={<Central displayComponent={<PreviewBox />} />} />
          <Route path="/user/send" element={<Central displayComponent={<ReceiverSelect analytics={analytics}/>} />} />
          <Route path="/user/sent" element={<Central displayComponent={<SendComplete />} />} />
          <Route path="/unsubscribe/:user/:contact" element={<Unsubscribe />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
