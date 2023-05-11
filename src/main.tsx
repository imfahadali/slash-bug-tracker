import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from "./context/UserProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

const GClientID =
  "";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1008555426314-sehsabce1coa5srab22jfpo3nese3vvv.apps.googleusercontent.com">
      <UserProvider>
        <App />
      </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
