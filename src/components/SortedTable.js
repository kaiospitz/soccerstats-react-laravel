/* eslint-disable react/jsx-key */
import React from 'react'
import { useTable, useSortBy } from 'react-table'

function TableSorting({ columns, data }) {
    /**
     * Use the state and functions returned from useTable to build your UI
     */
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
            },
            useSortBy
        )

    /**
     * Render the table
     */
    return (
        <>
            <table className="sortedTable" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    <div className="thWrapper">
                                        <div className="headerWrapper">
                                            {column.render('Header')}
                                        </div>
                                        {/* Add a sort direction indicator */}
                                        <div
                                            className={
                                                column.isSorted
                                                    ? column.isSortedDesc
                                                        ? 'upArrow'
                                                        : 'downArrow'
                                                    : ''
                                            }
                                        ></div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default TableSorting
