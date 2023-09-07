import React from 'react'

import Task from '../Task'
import { TaskFilter, type TaskData } from '../../model/types'

interface Props {
  tasks: TaskData[]
  filter: TaskFilter
  toggleTaskCompleted: (id: number) => void
  setTaskTitle: (id: number, title: string) => void
  startEditingTask: (id: number) => void
  finishEditingTask: (id: number) => void
  removeTask: (id: number) => void
  pauseTaskTimer: (id: number) => void
  resumeTaskTimer: (id: number) => void
}

const TaskList: React.FC<Props> = ({ tasks, filter, ...callbacks }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed
    }

    if (filter === 'completed') {
      return task.completed
    }

    return true
  })

  const taskElements = filteredTasks.map((task) => {
    const className =
      (task.editing ? 'editing' : '') + (task.completed ? ' completed' : '')

    return (
      <li key={task.id} className={className}>
        <Task {...task} {...callbacks} />
      </li>
    )
  })

  return <ul className="todo-list">{taskElements}</ul>
}

export default TaskList
