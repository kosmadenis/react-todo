import { filterPropTypes, tasksFilterCallbackPropTypes } from '../app-prop-types'

export default function TasksFilter(props) {
  const { filter, setFilter } = props

  return (
    <ul className="filters">
      <li>
        <button type="button" className={filter === 'all' ? 'selected' : null} onClick={() => setFilter('all')}>
          All
        </button>
      </li>
      <li>
        <button type="button" className={filter === 'active' ? 'selected' : null} onClick={() => setFilter('active')}>
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'completed' ? 'selected' : null}
          onClick={() => setFilter('completed')}
        >
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
