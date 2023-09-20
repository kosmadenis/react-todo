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

const TIMER_UPDATE_INTERVAL = 1000

const Timer: React.FC<Props> = ({
  id,
  completed,
  timerTime,
  timerOrigin,
  pauseTaskTimer,
  resumeTaskTimer,
}) => {
  const [time, setTime] = React.useState(timeToString(timerTime, timerOrigin))

  React.useEffect(() => {
    if (timerOrigin) {
      const timer = window.setInterval(() => {
        setTime(timeToString(timerTime, timerOrigin))
      }, TIMER_UPDATE_INTERVAL)

      return () => clearInterval(timer)
    }

    return () => {}
  }, [timerOrigin, timerTime])

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

export default Timer
