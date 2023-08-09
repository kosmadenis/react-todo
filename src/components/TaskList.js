import Task from "./Task";

function TaskList({ state }) {
  const filteredTasks = state.tasks.filter((task) => {
    switch (state.filter) {
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
    const { id, ...data } = task;
    return <Task data={data} key={id}></Task>;
  });

  return <ul className="todo-list">{taskElements}</ul>;
}

export default TaskList;
