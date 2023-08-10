import { Component } from "react";
import {
  filterPropTypes,
  tasksFilterCallbackPropTypes,
} from "../app-prop-types";

export default class TasksFilter extends Component {
  render() {
    const { filter, setFilter } = this.props;

    return (
      <ul className="filters">
        <li>
          <button
            className={filter === "all" ? "selected" : null}
            onClick={() => setFilter("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={filter === "active" ? "selected" : null}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={filter === "completed" ? "selected" : null}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }

  static defaultProps = {
    setFilter: () => {},
  };

  static propTypes = {
    ...filterPropTypes,
    ...tasksFilterCallbackPropTypes,
  };
}
