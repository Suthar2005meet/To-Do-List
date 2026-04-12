import { useState } from 'react'
import AppRouter from './Router/AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AppRouter />
    </div>
  )
}

export default App
