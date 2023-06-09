import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserProvider from "./contexts/UserAuthProvider.tsx";
import AdminProvider from "./contexts/AdminAuthProvider.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
    <AdminProvider>
      <App />
    </AdminProvider>
    </UserProvider>
    
  </React.StrictMode>
);
