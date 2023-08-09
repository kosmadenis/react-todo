import { Component } from "react";

export default class NewTaskForm extends Component {
  render() {
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

          this.props.callbacks.addTask(text);
        }}
      />
    );
  }
}
