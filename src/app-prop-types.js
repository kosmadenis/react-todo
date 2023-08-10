import PropTypes from "prop-types";

// Пропсы состояния приложения (App.state) - все обязательны
// (не может возникнуть такой ситуации, где они не переданы).

export const taskPropTypes = {
  id: PropTypes.number.isRequired,
  creationTime: PropTypes.instanceOf(Date).isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
};

export const filterPropTypes = PropTypes.oneOf(["all", "active", "completed"]).isRequired;

export const statePropTypes = {
  filter: filterPropTypes,
  tasks: PropTypes.arrayOf(PropTypes.shape(taskPropTypes)).isRequired,
};

// Все коллбэки - необязательны
// (если нужно построить статический интерфейс).

export const taskCallbackPropTypes = {
  toggleTaskCompleted: PropTypes.func,
  setTaskDescription: PropTypes.func,
  startEditingTask: PropTypes.func,
  finishEditingTask: PropTypes.func,
  removeTask: PropTypes.func,
};

export const headerCallbacksPropTypes = {
  addTask: PropTypes.func,
};

export const tasksFilterCallbackPropTypes = {
  setFilter: PropTypes.func,
};

export const footerCallbackPropTypes = {
  ...tasksFilterCallbackPropTypes,
  clearCompleted: PropTypes.func,
};
