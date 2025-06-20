import React from 'react';
import {createRoot} from 'react-dom/client';
import 'regenerator-runtime/runtime';
import './css/Index.css';
import Demo from './Demo';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Demo />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
