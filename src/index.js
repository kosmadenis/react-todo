import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const tasks = [
  {
    id: 1,
    creationTime: new Date(Date.now() - 17_000),
    description: "Completed task",
    completed: true,
    editing: false,
  },
  {
    id: 2,
    creationTime: new Date(Date.now() - 100_000),
    description: "Editing task",
    completed: false,
    editing: true,
  },
  {
    id: 3,
    creationTime: new Date(Date.now() - 300_000),
    description: "Active task",
    completed: false,
    editing: false,
  }
];

const state = {
  tasks,
  filter: "all",
}

root.render(
  <React.StrictMode>
    <App state={state} />
  </React.StrictMode>
);
