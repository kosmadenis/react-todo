import React from 'react'

import { TaskFilter } from '../../model/types'

interface Props {
  filter: TaskFilter
  setFilter: (filter: TaskFilter) => void
}

const Filter: React.FC<Props> = ({ filter, setFilter }) => {
  const filterAllOnClick = () => {
    setFilter(TaskFilter.All)
  }

  const filterActiveOnClick = () => {
    setFilter(TaskFilter.Active)
  }

  const filterCompletedOnClick = () => {
    setFilter(TaskFilter.Completed)
  }

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={filter === 'all' ? 'selected' : undefined}
          onClick={filterAllOnClick}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'active' ? 'selected' : undefined}
          onClick={filterActiveOnClick}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'completed' ? 'selected' : undefined}
          onClick={filterCompletedOnClick}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default Filter
