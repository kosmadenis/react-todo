import { Component } from "react";

import Task from "./Task";

import { statePropTypes, taskCallbackPropTypes } from "../app-prop-types";

export default class TaskList extends Component {
  render() {
    const { tasks, filter, ...callbacks } = this.props;

    const filteredTasks = tasks.filter((task) => {
      switch (filter) {
        case "active":
          return !task.completed;
        case "completed":
          return task.completed;
        case "all":
          return true;
        default:
          throw new Error(`Unknown filter value "${filter}"`);
      }
    });

    const taskElements = filteredTasks.map((task) => (
      <Task {...task} {...callbacks} key={task.id}></Task>
    ));

    return <ul className="todo-list">{taskElements}</ul>;
  }

  static propTypes = {
    ...statePropTypes,
    ...taskCallbackPropTypes,
  };
}
