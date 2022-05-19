import EventContainer from '../parts/EventContainer'

/**
 * Renders /results page
 */
const Results = () => {
    const props = {
        eventState: 'results',
    }

    return EventContainer(props)
}

export default Results
