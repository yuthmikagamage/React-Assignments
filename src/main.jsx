import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HashRouter, Routes, Route} from 'react-router-dom'
import App from './App.jsx'
import Assignement_1 from './assignments/Assignment_1.jsx'
import Assignments_2 from './assignments/Assignment_2.jsx'
import Assignment_3 from './assignments/Assignment_3.jsx'
import Assignment_4 from './assignments/Assignment_4.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App></App>}></Route>
      <Route path='/ASG_1' element={<Assignement_1></Assignement_1>}></Route>
      <Route path='/ASG_2' element={<Assignments_2></Assignments_2>}></Route>
      <Route path='/ASG_3' element={<Assignment_3></Assignment_3>}></Route>
      <Route path='/ASG_4' element={<Assignment_4></Assignment_4>}></Route>
    </Routes>
  </HashRouter>
)
