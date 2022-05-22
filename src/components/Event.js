import React from 'react'

/**
 * Individual event wrapper
 */
const Event = (props) => {
    const {
        homeScore,
        awayScore,
        awayTeamName,
        homeTeamName,
        type,
        kickoffTime,
        homeTeamBadge,
        awayTeamBadge,
    } = props

    let displayDateString = ''

    if (type === 'fixtures') {
        const date = new Date(kickoffTime)
        displayDateString = date.toLocaleString('en-GB', {
            timeZone: 'Europe/London',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="eventWrapper">
            <div className="homeTeamName">
                {homeTeamName}{' '}
                <img className="teamBadger" src={homeTeamBadge} />
            </div>
            {/* Display the score on results */}
            {type === 'results' && (
                <div className="scoreWrapper">
                    {homeScore}
                    <span>-</span>
                    {awayScore}
                </div>
            )}

            {/* Display the time on fixtures */}
            {type === 'fixtures' && (
                <div className="dateWrapper">{displayDateString}</div>
            )}

            <div className="awayTeamName">
                <img className="teamBadger" src={`${awayTeamBadge}`} />
                {awayTeamName}{' '}
            </div>
        </div>
    )
}

export default Event
