/**
 * Set the API url's according to the enviroment
 */
const currEnviroment = process.env.APP_ENV
let baseApiUrl = ''

if (currEnviroment == 'production') {
    baseApiUrl = process.env.PRODUCTION_API_URL
} else if (currEnviroment == 'development') {
    baseApiUrl = process.env.DEVELOPMENT_API_URL
}

const eventsEndpoint = baseApiUrl + '/api/events'
const tablesEndpoint = baseApiUrl + '/api/tables'

/**
 * API Client
 */
export default {
    getAllEvents: async function () {
        const result = await fetch(eventsEndpoint)
            .then((res) => res.json())
            .then((res) => {
                //console.log(res)
                return res
            })
            .catch(() => {
                /**
                 * Something went wrong
                 */
                throw new Error('catch_error')
            })

        // Wait for fetch to finish before returning our data
        if (result) {
            // Check if we recieved our expected data
            if (result.events) {
                return result.events
            } else {
                // Bad reponse, throw error
                throw new Error('Unexpected data')
            }
        }
    },

    getTable: async function () {
        const result = await fetch(tablesEndpoint)
            .then((res) => res.json())
            .then((res) => {
                //console.log(res)
                return res
            })
            .catch(() => {
                /**
                 * Something went wrong
                 */
                throw new Error('catch_error')
            })

        // Wait for fetch to finish before returning our data
        if (result) {
            return result
        }
    },
}
