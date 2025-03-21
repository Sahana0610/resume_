import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot
import App from "./App"; // Main component
import "./index.css"; // Import global styles

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found in index.html");
}

const root = ReactDOM.createRoot(rootElement); // Create React root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
