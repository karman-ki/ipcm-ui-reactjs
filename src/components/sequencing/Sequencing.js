import React, {useState, useEffect } from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination} from "react-table";
import { GrRefresh } from "react-icons/gr";
import { FiUpload } from "react-icons/fi"; 
import ColumnFilter from "../table-react/ColumnFilter";
import GlobalFilter from "../table-react/GlobalFilter";

import "react-widgets/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import '../table-react/Table.css';

import commonService from "../../services/commonService";


function Sequencing() {

	const [seqData, setSeqData] = useState([]);
	const [headerColumn, setHeaderCol] = useState([]);

	
		const sequencedbList = () => {
		const siteId = sessionStorage.getItem('hp_st');
		const uId = sessionStorage.getItem('u_id');
		const params = { "s_id" : siteId, "u_id" :uId};

		commonService.sequencedList(params)
		.then(function (response) {
			const jsonData= response.data;
			const dataset = [];
			if (jsonData.length > 0){
				jsonData.forEach(function (value) {
					dataset.push(value);
				}); 
			}
			setSeqData(dataset);
		});
	}

		useEffect(() => {

		sequencedbList()

		const columnList = [
			{ Header: "Sequence name", accessor: "sequence_name",Filter: ColumnFilter},
			{ Header: "CFDNA", accessor: "cfdna" ,Filter: ColumnFilter},
			{ Header: "RID", accessor: "rid",Filter: ColumnFilter},
			{ Header: "Study ID", accessor: "sd_id",Filter: ColumnFilter},
			{ Header: "Site name", accessor: "site_name" ,Filter: ColumnFilter},
			{ Header: "Created on", accessor: "created_on",Filter: ColumnFilter},
			{ Header: "Status", accessor: "status",Filter: ColumnFilter}
		];

		setHeaderCol(columnList);
	},[]);

	const clickRefresh = () => {
		sequencedbList()
	}

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
			columns : headerColumn,
			data : seqData,
			initialState:{ sortBy: sortees }
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	const {globalFilter} = state
	const {pageIndex,pageSize} = state
	

  return (
	<>
		<div className="container-fluid">
			<div className='section-step'>
				<h3>Sequenced</h3>
				<div className='top-buttons'>
					<button className='input-border action-buttons edit-button'><FiUpload className="button-icon" /> orderform</button>
					<button className='input-border action-buttons info-button' onClick={clickRefresh}><GrRefresh className="button-icon" />Refresh</button>
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
									return (cell.column.Header === 'Status') 
									? <td {...cell.getCellProps()}>{
										<span className={cell.value.toString().toLowerCase()} style={{ fontWeight: 'bold' }}>{cell.render("Cell")}</span>
									}</td>
									: <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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