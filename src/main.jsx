import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <GoogleOAuthProvider clientId="384362988834-r2epqto9g9ledg9412u68cqj8af7rcq6.apps.googleusercontent.com">
        <Toaster />
        <App />
      </GoogleOAuthProvider>
      ;
    </RecoilRoot>
  </React.StrictMode>
);
