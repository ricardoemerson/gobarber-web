import React from 'react';
import { debugContextDevtool } from 'react-context-devtool';
import ReactDOM from 'react-dom';

import App from './App';

const rootContainer: HTMLElement | null = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootContainer,
);

debugContextDevtool(rootContainer, { disable: process.env.NODE_ENV === 'production' });
