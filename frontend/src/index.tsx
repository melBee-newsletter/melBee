import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Central from './Central';
import TemplateBox from './components/templates/TemplateBox';
import EditorBox from './components/templates/EditorBox';
import PreviewBox from './components/templates/PreviewBox';
import ReceiverSelect from './components/templates/ReceiverSelect';
import SendComplete from './components/templates/SendComplete';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/user" element={<Central />} /> */}
          <Route path="/user/templates" element={<Central displayComponent={<TemplateBox />} />} />
          <Route path="/user/edit" element={<Central displayComponent={<EditorBox />} />} />
          <Route path="/user/preview" element={<Central displayComponent={<PreviewBox />} />} />
          <Route path="/user/send" element={<Central displayComponent={<ReceiverSelect />} />} />
          <Route path="/user/sent" element={<Central displayComponent={<SendComplete />} />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
