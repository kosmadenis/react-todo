import TasksFilter from "./TasksFilter";

function Footer({ state }) {
  const numActiveTasks = state.tasks.reduce(
    (acc, val) => (!val.completed ? acc + 1 : acc),
    0
  );

  return (
    <footer className="footer">
      <span className="todo-count">{numActiveTasks} items left</span>
      <TasksFilter filter={state.filter} />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
}

export default Footer;
