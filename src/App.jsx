
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Auth from './components/Auth'
import Page from './components/page'
import Login from './components/Login'

 function App() {
  return (
   <Routes>
    <Route path="/" element={<Auth />}/>
    {/* <Route path="/Auth" element={<Auth />}/> */}
     <Route path="/Login" element={<Login />}/>
    <Route path="/Page" element={<Page />}/>
   </Routes>
  )
}

export default App
