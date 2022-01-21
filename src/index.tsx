import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Selects from './routes/Selects';
import Forms from './routes/Forms';
import Validation from './routes/Validation';
import Trees from './routes/Trees';
import OtherExperiments from './routes/other-experiments';
import UIExperiments from './routes/ui-experiments';

const rootElement = document.getElementById('root');

ReactDOM.render(

    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="ui-experiments" element={<UIExperiments/>}>
                        <Route path="selects" element={<Selects/>}/>
                        <Route path="forms" element={<Forms/>}/>
                        <Route path="validation" element={<Validation/>}/>
                        <Route path="trees" element={<Trees/>}/>
                    </Route>

                    <Route path="other-experiments" element={<OtherExperiments/>}>

                    </Route>
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
