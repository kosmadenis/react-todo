import { headerCallbacksPropTypes } from '../../app-prop-types'

function NewTaskForm(props) {
  const { addTask } = props

  const inputOnKeyDown = (event) => {
    if (event.key !== 'Enter') {
      return
    }

    const { target } = event

    const text = target.value
    target.value = ''

    if (!text) {
      return
    }

    addTask(text)
  }

  return (
    <input
      aria-label="new task text"
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyDown={inputOnKeyDown}
    />
  )
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}

NewTaskForm.propTypes = {
  ...headerCallbacksPropTypes,
}

export default NewTaskForm
