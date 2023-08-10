import { Component } from "react";
import { headerCallbacksPropTypes } from "../app-prop-types";

export default class NewTaskForm extends Component {
  render() {
    const { addTask } = this.props;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={(e) => {
          if (e.key !== "Enter") {
            return;
          }

          const text = e.target.value;
          e.target.value = "";

          if (!text) {
            return;
          }

          addTask(text);
        }}
      />
    );
  }

  static defaultProps = {
    addTask: () => {},
  }

  static propTypes = {
    ...headerCallbacksPropTypes,
  };
}
