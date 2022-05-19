const eventsEndpoint =
    'https://www.thesportsdb.com/api/v1/json/50130162/eventsseason.php?id=4328&s=2021-2022'

const tablesEndpoint =
    'https://www.thesportsdb.com/api/v1/json/2/lookuptable.php?l=4328&s=2021-2022'

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
