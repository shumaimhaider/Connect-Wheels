import {React, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <img src={viteLogo} alt="Vite logo" />
      <img src={reactLogo} alt="React logo" />
      <h1>Hello Vite + React!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increase</button>
    </>
  )
}

export default App
