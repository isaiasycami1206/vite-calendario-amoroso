import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './assets/styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import './assets/js/i18n.ts';
// import './index.css'

import App from './App.tsx';

renderApp();

function renderApp() {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(
        <React.StrictMode>
            <App />
            <ToastContainer />
        </React.StrictMode>
    );
}

