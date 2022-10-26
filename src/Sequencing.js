import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Table from "./Table.js";
import {InitSort} from "./Table.js";
import Pagination from "./Pagination.js";
import tableData from "./sequencing_data.json";
import TableEntries from "./TableEntries";
import TableSearchBar from "./TableSearchBar";
import { useState } from 'react';
import { SortData } from "./UpdateData";
import { SearchData } from "./UpdateData";
import Select from "react-select";
import "react-widgets/styles.css";
import { GrRefresh } from "react-icons/gr";
import { FiUpload } from "react-icons/fi";




const columns = [
    { label: "Sequence name", accessor: "sequence_name", sortable: true, searchable: true },
    { label: "CFDNA", accessor: "cfdna", sortable: true, searchable: true },
    { label: "RID", accessor: "rid", sortable: true, searchable: true },
    { label: "Study ID", accessor: "study_id", sortable: true, searchable: true },
    { label: "Site name", accessor: "site_name", sortable: true, searchable: true },
    { label: "Created on", accessor: "created_on", sortbyOrder: "desc", sortable: true, searchable: true },
    { label: "Status", accessor: "status", sortable: true, searchable: true }

];

const numEntries = [
    { value: 10, label: 10 },
    { value: 25, label: 25 },
    { value: 50, label: 50 },
    { value: 100, label: 100 }
]



function Sequencing() {

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

    // No of Entries to be displayed on each page   
    const [entriesPerPage, setEntriesPerPage] = useState(defaultEntriesPerPage);

    const indexOfLastRecord = currentPage * entriesPerPage;
    const indexOfFirstRecord = indexOfLastRecord - entriesPerPage;

    // Entries to be displayed on the current page
    const currentEntries = data.slice(indexOfFirstRecord,
        indexOfLastRecord);

    const nPages = Math.ceil(data.length / entriesPerPage)


    return (
        <>
            <section>
                <div className='section-step'>
                    <h3>Sequencing</h3>

                    <div className='top-buttons'>
                        <button className='input-border action-buttons edit-button'><FiUpload className="button-icon" />Upload orderform</button>
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


export default Sequencing;
