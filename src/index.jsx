import React from "react";
import ReactDOM from "react-dom/client";
import MyApp from "./MyApp";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import { Provider } from "react-redux";
import store from "./Store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Provider store={store}>
          <MyApp />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
