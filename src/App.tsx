import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {

  return (

    <Routes>
       
        <Route path='/Home' element={ <h1>Vocabulary brother</h1> } />
        <Route path='/Me' element={ <h1>Me</h1> } />
        <Route path='*' element={ <Navigate to={'/'} /> } />

    </Routes>
   

  )
}

export default App
