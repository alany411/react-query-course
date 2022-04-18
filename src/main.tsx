import '@/styles/tailwind.css';

import { worker } from '@uidotdev/react-query-api';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';

new Promise((res) => setTimeout(res, 100))
  .then(() =>
    worker.start({
      quiet: true,
      onUnhandledRequest: 'bypass',
    })
  )
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <div>
            <App />
          </div>
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
