import React from 'react'

import Footer from '../Footer'
import Header from '../Header'
import TaskList from '../TaskList'
import { type TaskData, TaskFilter } from '../../model/types'
import * as taskUtil from '../../model/task'

interface Props {}

interface State {
  filter: TaskFilter
  tasks: TaskData[]
}

const App = class extends React.Component<Props, State> {
  currentId: number

  constructor(props: Props) {
    super(props)

    const tasks: TaskData[] = [
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

    this.currentId = tasks.length

    this.state = {
      filter: TaskFilter.All,
      tasks,
    }
  }

  addTask = (title: string, time: number) => {
    const newTask = taskUtil.create(this.currentId, title, time)

    this.currentId += 1

    this.setState(({ tasks }: State) => ({
      tasks: [newTask, ...tasks.slice()],
    }))
  }

  toggleTaskCompleted = (id: number) => {
    this.setState(({ tasks }: State) => ({
      tasks: tasks.map((task) => {
        if (task.id !== id) {
          return task
        }

        return task.completed
          ? taskUtil.setActive(task)
          : taskUtil.setCompleted(task)
      }),
    }))
  }

  setTaskTitle = (id: number, title: string) => {
    this.setState(({ tasks }: State) => ({
      tasks: tasks.map((task) =>
        task.id === id ? taskUtil.setTitle(task, title) : task
      ),
    }))
  }

  startEditingTask = (id: number) => {
    this.setState(({ tasks }: State) => ({
      tasks: tasks.map((task) =>
        task.id === id ? taskUtil.startEditing(task) : task
      ),
    }))
  }

  finishEditingTask = (id: number) => {
    this.setState(({ tasks }: State) => ({
      tasks: tasks
        .filter((task) => task.id !== id || !!task.title)
        .map((task) => (task.id === id ? taskUtil.stopEditing(task) : task)),
    }))
  }

  removeTask = (id: number) => {
    this.setState(({ tasks }: State) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }))
  }

  setFilter = (filter: TaskFilter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState(({ tasks }: State) => ({
      tasks: tasks.filter((task) => !task.completed),
    }))
  }

  resumeTaskTimer = (id: number) => {
    this.setState(({ tasks }: State) => ({
      tasks: tasks.map((task) =>
        task.id === id ? taskUtil.resumeTimer(task) : task
      ),
    }))
  }

  pauseTaskTimer = (id: number) => {
    this.setState(({ tasks }: State) => ({
      tasks: tasks.map((task) =>
        task.id === id ? taskUtil.pauseTimer(task) : task
      ),
    }))
  }

  override render() {
    const { filter, tasks } = this.state

    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <section className="main">
          <TaskList
            tasks={tasks}
            filter={filter}
            toggleTaskCompleted={this.toggleTaskCompleted}
            setTaskTitle={this.setTaskTitle}
            startEditingTask={this.startEditingTask}
            finishEditingTask={this.finishEditingTask}
            removeTask={this.removeTask}
            resumeTaskTimer={this.resumeTaskTimer}
            pauseTaskTimer={this.pauseTaskTimer}
          />
          <Footer
            tasks={tasks}
            filter={filter}
            setFilter={this.setFilter}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}

export default App
