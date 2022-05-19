import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import EventWrapper from '../parts/EventWrapper'
import ApiService from '../services/ApiService'

const EventContainer = (props) => {
    // appState is responsible for loading status and the response data
    const [appState, setAppState] = useState({
        loading: false,
        data: null,
    })

    /**
     * On load:
     * Fetch the events from the API
     */
    useEffect(() => {
        /**
         * Async function to call and await data from the ApiService
         */
        async function fetchEventsData() {
            setAppState({ loading: true })

            try {
                const events = await ApiService.getAllEvents()

                if (events) {
                    setAppState({ loading: false, data: events })
                }
            } catch {
                /**
                 * Something went wroing in the API request
                 */
                setAppState({ loading: false, data: null })
            }
        }

        fetchEventsData()
    }, [])

    /**
     * Check if data succesfully loaded from the API
     */
    if (!appState.loading && appState.data) {
        let data = appState.data

        /**
         * Reverse the array for results so the dates are descending
         * If we're handling the fixtures then no need to do anything
         * since they are returned in ascending order
         */
        if (props.eventState === 'results') {
            data = data.slice(0).reverse()
        }

        const childProps = {
            data: data,
            eventState: props.eventState,
        }

        return <div className="wrapper">{EventWrapper(childProps)}</div>
    } else {
        /**
         * API request loading; show the spinner
         */
        return <div className="wrapper">{LoadingSpinner()}</div>
    }
}

export default EventContainer
