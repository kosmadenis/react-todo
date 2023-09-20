import React from 'react'

import Footer from '../Footer'
import Header from '../Header'
import TaskList from '../TaskList'
import { type TaskData, TaskFilter } from '../../model/types'
import * as taskUtil from '../../model/task'

interface Props {}

const DEFAULT_TASKS: TaskData[] = [
  {
    id: 2,
    creationTime: new Date(Date.now() - 17_000),
    title: 'Completed task',
    completed: true,
    editing: false,

    timerTime: 745,
    timerOrigin: null,
    timerRunning: false,
  },
  {
    id: 1,
    creationTime: new Date(Date.now() - 100_000),
    title: 'Editing task',
    completed: false,
    editing: true,

    timerTime: 61,
    timerOrigin: null,
    timerRunning: false,
  },
  {
    id: 0,
    creationTime: new Date(Date.now() - 300_000),
    title: 'Active task',
    completed: false,
    editing: false,

    timerTime: 10,
    timerOrigin: Date.now(),
    timerRunning: true,
  },
]

let currentId = DEFAULT_TASKS.length

const App: React.FC<Props> = () => {
  const [tasks, setTasks] = React.useState(DEFAULT_TASKS)
  const [filter, setFilter] = React.useState(TaskFilter.All)

  const addTask = (title: string, time: number) => {
    const newTask = taskUtil.create(currentId, title, time)

    currentId += 1

    setTasks((currentTasks) => [newTask, ...currentTasks])
  }

  const toggleTaskCompleted = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id) {
          return task
        }

        return task.completed
          ? taskUtil.setActive(task)
          : taskUtil.setCompleted(task)
      })
    )
  }

  const setTaskTitle = (id: number, title: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? taskUtil.setTitle(task, title) : task
      )
    )
  }

  const startEditingTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? taskUtil.startEditing(task) : task
      )
    )
  }

  const finishEditingTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks
        .filter((task) => task.id !== id || !!task.title)
        .map((task) => (task.id === id ? taskUtil.stopEditing(task) : task))
    )
  }

  const removeTask = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  const clearCompleted = () => {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed))
  }

  const resumeTaskTimer = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? taskUtil.resumeTimer(task) : task
      )
    )
  }

  const pauseTaskTimer = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? taskUtil.pauseTimer(task) : task
      )
    )
  }

  return (
    <section className="todoapp">
      <Header addTask={addTask} />
      <section className="main">
        <TaskList
          tasks={tasks}
          filter={filter}
          toggleTaskCompleted={toggleTaskCompleted}
          setTaskTitle={setTaskTitle}
          startEditingTask={startEditingTask}
          finishEditingTask={finishEditingTask}
          removeTask={removeTask}
          resumeTaskTimer={resumeTaskTimer}
          pauseTaskTimer={pauseTaskTimer}
        />
        <Footer
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  )
}

export default App
