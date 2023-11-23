import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "virtual:uno.css";
import "~/styles/index.scss";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
