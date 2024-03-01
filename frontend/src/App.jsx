import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Navbar } from "./components/Navbar"
import "./style/input.css"
import Home from "./pages/Home"
import Scheduel from "./pages/Scheduel"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Teacher from "./components/Teacher"
import Class from "./components/Class"
import Subject from "./components/Subject"
import Routine from "./components/Routine"



const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path="/scheduel" element={<Scheduel/>}/>
        <Route exact path="/adminlogin" element={<Login/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/teacher" element={<Teacher/>}/>
        <Route exact path="/class" element={<Class/>}/>
        <Route exact path="/subjects" element={<Subject/>}/>
        <Route exact path="/routines" element={<Routine/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App