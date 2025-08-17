import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SigninForm from './pages/signin'
import SignupForm from './pages/signup'

import {HomePage} from './pages/home'
import CreateRoomPage from './pages/room'
import Canvas from './pages/canvas'
import FabricCanvas from './pages/canvas'


function App() {
  const token=localStorage.getItem('token') as string;
  const roomId=localStorage.getItem('roomId') as string;
  return (
    <>
   <BrowserRouter>
   <Routes>
     <Route path='/' element={<HomePage/>}/>
    <Route path='/signin' element={<SigninForm/>}/>
<Route path='/signup'  element={<SignupForm/>}/>
   <Route path='/canvas'  element={<FabricCanvas token={token} roomId={roomId}/>}/>
   <Route path='/room'  element={<CreateRoomPage/>}/>
    </Routes></BrowserRouter>
    </>
  )
}

export default App
