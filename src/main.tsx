import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./i18n"
import {HashRouter} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <React.Suspense fallback={""}>
            <HashRouter>
                <App/>
            </HashRouter>
        </React.Suspense>
    </React.StrictMode>,
)
