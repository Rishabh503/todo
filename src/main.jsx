import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TaskManager from './components/TaskManager'
// import App from './App'
import App from './App.jsx'
import { DataProvider } from './contexts/DataContent'
// import TaskManager from '..src/componens'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <TaskManager /> */}
    <DataProvider>
      <App />
    </DataProvider>
    {/* <TaskManager/> */}
  </StrictMode>,
)
