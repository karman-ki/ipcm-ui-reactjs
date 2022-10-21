import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Table from "./Table.js";
import Pagination from "./Pagination.js";
import tableData from "./inclusion_data.json";
import { useState } from 'react';
import { SortData } from "./UpdateData";
import { SearchData } from "./UpdateData";
import NumberPicker from "react-widgets/NumberPicker";
import Select from "react-select";
import "react-widgets/styles.css";
import { GrRefresh } from "react-icons/gr";



const columns = [
    { label: "Study ID", accessor: "study_id", sortable: true, searchable: true },
    { label: "Site name", accessor: "site_name", sortable: true, searchable: true },
    { label: "Created on", accessor: "created_on", sortable: true, sortbyOrder: "desc", searchable: true },
    { label: "Processing status", accessor: "processing_status", sortable: false, searchable: false }
];

const numRecords = [
    { value: 10, label: 10 },
    { value: 25, label: 25 },
    { value: 50, label: 50 },
    { value: 100, label: 100 }
]


var defaultRecordsPerPage = 10;

function Inclusion() {

    var initSortField;
    var initSortOrder;

    columns.forEach((col) => {
        if (col.sortbyOrder) {
            initSortField = col.accessor;
            initSortOrder = col.sortbyOrder;
        }
    });


    // Current sorting and search state
    const [sortField, setSortField] = useState(initSortField);
    const [sortOrder, setSortOrder] = useState(initSortOrder);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState(columns[0]);


    var data = SortData(tableData, sortField, sortOrder);
    data = SearchData(data, searchField, searchQuery, columns);

    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);

    // No of Records to be displayed on each page   
    const [recordsPerPage, setRecordsPerPage] = useState(defaultRecordsPerPage);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    // Records to be displayed on the current page
    const currentRecords = data.slice(indexOfFirstRecord,
        indexOfLastRecord);

    const nPages = Math.ceil(data.length / recordsPerPage)



    const changeRecordsPerPage = (value) => {
        setRecordsPerPage(Math.min(value, tableData.length));
    }

    function handleSearchAll(input) {
        setSearchQuery(input.value);
        setSearchField('all');
    }

    return (
        <>
            <section>
                <div className='section-step'>
                    <h3>Sample processing</h3>
                    
                    <div className='top-buttons'>
                        <button className='input-border action-buttons info-button'><GrRefresh className="button-icon" />Refresh</button>
                    </div>

                    <div className='table-top'>
                        <div>
                            Number of table entries:
                            <Select className='input select records-picker'
                                defaultValue={{ value: 10, label: 10 }}
                                onChange={(event) => changeRecordsPerPage(event.value)}
                                options={numRecords}
                            />
                        </div>
                        <div className='table-search'>
                            Search:
                            <input className="input input-border text-field table-searchfield"
                                type="text"
                                id="search-field"
                                title="Type in a name"
                                onChange={(event) => handleSearchAll(event.target)}>
                            </input>
                        </div>
                    </div>

                    <div className='table-container'>
                        <Table
                            key={currentPage + ":" + recordsPerPage}
                            tableData={currentRecords}
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
