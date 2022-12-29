import React, {useState, useEffect } from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy, useExpanded, usePagination} from "react-table";
import { GrRefresh } from "react-icons/gr";
import { RiDatabase2Fill } from "react-icons/ri";
import GlobalFilter from "../table-react/GlobalFilter";
import ColumnFilter from "../table-react/ColumnFilter";
import '../table-react/Table.css';
import "react-widgets/styles.css";
import commonService from "../../services/commonService";

import { AiOutlineMinus } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

function ReferralDb () {

	const [RefData, setRefData] = useState([]);
	const [headerColumn, setHeaderCol] = useState([]);	
	
	const referraldbList = () => {
		const siteId = sessionStorage.getItem('hp_st');
		const params = { "s_id" : siteId};
		commonService.referralList(params)
			.then(function (response) {
				var jsonData= response.data;
				const dataset = [];
				if (jsonData.length > 0){
					jsonData.forEach(function (value) {
						dataset.push(value);
					}); 
				}				
				setRefData(dataset);
		});

	}

	useEffect(() => {

		referraldbList()
		
	
		const column_arr = [
			{
				Header: () => null,
				id: "expander",
				width: 30,
				disableSortBy: true,
				Cell: ({ row }) => (
				  <span {...row.getToggleRowExpandedProps()}>
					{row.isExpanded ? (
					  <AiOutlineMinus />
					) : (
					  <AiOutlinePlus />
					)}
				  </span>
				),
				disableGlobalFilter: true
			},
			{ Header: "PNR", accessor: "pnr",Filter: ColumnFilter},
			{ Header: "Date", accessor: "datum" ,Filter: ColumnFilter},
			/*{ Header: "RID", accessor: "rid",Filter: ColumnFilter},*/
			{ Header: "CDK", accessor: "cdk",Filter: ColumnFilter},
			{ Header: "Blood", accessor: "blood" ,Filter: ColumnFilter},
			{ Header: "DNA1", accessor: "dna1",Filter: ColumnFilter},
			{ Header: "DNA2", accessor: "dna2",Filter: ColumnFilter},
			{ Header: "DNA3", accessor: "dna3",Filter: ColumnFilter}
	
		];

	setHeaderCol(column_arr);					
},[]);


	const clickRefersh = () => {
		referraldbList()
	}


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
		columns : headerColumn,
		data : RefData,
		initialState:{ 
			sortBy: sortees,
			pageSize:10,
			// hiddenColumns: ['expander'],
		}
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		useExpanded,
		usePagination
	)

	const {globalFilter} = state ;
	const {pageIndex,pageSize} = state ;

	return (
		<>
			<div className="container-fluid">
				<div className='section-step'>
					<h3>Referral DB from KI Biobank</h3>
					<div className='top-buttons'>
						<button className='input-border action-buttons edit-button'><RiDatabase2Fill className="button-icon" />Update ReferralDB</button>
						<button className='input-border action-buttons info-button' onClick={clickRefersh}><GrRefresh className="button-icon" />Refresh</button>
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
													{column.canSort ? (column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : '↑↓') :''}
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
											
							{/* <tbody {...getTableBodyProps()}>
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
							</tbody> */}
						
						<tbody {...getTableBodyProps()}>
								{page.map((row,i) => {
										prepareRow(row)
										return (
											<React.Fragment key={i+"_ref"}>
												<tr {...row.getRowProps()}>
													{row.cells.map((cell) => {
														return (
														<td {...cell.getCellProps()}>
															{cell.render("Cell")}
														</td>
														);
													})}
												</tr>
											{row.isExpanded ? (
												<tr className="subTable">
													<td colSpan={8}>
															{	
																<div className="flex-container">
																	<div>
																		<b>RID : </b>
																		<span> {row.original.rid}</span>
																	</div>
                               										<div>
																		<b>Referral Type : </b>
																		<span> {row.original.referral_name}</span>
																	</div>
                            										<div>
																		<b>Hospital Name : </b>
																		<span> {row.original.site_name}</span>
																	</div>

																</div>
															}
													</td>
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