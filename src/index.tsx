import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OtherExperiments from './routes/other-experiments';
import UIExperiments from './routes/ui-experiments';
import Selects from './routes/selects';
import Forms from './routes/forms';
import Validation from './routes/validation';
import Trees from './routes/trees';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="ui-experiments" element={<UIExperiments/>}/>
                    <Route path="ui-experiments/selects" element={<Selects/>}/>
                    <Route path="ui-experiments/forms" element={<Forms/>}/>
                    <Route path="ui-experiments/validation" element={<Validation/>}/>
                    <Route path="ui-experiments/trees" element={<Trees/>}/>

                    <Route path="other-experiments" element={<OtherExperiments/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
