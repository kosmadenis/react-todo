import { Component } from "react";

import NewTaskForm from "./NewTaskForm";

import { headerCallbacksPropTypes } from "../app-prop-types";

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm {...this.props} />
      </header>
    );
  }

  static propTypes = {
    ...headerCallbacksPropTypes,
  };
}
