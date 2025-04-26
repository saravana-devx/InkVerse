import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/blue-dusk.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store"; // import store and persistor
import ScrollToTop from "./components/ScrollToTop";

toastConfig({ theme: "blue-dusk" });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
