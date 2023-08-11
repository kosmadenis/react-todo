import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { taskCallbackPropTypes, taskPropTypes } from '../../app-prop-types'

class Task extends Component {
  static timeTextUpdateInterval = 60 * 1000 // 1 минута

  timeTextTimer = null

  constructor(props) {
    super(props)

    this.state = {
      ...this.createTimeState(),
    }
  }

  componentDidMount() {
    // Таймер обновления (относительного) времени создания таска:
    this.timeTextTimer = setInterval(() => this.setState(this.createTimeState()), Task.timeTextUpdateInterval)
  }

  componentWillUnmount() {
    clearInterval(this.timeTextTimer)
  }

  createTimeState() {
    const { creationTime } = this.props

    return {
      timeText: formatDistanceToNow(creationTime),
    }
  }

  render() {
    const {
      id,
      description,
      completed,
      editing,

      toggleTaskCompleted,
      setTaskDescription,
      startEditingTask,
      finishEditingTask,
      removeTask,
    } = this.props

    let className = ''
    let input

    if (editing) {
      className += ' editing'

      const inputOnKeyDown = (event) => {
        if (event.key !== 'Enter' && event.key !== 'Escape') {
          return
        }

        finishEditingTask(id)
      }

      const inputOnChange = (event) => {
        return setTaskDescription(id, event.target.value)
      }

      input = (
        <input
          autoFocus
          aria-label="task text"
          type="text"
          className="edit"
          value={description}
          onKeyDown={inputOnKeyDown}
          onChange={inputOnChange}
        />
      )
    }

    if (completed) {
      className += ' completed'
    }

    const { timeText } = this.state

    const checkboxOnChange = () => {
      toggleTaskCompleted(id)
    }

    const editButtonOnClick = () => {
      startEditingTask(id)
    }

    const removeButtonOnClick = () => {
      removeTask(id)
    }

    const checkboxId = `Task-${id}`

    return (
      <li className={className}>
        <div className="view">
          <input
            aria-label="toggle completion"
            id={checkboxId}
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={checkboxOnChange}
          />
          <label htmlFor={checkboxId}>
            <span className="description">{description}</span>
            <span className="created">{timeText}</span>
          </label>
          <button type="button" aria-label="edit" className="icon icon-edit" onClick={editButtonOnClick} />
          <button type="button" aria-label="remove" className="icon icon-destroy" onClick={removeButtonOnClick} />
        </div>
        {input}
      </li>
    )
  }
}

Task.defaultProps = {
  toggleTaskCompleted: () => {},
  setTaskDescription: () => {},
  startEditingTask: () => {},
  finishEditingTask: () => {},
  removeTask: () => {},
}

Task.propTypes = {
  ...taskPropTypes,
  ...taskCallbackPropTypes,
}

export default Task
