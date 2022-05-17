import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <span>
                    Rake<strong>Stats</strong>
                </span>
            </Link>
        </div>
    )
}

export default Header
