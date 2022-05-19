import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import EventWrapper from '../components/EventWrapper'

/**
 * Home Page
 */
const Results = () => {
    // API endpoint to fetch past results
    const apiEndpoint =
        'https://www.thesportsdb.com/api/v1/json/50130162/eventsseason.php?id=4328&s=2021-2022'

    // appState is responsible for loading status and the response data
    const [appState, setAppState] = useState({
        loading: false,
        data: null,
    })

    /**
     * On compoment load:
     * Fetch the results data from the API
     */
    useEffect(() => {
        setAppState({ loading: true })

        fetch(apiEndpoint)
            .then((res) => res.json())
            .then((res) => {
                /**
                 * Check if we recieved our expected data
                 */
                if (res.events) {
                    setAppState({ loading: false, data: res })
                } else {
                    // Bad reponse, throw error
                    throw new Error('Unexpected data')
                }
            })
            .catch((err) => {
                /**
                 * Something went wrong, notify user
                 */
                console.log(err)
            })
    }, [])

    /**
     * Check if data succesfully loaded from the API
     */
    if (!appState.loading && appState.data) {
        console.log(appState.data)

        return <div className="wrapper">{EventWrapper(appState.data)}</div>
    } else {
        /**
         * API request loading; show the spinner
         */
        return <div className="wrapper">{LoadingSpinner()}</div>
    }
}

export default Results
