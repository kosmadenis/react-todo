import React from 'react'

import { type TaskData, type TaskFilter } from '../../model/types'

import Filter from './Filter'

interface Props {
  tasks: TaskData[]
  filter: TaskFilter
  clearCompleted: () => void
  setFilter: (filter: TaskFilter) => void
}

const Footer: React.FC<Props> = ({
  tasks,
  filter,
  clearCompleted,
  setFilter,
}) => {
  const numberOfActiveTasks = tasks.reduce(
    (count, task) => (!task.completed ? count + 1 : count),
    0
  )

  return (
    <footer className="footer">
      <span className="todo-count">{numberOfActiveTasks} items left</span>
      <Filter filter={filter} setFilter={setFilter} />
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
