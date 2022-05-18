import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'

/**
 * Layout
 */
const Layout = () => {
    return (
        <>
            <Header />
            <Navigation />
            <div id="content">
                <Outlet />
            </div>
        </>
    )
}

export default Layout
