import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HashRouter, Routes, Route} from 'react-router-dom'
import App from './App.jsx'
import Assignement_1 from './assignments/Assignment_1.jsx'
import Assignments_2 from './assignments/Assignment_2.jsx'
import Assignment_3 from './assignments/Assignment_3.jsx'
import Assignment_4 from './assignments/Assignment_4.jsx'
import Assignment_5 from './assignments/Assignment_5.jsx'
import Assignment_6 from './assignments/Assignment_6.jsx'
import Assignment_7 from './assignments/Assignment_7.jsx'
import Assignment_8 from './assignments/Assignment_8.jsx'
import Assignment_9 from './assignments/Assignment_9.jsx'
import Assignment_10 from './assignments/Assignment_10.jsx'
import Assignement_11 from './assignments/Assignment_11.jsx'
import Assignment_12 from './assignments/Assignment_12.jsx'
import Assignement_13 from './assignments/Assignment_13.jsx'
import Assignment_14 from './assignments/Assignment_14.jsx'
import Assignement_15 from './assignments/Assignment_15.jsx'
import Assignment_16 from './assignments/Assignment_16.jsx'
import Assignment_17 from './assignments/Assignment_17.jsx'
import Assignment_18 from './assignments/Assignment_18.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App></App>}></Route>
      <Route path='/ASG_1' element={<Assignement_1></Assignement_1>}></Route>
      <Route path='/ASG_2' element={<Assignments_2></Assignments_2>}></Route>
      <Route path='/ASG_3' element={<Assignment_3></Assignment_3>}></Route>
      <Route path='/ASG_4' element={<Assignment_4></Assignment_4>}></Route>
      <Route path='/ASG_5' element={<Assignment_5></Assignment_5>}></Route>
      <Route path='/ASG_6' element={<Assignment_6></Assignment_6>}></Route>
      <Route path='/ASG_7' element={<Assignment_7></Assignment_7>}></Route>
      <Route path='/ASG_8' element={<Assignment_8></Assignment_8>}></Route>
      <Route path='/ASG_9' element={<Assignment_9></Assignment_9>}></Route>
      <Route path='/ASG_10' element={<Assignment_10></Assignment_10>}></Route>
      <Route path='/ASG_11' element={<Assignement_11></Assignement_11>}></Route>
      <Route path='/ASG_12' element={<Assignment_12></Assignment_12>}></Route>
      <Route path='/ASG_13' element={<Assignement_13></Assignement_13>}></Route>
      <Route path='/ASG_14' element={<Assignment_14></Assignment_14>}></Route>
      <Route path='/ASG_15' element={<Assignement_15></Assignement_15>}></Route>
      <Route path='/ASG_16' element={<Assignment_16></Assignment_16>}></Route>
      <Route path='/ASG_17' element={<Assignment_17></Assignment_17>}></Route>
      <Route path='/ASG_18' element={<Assignment_18></Assignment_18>}></Route>
    </Routes>
  </HashRouter>
)
