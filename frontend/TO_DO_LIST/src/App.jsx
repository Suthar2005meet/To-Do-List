import { useState } from 'react'
import AppRouter from './Router/AppRouter'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Axios defaults are now managed in src/Service/api.js
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  )
}

export default App
