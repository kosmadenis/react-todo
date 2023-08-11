import { footerCallbackPropTypes, statePropTypes } from '../../app-prop-types'
import TasksFilter from '../TasksFilter'

function Footer(props) {
  const { tasks, filter, clearCompleted, setFilter } = props

  const numberOfActiveTasks = tasks.reduce((count, task) => (!task.completed ? count + 1 : count), 0)

  return (
    <footer className="footer">
      <span className="todo-count">{numberOfActiveTasks} items left</span>
      <TasksFilter filter={filter} setFilter={setFilter} />
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

export default Footer
