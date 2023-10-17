/* eslint-disable no-unused-vars */
import React from 'react';
import {createRoot} from 'react-dom/client';
import MyApp from './MyApp';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './ThemeContext';
import { Provider } from 'react-redux';
import store from './Store/store';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Provider store={store}>
            <MyApp />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

