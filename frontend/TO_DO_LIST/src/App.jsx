import { useState } from 'react'
import AppRouter from './Router/AppRouter'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:3500";
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  )
}

export default App
