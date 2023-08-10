import { footerCallbackPropTypes, statePropTypes } from '../app-prop-types'

import TasksFilter from './TasksFilter'

export default function Footer(props) {
  const { tasks, filter, clearCompleted, ...callbacks } = props

  const numActiveTasks = tasks.reduce((acc, val) => (!val.completed ? acc + 1 : acc), 0)

  return (
    <footer className="footer">
      <span className="todo-count">{numActiveTasks} items left</span>
      <TasksFilter filter={filter} setFilter={callbacks.setFilter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  clearCompleted: () => {},
}

Footer.propTypes = {
  ...statePropTypes,
  ...footerCallbackPropTypes,
}
