import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// set up calcite components
import "@esri/calcite-components/dist/calcite/calcite.css";
// import { setAssetPath } from '@esri/calcite-components/dist/components';
// setAssetPath(window.location.href);
import { setAssetPath } from "@esri/calcite-components/dist/components";
setAssetPath("https://js.arcgis.com/calcite-components/1.8.0/assets");
document.body.classList.toggle('calcite-mode-dark');
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <link rel="stylesheet" href="https://js.arcgis.com/4.27/esri/css/main.css"></link> */}
    <link rel="stylesheet" href="https://js.arcgis.com/4.27/esri/themes/dark/main.css"></link>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
