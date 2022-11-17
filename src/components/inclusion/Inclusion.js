import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Table, InitSort, PrepareData } from "../table/Table";
import tableData from "../../data/inclusion_data.json";
import { useState } from 'react';
import "react-widgets/styles.css";
import { GrRefresh } from "react-icons/gr";
import Pagination from "../table/Pagination";
import TableEntries from "../table/TableEntries";
import TableSearchBar from "../table/TableSearchBar";



const columns = [
    { label: "Study ID", accessor: "study_id", sortable: true, searchable: true },
    { label: "Site name", accessor: "site_name", sortable: true, searchable: true },
    { label: "Created on", accessor: "created_on", sortable: true, sortbyOrder: "desc", searchable: true },
    { label: "Processing status", accessor: "processing_status", sortable: false, searchable: false }
];


function Inclusion() {

    var defaultEntriesPerPage = 10;
    var [initSortField, initSortOrder] = InitSort(columns);

    const [sortField, setSortField] = useState(initSortField);
    const [sortOrder, setSortOrder] = useState(initSortOrder);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState(columns[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(defaultEntriesPerPage);

    var [data, nPages] = PrepareData(tableData, columns, sortField, sortOrder, searchField, searchQuery, currentPage, entriesPerPage);

    return (
        <>
            <section>
                <div className='section-step'>
                    <h3>Sample processing</h3>

                    <div className='top-buttons'>
                        <button className='input-border action-buttons info-button'><GrRefresh className="button-icon" />Refresh</button>
                    </div>

                    <div className='table-top'>
                        <TableEntries
                            tableData={tableData}
                            defaultEntriesPerPage={defaultEntriesPerPage}
                            setEntriesPerPage={setEntriesPerPage}
                        />
                        <TableSearchBar
                            setSearchQuery={setSearchQuery}
                            setSearchField={setSearchField}
                        />
                    </div>

                    <div className='table-container'>
                        <Table
                            key={currentPage + ":" + entriesPerPage}
                            tableData={data}
                            columns={columns}
                            order={sortOrder}
                            sortField={sortField}
                            handleSort={(accessor, order) => {
                                setSortField(accessor);
                                setSortOrder(order);
                            }}
                            handleSearch={(query, accessor) => {
                                setSearchQuery(query);
                                setSearchField(accessor);
                            }}
                        />
                    </div>
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                </div>
            </section>
        </>
    );
}


export default Inclusion;
