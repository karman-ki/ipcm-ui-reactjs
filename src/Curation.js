import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Table, InitSort, PrepareData } from "./Table.js";
import Pagination from "./Pagination.js";
import tableData from "./curation_data.json"
import TableEntries from "./TableEntries";
import TableSearchBar from "./TableSearchBar";
import { useState } from 'react';
import "react-widgets/styles.css";
import { GrRefresh } from "react-icons/gr";



const columns = [
    { label: "Sample ID", accessor: "sample_id", sortable: true, searchable: true },
    { label: "Capture ID", accessor: "capture_id", sortable: true, searchable: true },
    { label: "RID", accessor: "rid", sortable: true, searchable: true },
    { label: "Study ID", accessor: "study_id", sortable: true, searchable: true },
    { label: "Site name", accessor: "site_name", sortable: true, searchable: true },
    { label: "Created on", accessor: "created_on", sortable: true, sortbyOrder: "desc", searchable: true },
    { label: "Action", accessor: "action_cur", sortable: true, searchable: true }
];

const numEntries = [
    { value: 10, label: 10 },
    { value: 25, label: 25 },
    { value: 50, label: 50 },
    { value: 100, label: 100 }
]



function Curation() {

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
                    <h3>Curation</h3>

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


export default Curation;
