import { Component } from "react";

import TasksFilter from "./TasksFilter";
import { footerCallbackPropTypes, statePropTypes } from "../app-prop-types";

export default class Footer extends Component {
  render() {
    const { tasks, filter, clearCompleted, ...callbacks } = this.props;

    const numActiveTasks = tasks.reduce(
      (acc, val) => (!val.completed ? acc + 1 : acc),
      0
    );

    return (
      <footer className="footer">
        <span className="todo-count">{numActiveTasks} items left</span>
        <TasksFilter filter={filter} {...callbacks} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }

  static defaultProps = {
    clearCompleted: () => {},
  };

  static propTypes = {
    ...statePropTypes,
    ...footerCallbackPropTypes,
  };
}
