import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Header
 */
const Header = () => {
    return (
        <div id="header" className="wrapper">
            <Link to="/">
                <span className="logo">
                    Soccer<strong>Stats</strong>
                </span>
            </Link>
        </div>
    )
}

export default Header
