import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Table, InitSort, PrepareData } from "../table/Table";
import tableData from "../../data/biobank_data.json";
import { useState } from 'react';
import "react-widgets/styles.css";
import { GrRefresh } from "react-icons/gr";
import { RiDatabase2Fill } from "react-icons/ri";
import Pagination from "../table/Pagination";
import TableEntries from "../table/TableEntries";
import TableSearchBar from "../table/TableSearchBar";


const columns = [
    { label: "PNR", accessor: "pnr", sortable: true, searchable: true },
    { label: "Date", accessor: "date", sortable: true, sortbyOrder: "desc", searchable: true },
    { label: "RID", accessor: "rid", sortable: true, searchable: true },
    { label: "CDK", accessor: "cdk", sortable: true, searchable: true },
    { label: "Blood", accessor: "blood", sortable: true, searchable: true },
    { label: "DNA1", accessor: "dna1", sortable: true, searchable: true },
    { label: "DNA2", accessor: "dna2", sortable: true, searchable: true }

];
//src/components/referral-db
// const numEntries = [
//     { value: 10, label: 10 },
//     { value: 25, label: 25 },
//     { value: 50, label: 50 },
//     { value: 100, label: 100 }
// ]  



function Referral() {

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
                    <h3>Referral DB from KI Biobank</h3>

                    <div className='top-buttons'>
                        <button className='input-border action-buttons edit-button'><RiDatabase2Fill className="button-icon" />Update ReferralDB</button>
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


export default Referral;
