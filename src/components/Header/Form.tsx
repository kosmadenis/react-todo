import React from 'react'

import { stripNonNumericalChars } from './util'

interface Props {
  addTask: (title: string, time: number) => void
}

interface State {
  title: string
  minutes: string
  seconds: string
}

const Form = class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      title: '',
      minutes: '',
      seconds: '',
    }
  }

  override render() {
    const { title, minutes, seconds } = this.state

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const { addTask } = this.props

      const {
        title: currentTitle,
        minutes: currentMinutes,
        seconds: currentSeconds,
      } = this.state

      if (
        !currentTitle.trim() ||
        /[^0-9]/.test(currentMinutes) ||
        /[^0-9]/.test(currentSeconds)
      ) {
        return
      }

      const numMinutes = currentMinutes
        ? Number.parseInt(currentMinutes, 10)
        : 0
      const numSeconds = currentSeconds
        ? Number.parseInt(currentSeconds, 10)
        : 0

      const time = numMinutes * 60 + numSeconds

      addTask(currentTitle, time)

      this.setState({ title: '', minutes: '', seconds: '' })
    }

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value
      this.setState({ title: text })
    }

    const onMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value
      const numericalText = stripNonNumericalChars(text)
      this.setState({ minutes: numericalText })
    }

    const onSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value
      const numericalText = stripNonNumericalChars(text)
      this.setState({ seconds: numericalText })
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
}

export default Form
