import React from 'react'

import { stripNonNumericalChars } from './util'

interface Props {
  addTask: (title: string, time: number) => void
}

const Form: React.FC<Props> = ({ addTask }) => {
  const [title, setTitle] = React.useState('')
  const [minutes, setMinutes] = React.useState('')
  const [seconds, setSeconds] = React.useState('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim() || /[^0-9]/.test(minutes) || /[^0-9]/.test(seconds)) {
      return
    }

    const numMinutes = minutes ? Number.parseInt(minutes, 10) : 0
    const numSeconds = seconds ? Number.parseInt(seconds, 10) : 0

    const time = numMinutes * 60 + numSeconds

    addTask(title, time)

    setTitle('')
    setMinutes('')
    setSeconds('')
  }

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    setTitle(text)
  }

  const onMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    const numericalText = stripNonNumericalChars(text)
    setMinutes(numericalText)
  }

  const onSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    const numericalText = stripNonNumericalChars(text)
    setSeconds(numericalText)
  }

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        value={title}
        onChange={onTitleChange}
        aria-label="new task text"
        className="new-todo"
        placeholder="Task"
        required
        autoFocus
      />
      <input
        value={minutes}
        onChange={onMinutesChange}
        aria-label="new task time minutes"
        className="new-todo-form__timer"
        placeholder="Min"
      />
      <input
        value={seconds}
        onChange={onSecondsChange}
        aria-label="new task time seconds"
        className="new-todo-form__timer"
        placeholder="Sec"
      />
      <button type="submit" aria-hidden hidden />
    </form>
  )
}

export default Form
