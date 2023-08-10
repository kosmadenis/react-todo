import { headerCallbacksPropTypes } from '../app-prop-types'

export default function NewTaskForm(props) {
  const { addTask } = props

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyDown={(e) => {
        if (e.key !== 'Enter') {
          return
        }

        const text = e.target.value
        e.target.value = ''

        if (!text) {
          return
        }

        addTask(text)
      }}
    />
  )
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}

NewTaskForm.propTypes = {
  ...headerCallbacksPropTypes,
}
