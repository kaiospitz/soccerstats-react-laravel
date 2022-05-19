import React from 'react'

/**
 * Individual event wrapper
 */
const Event = (props) => {
    const { homeScore, awayScore, awayTeamName, homeTeamName } = props

    return (
        <div className="eventWrapper">
            <div className="homeTeamName">{homeTeamName}</div>
            <div className="scoreWrapper">
                {homeScore}
                <span>-</span>
                {awayScore}
            </div>
            <div className="awayTeamName">{awayTeamName}</div>
        </div>
    )
}

export default Event
