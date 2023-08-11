import { statePropTypes, taskCallbackPropTypes } from '../../app-prop-types'
import Task from '../Task'

function TaskList(props) {
  const { tasks, filter, ...callbacks } = props

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed
    }

    if (filter === 'completed') {
      return task.completed
    }

    return true
  })

  const taskElements = filteredTasks.map((task) => (
    // Airbnb конфиг для ESLint не позволяет деструктурировать объекты в props,
    // поэтому такое кошмарное уродство :(
    <Task
      key={task.id}
      id={task.id}
      creationTime={task.creationTime}
      description={task.description}
      completed={task.completed}
      editing={task.editing}
      toggleTaskCompleted={callbacks.toggleTaskCompleted}
      setTaskDescription={callbacks.setTaskDescription}
      startEditingTask={callbacks.startEditingTask}
      finishEditingTask={callbacks.finishEditingTask}
      removeTask={callbacks.removeTask}
    />
  ))

  return <ul className="todo-list">{taskElements}</ul>
}

TaskList.propTypes = {
  ...statePropTypes,
  ...taskCallbackPropTypes,
}

export default TaskList
