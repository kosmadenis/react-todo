import { Component } from "react";

export default class TasksFilter extends Component {
  render() {
    const { filter, callbacks } = this.props;

    return (
      <ul className="filters">
        <li>
          <button
            className={filter === "all" ? "selected" : null}
            onClick={() => callbacks.setFilter("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={filter === "active" ? "selected" : null}
            onClick={() => callbacks.setFilter("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={filter === "completed" ? "selected" : null}
            onClick={() => callbacks.setFilter("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
