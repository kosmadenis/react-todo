export interface TaskData {
  id: number
  creationTime: Date
  title: string
  completed: boolean
  editing: boolean

  timerTime: number
  timerOrigin: number | null
  timerRunning: boolean
}

export enum TaskFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
