import { type TaskData } from './types'

export function create(id: number, title: string, time: number): TaskData {
  return {
    id,
    creationTime: new Date(),
    title,
    completed: false,
    editing: false,

    timerTime: time,
    timerOrigin: Date.now(),
    timerRunning: true,
  }
}

export function setActive(task: TaskData): TaskData {
  return {
    ...task,
    completed: false,
    timerOrigin: task.timerRunning ? Date.now() : null,
  }
}

export function setCompleted(task: TaskData): TaskData {
  const modifiedTask = {
    ...task,
    completed: true,
    timerOrigin: null,
  }

  if (task.timerRunning && task.timerOrigin) {
    modifiedTask.timerTime += Math.max(0, Date.now() - task.timerOrigin) / 1000
  }

  return modifiedTask
}

export function setTitle(task: TaskData, title: string): TaskData {
  return {
    ...task,
    title,
  }
}

export function startEditing(task: TaskData): TaskData {
  return {
    ...task,
    editing: true,
  }
}

export function stopEditing(task: TaskData): TaskData {
  return {
    ...task,
    editing: false,
  }
}

export function resumeTimer(task: TaskData): TaskData {
  const modifiedTask = {
    ...task,
    timerOrigin: Date.now(),
    timerRunning: true,
  }

  if (task.timerRunning && task.timerOrigin) {
    modifiedTask.timerTime += Math.max(0, Date.now() - task.timerOrigin) / 1000
  }

  return modifiedTask
}

export function pauseTimer(task: TaskData): TaskData {
  const modifiedTask = {
    ...task,
    timerOrigin: null,
    timerRunning: false,
  }

  if (task.timerRunning && task.timerOrigin) {
    modifiedTask.timerTime += Math.max(0, Date.now() - task.timerOrigin) / 1000
  }

  return modifiedTask
}
