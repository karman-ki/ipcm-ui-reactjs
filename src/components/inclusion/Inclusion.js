import React, {useState, useEffect } from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination} from "react-table";
import { GrRefresh } from "react-icons/gr";
import ColumnFilter from "../table-react/ColumnFilter";
import GlobalFilter from "../table-react/GlobalFilter";

import "react-widgets/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import '../table-react/Table.css';

import commonService from "../../services/commonService";


function Inclusion() {

	const [inclData, setInclData] = useState([]);
	const [headerColumn, setHeaderCol] = useState([]);

	
		const inclusionList = () => {
		const siteId = sessionStorage.getItem('hp_st');
		const uId = sessionStorage.getItem('u_id');
		const params = { "s_id" : siteId, "u_id" :uId};

		commonService.inclusionList(params)
		.then(function (response) {
			const jsonData= response.data;
			const dataset = [];
			if (jsonData.length > 0){
				jsonData.forEach(function (value) {
					dataset.push(value);
				}); 
			}
			setInclData(dataset);
		});
	}

		useEffect(() => {

        inclusionList()

		const columnList = [
			{ Header: "Study ID", accessor: "study_id",Filter: ColumnFilter},
			{ Header: "Date of Birth", accessor: "birth_date" ,Filter: ColumnFilter},
			{ Header: "Hopsital Name", accessor: "hospital",Filter: ColumnFilter},
			{ Header: "Created Time", accessor: "created_on",Filter: ColumnFilter},
			{ Header: "Processing Status",disableSortBy: true, disableGlobalFilter: true}
		];

		setHeaderCol(columnList);
	},[]);

	const clickRefresh = () => {
		inclusionList()
	}

	//setting default sort values
	const sortees = React.useMemo(
		() => [
			{ 
				id: 'study_id',
				desc: true
			},     
			{ 
				id: 'birth_date',
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
			data : inclData,
			initialState:{ sortBy: sortees }
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	const {globalFilter} = state
	const {pageIndex,pageSize} = state

    const populateProgressBar = (inclStatus,pathStatus,biobankStatus,sequencingStatus,datadelivered,analysisStatus,curationStatus,reportStatus) => {
       
        let progressBar_str = '';
        const inclusion = ({inclStatus} === '0' ? 'disabled' : 'complete');
        const pathology = ({pathStatus} === '0' ? 'disabled' : 'complete ');
        const biobank = ({biobankStatus} === '0' ? 'disabled' : 'complete ');
        const sequencing = ({sequencingStatus} === '0' ? 'disabled' : 'complete ');
        const data_delivered = ({datadelivered} === '0' ? 'disabled' : 'complete ');
        const analysis = ({analysisStatus} === '0' ? 'disabled' : ' complete');
        const curation = ({curationStatus} === '0' ? 'disabled' : ' complete');
        const report = ({reportStatus} === '0' ? 'disabled' : ' complete');

        const progress_bar_bg =  'success';
        const seq_prog_bar_bg = ({sequencing} === '1' ? 'success' : 'failed ');
        const data_deliver_prog_bar_bg = ({data_delivered} === '1' ? 'success' : 'failed ');
        const analysis_prog_bar_bg = ({analysis} === '1' ? 'success' : 'failed ');
        const curation_prog_bar_bg = ({curation}=== '1' ? 'success' : 'failed ');
        const report_prog_bar_bg = ({report} === '1' ? 'success' : 'failed ');

        const progress_bar_bg1 = ({pathology} === '2' ? 'pending' : ({pathology} ==='-1' ? 'failed' : 'success'));

        progressBar_str = <div className="row bs-wizard" style={{'border-bottom':0}}>
              <div className={"col bs-wizard-step "+ (inclusion)}>
                <div className={"text-center bs-wizard-stepnum inclusion"}>{inclusion === '2' ? 'RE-RANDOMIZATION' : 'INCLUSION'}</div>
                <div className="progress">
                  <div className={"progress-bar "+ (progress_bar_bg)}></div>
                </div>
                <a href="#" className={"bs-wizard-dot "+ (progress_bar_bg)}></a>
              </div>
              <div className={"col bs-wizard-step "+(pathology)}>
                <div className={"text-center bs-wizard-stepnum randomization"}>PATHOLOGY</div>
                <div className="progress">
                  <div className={"progress-bar"+(progress_bar_bg)}></div>
                </div>
                <a href="#" className={"bs-wizard-dot "+(progress_bar_bg)}></a>
              </div>
              <div className={"col bs-wizard-step "+(biobank)}>
                <div className={"text-center bs-wizard-stepnum biobank"}>BIOBANK</div>
                <div className="progress">
                  <div className={"progress-bar "+(progress_bar_bg1)}></div>
                </div>
                <a href="#" className={"bs-wizard-dot "+(progress_bar_bg1)}></a>
              </div>
              <div className={"col bs-wizard-step "+(sequencing)}>
                <div className={"text-center bs-wizard-stepnum sequencing"}>SEQUENCING</div>
                <div className="progress">
                    <div className={"progress-bar "+(seq_prog_bar_bg)}></div>
                </div>
                <a href="#" className={"bs-wizard-dot "+(seq_prog_bar_bg)}></a>
              </div>
              <div className={"col bs-wizard-step "+(data_delivered)}>
                <div className={"text-center bs-wizard-stepnum data-delivered"}>DATA DELIVERED</div>
                <div className="progress">
                  <div className={"progress-bar "+(data_deliver_prog_bar_bg)}></div>
                </div>
                <a href="#" className={"bs-wizard-dot "+(data_deliver_prog_bar_bg)}></a>
              </div>
              <div className={"col bs-wizard-step "+(analysis)}>
                <div className={"text-center bs-wizard-stepnum analysis"}>ANALYSIS</div>
                <div className="progress">
                  <div className={"progress-bar "+(analysis_prog_bar_bg)}></div>
                </div>
                <a href="#" className={"bs-wizard-dot "+(analysis_prog_bar_bg)}></a>
              </div>
              <div className={"col bs-wizard-step "+(curation)}>
                <div className={"text-center bs-wizard-stepnum curation"}>CURATION</div>
                <div className="progress">
                  <div className={"progress-bar "+(curation_prog_bar_bg)}></div>
                </div>
                <a href="#" className={"bs-wizard-dot "+(curation_prog_bar_bg)}></a>
              </div>
              <div className={"col bs-wizard-step "+(report)}>
                <div className={"text-center bs-wizard-stepnum report"}>REPORT</div>
                <div className="progress">
                  <div className={"progress-bar "+(report_prog_bar_bg)}></div>
                </div>
                <a href="#" className={"bs-wizard-dot "+(report_prog_bar_bg)}></a>
              </div>
            </div>
            
        return progressBar_str
    
    }
    
	

  return (
	<>
		<div className="container-fluid">
			<div className='section-step'>
				<h3>Sample Processing</h3>
				<div className='top-buttons'>					
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

						<tbody {...getTableBodyProps()}>
							{page.map(row => {
								prepareRow(row)
								return (
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
									return (cell.column.Header === 'Processing Status') 
									? <td {...cell.getCellProps()}>
                                        {populateProgressBar(cell.row.original.inclusion,cell.row.original.pathology,cell.row.original.biobank, cell.row.original.sequencing,cell.row.original.data_delivered,cell.row.original.analysis,cell.row.original.curation,cell.row.original.report)}
									</td>
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

export default Inclusion;