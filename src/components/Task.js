import { Component } from "react";

import { formatDistanceToNow } from "date-fns";

export default class Task extends Component {
  timeTextTimer = null;

  state = {
    ...this.createTimeState(),
  };

  createTimeState() {
    return {
      timeText: formatDistanceToNow(this.props.creationTime),
    };
  }

  componentDidMount() {
    this.timeTextTimer = setInterval(
      () => this.setState(this.createTimeState()),
      60 * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timeTextTimer);
  }

  render() {
    const { id, description, completed, editing, callbacks } = this.props;

    const {
      toggleTaskCompleted,
      setTaskDescription,
      startEditingTask,
      finishEditingTask,
      removeTask,
    } = callbacks;

    let className = "";
    let input;

    if (editing) {
      className += " editing";

      input = (
        <input
          type="text"
          className="edit"
          value={description}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== "Escape") {
              return;
            }

            finishEditingTask(id);
          }}
          onChange={(event) => setTaskDescription(id, event.target.value)}
        />
      );
    }

    if (completed) {
      className += " completed";
    }

    return (
      <li className={className}>
        <div className="view">
          <input
            id={`Task-${id}`}
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => toggleTaskCompleted(id)}
          />
          <label htmlFor={`Task-${id}`}>
            <span className="description">{description}</span>
            <span className="created">{this.state.timeText}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => startEditingTask(id)}
          ></button>
          <button
            className="icon icon-destroy"
            onClick={() => removeTask(id)}
          ></button>
        </div>
        {input}
      </li>
    );
  }
}
