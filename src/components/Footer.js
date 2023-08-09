import { Component } from "react";

import TasksFilter from "./TasksFilter";

export default class Footer extends Component {
  render() {
    const { tasks, filter, callbacks } = this.props;

    const numActiveTasks = tasks.reduce(
      (acc, val) => (!val.completed ? acc + 1 : acc),
      0
    );

    return (
      <footer className="footer">
        <span className="todo-count">{numActiveTasks} items left</span>
        <TasksFilter filter={filter} callbacks={callbacks} />
        <button className="clear-completed" onClick={callbacks.clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
