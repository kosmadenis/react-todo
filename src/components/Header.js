import { Component } from "react";

import NewTaskForm from "./NewTaskForm";

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm {...this.props} />
      </header>
    );
  }
}
