import { Component } from 'react'

import Footer from '../Footer'
import Header from '../Header'
import TaskList from '../TaskList'

class App extends Component {
  constructor(props) {
    super(props)

    const tasks = [
      {
        id: 2,
        creationTime: new Date(Date.now() - 17_000),
        description: 'Completed task',
        completed: true,
        editing: false,
      },
      {
        id: 1,
        creationTime: new Date(Date.now() - 100_000),
        description: 'Editing task',
        completed: false,
        editing: true,
      },
      {
        id: 0,
        creationTime: new Date(Date.now() - 300_000),
        description: 'Active task',
        completed: false,
        editing: false,
      },
    ]

    this.currentId = tasks.length

    this.state = {
      filter: 'all',
      tasks,
    }
  }

  /* --- Привязанные методы --- */

  addTask = (description) => {
    const newTask = {
      id: this.currentId,
      creationTime: new Date(),
      description,
      completed: false,
      editing: false,
    }

    this.currentId += 1

    this.setState(({ tasks }) => ({
      tasks: [newTask, ...tasks.slice()],
    }))
  }

  toggleTaskCompleted = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }))
  }

  setTaskDescription = (id, description) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id === id ? { ...task, description } : task)),
    }))
  }

  startEditingTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id === id ? { ...task, editing: true } : task)),
    }))
  }

  finishEditingTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks
        // 1. Удалить этот таск, если текст пустой
        .filter((task) => task.id !== id || !!task.description)
        // 2. Выключить этому таску режим редактирования
        .map((task) => (task.id === id ? { ...task, editing: false } : task)),
    }))
  }

  removeTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }))
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed),
    }))
  }

  /* --- Методы --- */

  render() {
    const { filter, tasks } = this.state

    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <section className="main">
          <TaskList
            tasks={tasks}
            filter={filter}
            toggleTaskCompleted={this.toggleTaskCompleted}
            setTaskDescription={this.setTaskDescription}
            startEditingTask={this.startEditingTask}
            finishEditingTask={this.finishEditingTask}
            removeTask={this.removeTask}
          />
          <Footer tasks={tasks} filter={filter} setFilter={this.setFilter} clearCompleted={this.clearCompleted} />
        </section>
      </section>
    )
  }
}

export default App
