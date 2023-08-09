import { Component } from "react";

import Footer from "./Footer";
import Header from "./Header";
import TaskList from "./TaskList";

export default class App extends Component {
  /* --- Поля --- */

  currentId = 3;

  state = {
    filter: "all",
    tasks: [
      {
        id: 2,
        creationTime: new Date(Date.now() - 17_000),
        description: "Completed task",
        completed: true,
        editing: false,
      },
      {
        id: 1,
        creationTime: new Date(Date.now() - 100_000),
        description: "Editing task",
        completed: false,
        editing: true,
      },
      {
        id: 0,
        creationTime: new Date(Date.now() - 300_000),
        description: "Active task",
        completed: false,
        editing: false,
      },
    ],
  };

  /* --- Привязанные методы --- */

  addTask = (description) => {
    const newTask = {
      id: this.currentId,
      creationTime: new Date(),
      description,
      completed: false,
      editing: false,
    };

    this.currentId += 1;

    this.setState(({ tasks }) => ({
      tasks: [newTask, ...tasks.slice()],
    }));
  };

  toggleTaskCompleted = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) =>
        task.id === id
          ? Object.assign({}, task, { completed: !task.completed })
          : task
      ),
    }));
  };

  setTaskDescription = (id, description) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) =>
        task.id === id ? Object.assign({}, task, { description }) : task
      ),
    }));
  };

  startEditingTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) =>
        task.id === id ? Object.assign({}, task, { editing: true }) : task
      ),
    }));
  };

  finishEditingTask = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = [];

      for (const task of tasks) {
        if (task.id === id) {
          if (task.description) {
            newTasks.push(Object.assign({}, task, { editing: false }));
          }
          // Иначе, если текст пустой, таск удалаяется
        } else {
          newTasks.push(task);
        }
      }

      return {
        tasks: newTasks,
      };
    });
  };

  removeTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }));
  };

  setFilter = (newFilter) => {
    this.setState(({ filter: oldFilter }) => ({
      filter: oldFilter === newFilter ? null : newFilter,
    }));
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed),
    }));
  };

  /* --- Методы --- */

  render() {
    return (
      <section className="todoapp">
        <Header callbacks={{ addTask: this.addTask }} />
        <section className="main">
          <TaskList
            {...this.state}
            callbacks={{
              toggleTaskCompleted: this.toggleTaskCompleted,
              setTaskDescription: this.setTaskDescription,
              startEditingTask: this.startEditingTask,
              finishEditingTask: this.finishEditingTask,
              removeTask: this.removeTask,
            }}
          />
          <Footer
            {...this.state}
            callbacks={{
              setFilter: this.setFilter,
              clearCompleted: this.clearCompleted,
            }}
          />
        </section>
      </section>
    );
  }
}
