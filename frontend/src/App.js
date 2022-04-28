import React from 'react'
import Register from './components/Register'
import Signin from './components/Signin'
import Body from './components/Body'
import { Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <Routes >
            <Route path = '/' element={<Signin />} />
            <Route path='/register' element={<Register /> } />
            <Route  path='/main' element={<Body />} />
        </Routes>
    )
}

export default App