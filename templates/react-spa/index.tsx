import React from 'react';
import { render } from 'react-dom';

import App from './App';
import './index.less';
import './assets/css';

if (process.env.NODE_ENV === 'production') {
  const log = console.log;

  window.console.log = function(...args: any) {
    const logArgs: any[] = [];

    for (const item of args) {
      if (typeof item === 'object') {
        logArgs.push(JSON.stringify(item));
      } else {
        logArgs.push(item);
      }
    }

    log.call(console, ...logArgs);
  };
};

render( <App />, document.querySelector('#app'));
