import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { taskCallbackPropTypes, taskPropTypes } from '../app-prop-types'

export default class Task extends Component {
  timeTextTimer = null

  constructor(props) {
    super(props)

    this.state = {
      ...this.createTimeState(),
    }
  }

  componentDidMount() {
    // Таймер обновления (относительного) времени создания таска:
    this.timeTextTimer = setInterval(() => this.setState(this.createTimeState()), 60 * 1000)
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

      input = (
        <input
          type="text"
          className="edit"
          value={description}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== 'Escape') {
              return
            }

            finishEditingTask(id)
          }}
          onChange={(event) => setTaskDescription(id, event.target.value)}
        />
      )
    }

    if (completed) {
      className += ' completed'
    }

    const { timeText } = this.state

    return (
      <li className={className}>
        <div className="view">
          <input
            id={`Task-${id}`}
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => toggleTaskCompleted(id)}
          />
          <label htmlFor={`Task-${id}`}>
            <span className="description">{description}</span>
            <span className="created">{timeText}</span>
          </label>
          <button type="button" aria-label="Edit" className="icon icon-edit" onClick={() => startEditingTask(id)} />
          <button type="button" aria-label="Remove" className="icon icon-destroy" onClick={() => removeTask(id)} />
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
