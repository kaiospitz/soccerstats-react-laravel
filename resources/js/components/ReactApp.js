import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home'

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
