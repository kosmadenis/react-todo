import { headerCallbacksPropTypes } from '../../app-prop-types'
import NewTaskForm from '../NewTaskForm'

function Header(props) {
  const { addTask } = props

  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm addTask={addTask} />
    </header>
  )
}

Header.propTypes = {
  ...headerCallbacksPropTypes,
}

export default Header
