import React, { useEffect, useState } from 'react'
import ApiService from '../services/ApiService'
import TableSorting from '../components/SortedTable'
import LoadingSpinner from '../components/LoadingSpinner'

/**
 * Renders /table page
 */
const TablePage = () => {
    const [tableData, setTableData] = useState()
    const [isLoading, setIsLoading] = useState()

    /**
     * On load:
     * Fetch the table data from the API
     */
    useEffect(() => {
        /**
         * Async function to call and await data from the ApiService
         */
        async function fetchTableData() {
            setIsLoading(true)

            try {
                const data = await ApiService.getTable()

                if (data) {
                    /**
                     * Successfull request;
                     * Format the team's form to display in the table
                     */
                    data.table.map((row, i) => {
                        let newForm = ''

                        for (var x = 0; x < row.strForm.length; x++) {
                            if (row.strForm.charAt(x) == 'D') {
                                newForm += ' ⬜ '
                            } else if (row.strForm.charAt(x) == 'W') {
                                newForm += ' 🟩 '
                            } else if (row.strForm.charAt(x) == 'L') {
                                newForm += ' 🟥 '
                            }
                        }

                        row.strForm = newForm
                    })

                    setTableData(data)
                    setIsLoading(false)
                }
            } catch (err) {
                /**
                 * Something went wroing in the API request
                 */
                console.log(err)
                setIsLoading(false)
            }
        }

        fetchTableData()
    }, [])

    /**
     * Set table headers
     */
    const columns = React.useMemo(
        () => [
            {
                Header: 'Premier League 2021/22',
                columns: [
                    {
                        Header: '#',
                        accessor: 'intRank',
                    },
                    {
                        Header: 'Team',
                        accessor: 'strTeam',
                    },
                    {
                        Header: 'PI',
                        accessor: 'intPlayed',
                    },
                    {
                        Header: 'W',
                        accessor: 'intWin',
                    },
                    {
                        Header: 'D',
                        accessor: 'intDraw',
                    },
                    {
                        Header: 'L',
                        accessor: 'intLoss',
                    },
                    {
                        Header: 'GF',
                        accessor: 'intGoalsFor',
                    },
                    {
                        Header: 'GA',
                        accessor: 'intGoalsAgainst',
                    },
                    {
                        Header: 'GD',
                        accessor: 'intGoalDifference',
                    },
                    {
                        Header: 'Pts',
                        accessor: 'intPoints',
                    },
                    {
                        Header: 'Form',
                        accessor: 'strForm',
                    },
                ],
            },
        ],
        []
    )

    if (tableData && !isLoading) {
        {
            /* Succesfull render */
        }
        console.log(tableData.table)
        /* Render table */
        return (
            <div className="wrapper">
                <TableSorting columns={columns} data={tableData.table} />
            </div>
        )
    } else {
        {
            /* Loading, show spinner */
        }
        return <div className="wrapper">{LoadingSpinner()}</div>
    }
}

export default TablePage
