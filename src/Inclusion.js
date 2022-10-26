import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Table from "./Table.js";
import {InitSort} from "./Table.js";
import Pagination from "./Pagination.js";
import tableData from "./inclusion_data.json";
import TableEntries from "./TableEntries";
import TableSearchBar from "./TableSearchBar";
import { useState } from 'react';
import { SortData } from "./UpdateData";
import { SearchData } from "./UpdateData";
import "react-widgets/styles.css";
import { GrRefresh } from "react-icons/gr";



const columns = [
    { label: "Study ID", accessor: "study_id", sortable: true, searchable: true },
    { label: "Site name", accessor: "site_name", sortable: true, searchable: true },
    { label: "Created on", accessor: "created_on", sortable: true, sortbyOrder: "desc", searchable: true },
    { label: "Processing status", accessor: "processing_status", sortable: false, searchable: false }
];


function Inclusion() {

    var defaultEntriesPerPage = 10;
    var [initSortField, initSortOrder] = InitSort(columns);


    // Current sorting and search state
    const [sortField, setSortField] = useState(initSortField);
    const [sortOrder, setSortOrder] = useState(initSortOrder);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState(columns[0]);


    var data = SortData(tableData, sortField, sortOrder);
    data = SearchData(data, searchField, searchQuery, columns);

    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);

    // No of entries to be displayed on each page   
    const [entriesPerPage, setEntriesPerPage] = useState(defaultEntriesPerPage);

    const indexOfLastRecord = currentPage * entriesPerPage;
    const indexOfFirstRecord = indexOfLastRecord - entriesPerPage;

    // entries to be displayed on the current page
    const currentEntries = data.slice(indexOfFirstRecord,
        indexOfLastRecord);

    const nPages = Math.ceil(data.length / entriesPerPage)


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
                            tableData={currentEntries}
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
