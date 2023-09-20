import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import { type TaskData } from '../../model/types'

import Timer from './Timer'

interface Props extends TaskData {
  toggleTaskCompleted: (id: number) => void
  setTaskTitle: (id: number, title: string) => void
  startEditingTask: (id: number) => void
  finishEditingTask: (id: number) => void
  removeTask: (id: number) => void
  pauseTaskTimer: (id: number) => void
  resumeTaskTimer: (id: number) => void
}

const TIME_UPDATE_INTERVAL = 60 * 1000

const Task: React.FC<Props> = ({
  id,
  creationTime,
  title,
  completed,
  editing,

  timerTime,
  timerOrigin,

  toggleTaskCompleted,
  setTaskTitle,
  startEditingTask,
  finishEditingTask,
  removeTask,
  pauseTaskTimer,
  resumeTaskTimer,
}) => {
  const [time, setTime] = React.useState(formatDistanceToNow(creationTime))

  React.useEffect(() => {
    const timer = setInterval(
      () => setTime(formatDistanceToNow(creationTime)),
      TIME_UPDATE_INTERVAL
    )

    return () => clearInterval(timer)
  }, [creationTime])

  let input

  if (editing) {
    const inputOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter' && event.key !== 'Escape') {
        return
      }

      finishEditingTask(id)
    }

    const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      return setTaskTitle(id, event.target.value)
    }

    input = (
      <input
        autoFocus
        aria-label="task text"
        type="text"
        className="edit"
        value={title}
        onKeyDown={inputOnKeyDown}
        onChange={inputOnChange}
      />
    )
  }

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
    <>
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
          <span className="title">{title}</span>
          <Timer
            id={id}
            completed={completed}
            timerTime={timerTime}
            timerOrigin={timerOrigin}
            pauseTaskTimer={pauseTaskTimer}
            resumeTaskTimer={resumeTaskTimer}
          />
          <span className="description">{time}</span>
        </label>
        <button
          type="button"
          aria-label="edit"
          className="icon icon-edit"
          onClick={editButtonOnClick}
        />
        <button
          type="button"
          aria-label="remove"
          className="icon icon-destroy"
          onClick={removeButtonOnClick}
        />
      </div>
      {input}
    </>
  )
}

export default Task
