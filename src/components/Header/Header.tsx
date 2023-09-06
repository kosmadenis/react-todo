import React from 'react'

import Form from './Form'

interface Props {
  addTask: (title: string, time: number) => void
}

const Header: React.FC<Props> = ({ addTask }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <Form addTask={addTask} />
    </header>
  )
}

export default Header
