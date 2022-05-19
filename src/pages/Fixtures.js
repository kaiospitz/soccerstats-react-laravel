import EventContainer from '../parts/EventContainer'

/**
 * Renders /fixtures page
 */
const Fixtures = () => {
    const props = {
        eventState: 'fixtures',
    }

    return EventContainer(props)
}

export default Fixtures
