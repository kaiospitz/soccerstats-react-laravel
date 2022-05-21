import React from 'react'
import { Link } from 'react-router-dom'
import Event from '../components/Event'

/**
 * EventWrapper:
 * Iterate through the results and return the Event component for each result
 */
const EventWrapper = (props) => {
    var lastMonthString = ''
    var lastDateString = ''

    /**
     * Check if we should to print the month and year string
     */
    const shouldIPrintMonth = (eventDate) => {
        const date = new Date(eventDate)
        const monthString = date.toLocaleString('en-GB', {
            timeZone: 'Europe/London',
            month: 'long',
            year: 'numeric',
        })

        /**
         * Check if the current event's month is different then last month displayed
         * If different then we're in a new month; return true
         */
        if (monthString !== lastMonthString) {
            lastMonthString = monthString
            return true
        }
    }

    /**
     * Check if we should to print the date string
     */
    const shouldIPrintDate = (eventDate) => {
        const date = new Date(eventDate)
        const dateString = date.toLocaleString('en-GB', {
            timeZone: 'Europe/London',
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        })

        /**
         * Check if this event's date has already been displayed;
         * If differente then we're in a new month; return true
         */
        if (dateString !== lastDateString) {
            lastDateString = dateString
            return true
        }
    }

    /**
     * Filter the data by type
     * results or fixtures
     */
    let searchStatusString = ''
    if (props.eventState === 'results') {
        // results page; filter only finished matched
        searchStatusString = 'Match Finished'
    } else if (props.eventState === 'fixtures') {
        // fixtures page; filter only future matches
        searchStatusString = 'Not Started'
    }

    return (
        <div className="resultsWrapper">
            {props.data.map((event) => (
                <>
                    {/* Filters depending on current page */}
                    {event.strStatus === searchStatusString && (
                        <>
                            <>
                                {/* Check if we should print the month and year header */}
                                {shouldIPrintMonth(event.dateEvent) && (
                                    <span className="eventMonth">
                                        {lastMonthString}
                                    </span>
                                )}
                            </>
                            <>
                                {/* Check if we should print the date header */}
                                {shouldIPrintDate(event.dateEvent) && (
                                    <span className="eventDate">
                                        {lastDateString}
                                    </span>
                                )}
                            </>
                            <Event
                                key={event.idEvent}
                                homeScore={event.intHomeScore}
                                awayScore={event.intAwayScore}
                                awayTeamName={event.strAwayTeam}
                                homeTeamName={event.strHomeTeam}
                                type={props.eventState}
                                kickoffTime={event.strTimestamp}
                            />
                        </>
                    )}
                </>
            ))}
            {/* if lastDateString=='' then no events were processed;
                check if this is the fixtures page;
                if so this means the season has ended; display the message */}
            {lastDateString === '' && props.eventState === 'fixtures' && (
                <span className="finishedSeason">
                    The 2021-22 season has already ended.
                </span>
            )}
        </div>
    )
}

export default EventWrapper
