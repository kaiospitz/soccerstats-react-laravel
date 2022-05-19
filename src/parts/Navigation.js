import React from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * Navigation Bar
 */
const Navigation = () => {
    // Current route's path without leading slash
    const currRoute = useLocation().pathname.substring(1)

    return (
        <div id="navigation" className="wrapper">
            <span className="breadcrumbs">Football &gt;</span>

            <span className="leagueName">Premier League</span>

            <span className="endpoint">
                {currRoute === '' ? 'Results' : currRoute}
            </span>

            <div className="navWrapper">
                <ul>
                    <Link to="/">
                        <li className={currRoute === '' ? 'active' : ''}>
                            Results
                        </li>
                    </Link>
                    <Link to="/fixtures">
                        <li
                            className={currRoute === 'fixtures' ? 'active' : ''}
                        >
                            Fixtures
                        </li>
                    </Link>
                    <Link to="/table">
                        <li className={currRoute === 'table' ? 'active' : ''}>
                            Table
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Navigation
