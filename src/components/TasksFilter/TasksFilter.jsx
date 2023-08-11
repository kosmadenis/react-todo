import { filterPropTypes, tasksFilterCallbackPropTypes } from '../../app-prop-types'

function TasksFilter(props) {
  const { filter, setFilter } = props

  const filterAllOnClick = () => {
    setFilter('all')
  }

  const filterActiveOnClick = () => {
    setFilter('active')
  }

  const filterCompletedOnClick = () => {
    setFilter('completed')
  }

  return (
    <ul className="filters">
      <li>
        <button type="button" className={filter === 'all' ? 'selected' : null} onClick={filterAllOnClick}>
          All
        </button>
      </li>
      <li>
        <button type="button" className={filter === 'active' ? 'selected' : null} onClick={filterActiveOnClick}>
          Active
        </button>
      </li>
      <li>
        <button type="button" className={filter === 'completed' ? 'selected' : null} onClick={filterCompletedOnClick}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.defaultProps = {
  setFilter: () => {},
}

TasksFilter.propTypes = {
  ...filterPropTypes,
  ...tasksFilterCallbackPropTypes,
}

export default TasksFilter
