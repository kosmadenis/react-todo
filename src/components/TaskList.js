import { Component } from "react";

import Task from "./Task";

export default class TaskList extends Component {
  render() {
    const {
      tasks,
      filter,
      callbacks,
    } = this.props;

    const filteredTasks = tasks.filter((task) => {
      switch (filter) {
        case "active":
          return !task.completed;
        case "completed":
          return task.completed;
        case "all":
          return true;
        default:
          return false;
      }
    });

    const taskElements = filteredTasks.map((task) => {
      return (
        <Task
          {...task}
          callbacks={callbacks}
          key={task.id}
        ></Task>
      );
    });

    return <ul className="todo-list">{taskElements}</ul>;
  }
}
