import React, {useState, useEffect } from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination} from "react-table";
import { GrRefresh } from "react-icons/gr";
import ColumnFilter from "../table-react/ColumnFilter";
import GlobalFilter from "../table-react/GlobalFilter";
import UploadPdf from "../curation/UploadPdf";


import "react-widgets/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import '../table-react/Table.css';

import commonService from "../../services/commonService";


function Curation() {
  

    const [curData, setCurData] = useState([]);
	const [headerColumn, setHeaderCol] = useState([]);
    const [show, setShow] = useState(false); 
    

	
		const curationList = () => {
		const siteId = sessionStorage.getItem('hp_st');
		const uId = sessionStorage.getItem('u_id');        
		const params = { "s_id" : siteId, "u_id" :uId};

		commonService.curationList(params)
		.then(function (response) {
			const jsonData= response.data;
			const dataset = [];
			if (jsonData.length > 0){
				jsonData.forEach(function (value) {
					dataset.push(value);
				}); 
			}
			setCurData(dataset);
		});
	}
	
    useEffect(() => {

        curationList()

        const columnList = [
            { Header: "Sample ID", accessor: "sd_id", Filter: ColumnFilter },
            { Header: "Capture ID", accessor: "capture_id", Filter: ColumnFilter },
            { Header: "RID", accessor: "rid",  Filter: ColumnFilter },
            { Header: "Study ID", accessor: "study_id", Filter: ColumnFilter },
            { Header: "Site name", accessor: "site_name", Filter: ColumnFilter},
            { Header: "Created on", accessor: "created_on", Filter: ColumnFilter},
            { Header: "Action", accessor: "status_name",Filter: ColumnFilter, disableSortBy: true}
        ];

    setHeaderCol(columnList);
	},[]);

	const clickRefresh = () => {
		curationList()
	}

	//setting default sort values
	const sortees = React.useMemo(
		() => [
			{ 
				id: 'created_on',
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
			data : curData,
			initialState:{ sortBy: sortees }
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	const {globalFilter} = state
	const {pageIndex,pageSize} = state
    
    const populateAction = (cur_status, status_name,id,sd_id) => {
        const roleId=sessionStorage.getItem('rl_st');
        let action_str = '';
        let enable_event = '';
        
        const icon_class = (cur_status === '0' ? 'fas fa-paper-plane' : (cur_status === '1' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'));
        const action_class = (cur_status === '0' ? 'btn-info' : (cur_status === '1' ? 'btn-success disabled' : 'btn-danger disabled'));

        const action_txt = <><i class={(icon_class)} /> {status_name}</>;
        
        if(roleId === '0') {
            enable_event = (cur_status === '0' ? 'submitCuration' : ''); 
            action_str = <button type="button" title={status_name} id={id} className={"btn btn-sm "+(action_class)+" "+(enable_event)+"font-weight-bold mr-1"} style={{ width: 'max-content' }}>{action_txt}</button>;
            if(cur_status === '1'){
                action_str = <div className="align-button"><button type="button" title={status_name} id={id} className={"btn btn-sm "+(action_class)+" "+(enable_event)+" font-weight-bold mr-1"} style={{ width: 'max-content' }}>{action_txt}</button><UploadPdf curation_id={id} study_id={sd_id}/></div>;
            }
        }else{
            action_str = <a href="" className={"btn btn-sm "+action_class+" disabled mr-1"}>{action_txt}</a>;
        }

        return action_str;
    }
    
    const updateCurationList = (curation_id) => {
        
        const params = {"id" : curation_id};

        commonService.updateCurationList(params)
		.then(function (response) {            
			if (response.status){
                curationList()	 
			}
		});
    }   

    const submitAction = (cur_status,id,study_id) => {
        if(cur_status === '0'){
		    updateCurationList(id)
        }
    }
    
    return (
        <>
            <div className="container-fluid">
                <div className='section-step'>
                    <h3>Curation</h3>
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
                                    {headerGroup.headers.map(column=> (
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
                                        return (cell.column.Header === 'Capture ID' || cell.column.Header === 'RID') 
                                        ? <td {...cell.getCellProps()}>{cell.value.split(',').join()}</td>
                                        :(cell.column.Header === 'Action') ? 
                                        <td {...cell.getCellProps()}>                                            
                                            <div onClick={() => submitAction(cell.row.original.cur_status,cell.row.original.id,cell.row.original.study_id)}>
                                                {populateAction(cell.row.original.cur_status,cell.row.original.status_name,cell.row.original.id,cell.row.original.study_id)}
                                            </div>
                                        </td>
                                        :<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    
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

    export default Curation;