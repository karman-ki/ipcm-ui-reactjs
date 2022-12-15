import React, {useMemo } from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination} from "react-table";
import { GrRefresh } from "react-icons/gr";
import { FiUpload } from "react-icons/fi"; 
import axios from "axios";
import ColumnFilter from "../table-react/ColumnFilter";
import GlobalFilter from "../table-react/GlobalFilter";

import "react-widgets/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import '../table-react/Table.css';

import commonService from "../../services/commonService";


const COLUMNS = [
  { Header: "Sequence name", accessor: "sequence_name",Filter: ColumnFilter},
  { Header: "CFDNA", accessor: "cfdna" ,Filter: ColumnFilter},
  { Header: "RID", accessor: "rid",Filter: ColumnFilter},
  { Header: "Study ID", accessor: "sd_id",Filter: ColumnFilter},
  { Header: "Site name", accessor: "site_name" ,Filter: ColumnFilter},
  { Header: "Created on", accessor: "created_on",Filter: ColumnFilter},
  { Header: "Status", accessor: "seq_status",Filter: ColumnFilter}
];

const DATASET = []; 

const siteId = sessionStorage.getItem('hp_st');
const uId = sessionStorage.getItem('u_id');
const params = { "s_id" : siteId, "u_id" :uId};

const fetchDataSet = commonService.sequencedList(params)
.then(function (response) {
	var resultSet= response.data.length;
	if (resultSet >= 1){
		for (let i = 0; i < resultSet; i++) 
		DATASET.push(response.data[i]);
	}
});


function Sequencing() {

  const columns = useMemo(() => COLUMNS , [])
  const data = useMemo(() => fetchDataSet , [])
  //setting default sort values
  const sortees = React.useMemo(
	() => [
	  { 
		id: 'sd_id',
		desc: true
	  },     
	  { 
		id: 'rid',
		desc: true
	  },
	  ],
	[]
  );

  const {
	getTableProps,
	getTableBodyProps,
	headerGroups,
	page,
	nextPage,
	previousPage,
	canNextPage,
	canPreviousPage,
	setPageSize,
	prepareRow,
	state,
	setGlobalFilter,
  } = useTable({
	columns : COLUMNS,
	data : DATASET,
	initialState:{ sortBy: sortees }
  },
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination)

  const {globalFilter} = state
  const {pageIndex,pageSize} = state

	

  return (
	<>
		<div className="container-fluid">
			<div className='section-step'>
				<h3>Sequenced</h3>
				<div className='top-buttons'>
					<button className='input-border action-buttons edit-button'><FiUpload className="button-icon" /> orderform</button>
					<button className='input-border action-buttons info-button'><GrRefresh className="button-icon" />Refresh</button>
				</div>
				<div className="table-body-accessories">
					<div className="mr-auto p-2">
						<div className="form-inline">
							<label>Show 
								<select className='input input-border select entries-picker' 
									value={pageSize}
									onChange={(e) => setPageSize(Number(e.target.value))} >
									{[10,25,50,100].map((pageSize) => (
										<option key={pageSize} value={pageSize}>
										{pageSize}
										</option>
									))}
								</select>
								entries
							</label>
						</div>
					</div>
					<div className="p-2">
						<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
					</div>
				</div>
				<div>
					<table {...getTableProps()}>
						<thead>
							{headerGroups.map(headerGroup => (
								<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
										<span>
										{column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : '↑↓'}
										</span>
									</th>
								))}
								</tr>          
							))}

							{headerGroups.map(headerGroup => (
								<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th {...column.getHeaderProps()}>
									{}
										<div>
										{column.canFilter ? column.render('Filter') : null}
										</div>
									</th>
								))}
								</tr>          
							))}
						</thead>

						<tbody {...getTableBodyProps()}>
							{page.map(row => {
								prepareRow(row)
								return (
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
									return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									})}
								</tr>
								)
							})}
						</tbody>
					</table>
				</div>
				<div className="text-center">
					<button  onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
					<span> 
						<strong> {pageIndex + 1} </strong>
					</span>
					<button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
				</div>
			</div> 
		</div>
	</>
  )
}

export default Sequencing;