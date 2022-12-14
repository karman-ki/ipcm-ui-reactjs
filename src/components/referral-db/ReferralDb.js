import React, {useMemo } from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy, useExpanded, usePagination} from "react-table";

import { GrRefresh } from "react-icons/gr";
import { RiDatabase2Fill } from "react-icons/ri";

import axios from "axios";

import GlobalFilter from "../table-react/GlobalFilter";
import ColumnFilter from "../table-react/ColumnFilter";

import '../table-react/Table.css';
import "react-widgets/styles.css";

import commonService from "../../services/commonService";


	const COLUMNS = [
		{
			// Build our expander column
			id: "expander", // Make sure it has an ID
			Header: "",
			disableGlobalFilter: true
		},
		{ Header: "PNR", accessor: "pnr",Filter: ColumnFilter},
		{ Header: "Date", accessor: "datum" ,Filter: ColumnFilter},
		{ Header: "RID", accessor: "rid",Filter: ColumnFilter},
		{ Header: "CDK", accessor: "cdk",Filter: ColumnFilter},
		{ Header: "Blood", accessor: "blood" ,Filter: ColumnFilter},
		{ Header: "DNA1", accessor: "dna1",Filter: ColumnFilter},
		{ Header: "DNA2", accessor: "dna2",Filter: ColumnFilter}
	];

	const dataset = []; 
	const siteId = sessionStorage.getItem('hp_st');
	const params = { "s_id" : siteId};

	commonService.referralList(params)
	.then(function (response) {
		var resultSet= response.data.length;
		if (resultSet >= 1){
			for (let i = 0; i < resultSet; i++) 
			dataset.push(response.data[i]);
		}
	});
 

function ReferralDb () {

	console.log("dataset",dataset);

	const columns = useMemo(() => COLUMNS , [])
	const data = useMemo(() => dataset , [])
	//setting default sort values
	const sortees = React.useMemo(
		() => [
			{ 
				id: 'cdk',
				desc: true
			},     
			{ 
				id: 'pnr',
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
		setGlobalFilter
	} = useTable({
		columns : COLUMNS,
		data : dataset,
		initialState:{ 
		sortBy: sortees,
		pageSize:10,
		//hiddenColumns: ['expander'],
		 }
	},
	useFilters,
	useGlobalFilter,
	useSortBy,
	useExpanded,
	usePagination)

	const {globalFilter} = state ;
	const {pageIndex,pageSize} = state ;

	console.log("data",data);
	
	return (
		<>
			<div className="container-fluid">
				<div className='section-step'>
					<h3>Referral DB from KI Biobank</h3>
					<div className='top-buttons'>
						<button className='input-border action-buttons edit-button'><RiDatabase2Fill className="button-icon" />Update ReferralDB</button>
						<button className='input-border action-buttons info-button' ><GrRefresh className="button-icon" />Refresh</button>
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
														{column.isSorted ? (column.isSortedDesc ? '???' : '???') : '??????'}
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
										<React.Fragment>
										<tr {...row.getRowProps()}>
											{                              
												row.cells.map(cell => {
													return (cell.value === '' || cell.value === 'undefined' || cell.value === undefined )?
														<td>               
														<span
															{...row.getToggleRowExpandedProps({
																style: {
																	// We can even use the row.depth property
																	// and paddingLeft to indicate the depth
																	// of the row
																	paddingLeft: `${row.depth * 1}rem`
																}
															})}
														>
															{row.isExpanded ? "-" : "+"}
														</span>
														</td>
														:
														<td {...cell.getCellProps()}>               
															{cell.render("Cell")}
														</td>
												})
											
											}
										</tr>
										{row.isExpanded ? (
											<tr className="subTable">
														{
															/*renderRowSubComponent({ row })*/
															<div className="subTableCols">
															<><p><span className="subTableColstxt">DNA 3</span><span> {row.original.dna3}</span></p> </>
															<><p><span className="subTableColstxt">Referral Type</span><span> {row.original.referral_name}</span></p> </>
															<><p><span className="subTableColstxt">Hospital Name</span><span> {row.original.site_name}</span> </p></>
															</div>
															/*Referral Type "+row.original.referral_name + "\n\t Hospital Name "+row.original.site_name*/
														}
											</tr>
										) : null}
										</React.Fragment>
										)
								})}
							</tbody>
					
						</table>
					</div>
					<div className="text-center">
						<button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
						<span>
							<strong>
								{pageIndex + 1}
							</strong>
						</span>
						<button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
					</div>
				</div>
			</div>
		</>
	)
}
export default ReferralDb;