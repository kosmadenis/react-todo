function TasksFilter({ filter }) {
  return (
    <ul className="filters">
      <li>
        <button className={filter === "all" ? "selected" : null}>All</button>
      </li>
      <li>
        <button className={filter === "active" ? "selected" : null}>Active</button>
      </li>
      <li>
        <button className={filter === "completed" ? "selected" : null}>Completed</button>
      </li>
    </ul>
  );
}

export default TasksFilter;
