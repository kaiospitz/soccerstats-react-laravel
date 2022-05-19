import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Header
 */
const Header = () => {
    return (
        <div id="header">
            <div className="wrapper">
                <Link to="/">
                    <span className="logo">
                        Soccer<strong>Stats</strong>
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Header
