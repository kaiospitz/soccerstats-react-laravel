import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Results from '../pages/Results'
import Fixtures from '../pages/Fixtures'
import Table from '../pages/Table'

/**
 * Renders the router to the root
 */
const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Results />} />
                <Route path="/fixtures" element={<Fixtures />} />
                <Route path="/table" element={<Table />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
