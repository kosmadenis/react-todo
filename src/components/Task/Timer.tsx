import React from 'react'

import { timeToString } from './util'

interface Props {
  id: number
  completed: boolean
  timerTime: number
  timerOrigin: number | null
  pauseTaskTimer: (id: number) => void
  resumeTaskTimer: (id: number) => void
}

interface State {
  time: string
}

const TIMER_UPDATE_INTERVAL = 1000

const Timer = class extends React.Component<Props, State> {
  timer?: number

  constructor(props: Props) {
    super(props)

    const { timerTime, timerOrigin } = props

    this.state = {
      time: timeToString(timerTime, timerOrigin),
    }
  }

  override componentDidMount() {
    const { timerOrigin } = this.props

    if (timerOrigin) {
      this.startTimer()
    }
  }

  override componentDidUpdate(prevProps: Props) {
    const { timerOrigin } = this.props

    if (timerOrigin && !this.timer) {
      this.startTimer()
    }

    if (!timerOrigin && this.timer) {
      this.stopTimer()
    }

    if (timerOrigin !== prevProps.timerOrigin) {
      this.updateTime()
    }
  }

  override componentWillUnmount() {
    this.stopTimer()
  }

  startTimer() {
    this.timer = window.setInterval(
      () => this.updateTime(),
      TIMER_UPDATE_INTERVAL
    )
  }

  stopTimer() {
    window.clearInterval(this.timer)
    this.timer = undefined
  }

  updateTime() {
    const { timerTime, timerOrigin } = this.props
    this.setState({ time: timeToString(timerTime, timerOrigin) })
  }

  override render() {
    const { id, completed, timerOrigin, pauseTaskTimer, resumeTaskTimer } =
      this.props

    const { time } = this.state

    const timerRunning = !!timerOrigin

    let button = null

    if (!completed) {
      const onButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        event.preventDefault()
        if (timerRunning) {
          pauseTaskTimer(id)
        } else {
          resumeTaskTimer(id)
        }
      }

      const buttonClass = timerRunning ? 'icon-pause' : 'icon-play'

      button = (
        <button
          type="button"
          aria-label="resume timer"
          className={`icon ${buttonClass}`}
          onClick={onButtonClick}
        />
      )
    }

    return (
      <span className="description timer">
        {button}
        {time}
      </span>
    )
  }
}

export default Timer
