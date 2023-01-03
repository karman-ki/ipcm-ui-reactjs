import React, {useState, useEffect } from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination} from "react-table";
import { GrRefresh } from "react-icons/gr";
import ColumnFilter from "../table-react/ColumnFilter";
import GlobalFilter from "../table-react/GlobalFilter";
import EcrfInfo from "../eCRF/EcrfInfo";
import { ToastContainer, toast } from 'react-toastify';
import "react-widgets/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import '../table-react/Table.css';

import commonService from "../../services/commonService";


function eCRF_List() {
  

    const [eCRFData, seteCRFData] = useState([]);
	const [headerColumn, setHeaderCol] = useState([]);

    const siteId = sessionStorage.getItem('hp_st');
    const uId = sessionStorage.getItem('u_id');    
    const roleId=sessionStorage.getItem('rl_st');

	
    const update_eCRFList = () => {    
        const params = { "s_id" : siteId, "u_id" :uId};

        commonService.update_eCRFList(params)
        .then(function (response) {
            const jsonData= response.data;
            const dataset = [];
            if (jsonData.length > 0){
                jsonData.forEach(function (value) {
                    dataset.push(value);
                }); 
            }
            seteCRFData(dataset);
        });
	}
	
    useEffect(() => {

        update_eCRFList()

        const columnList = [
            { Header: "Study ID", accessor: "study_id", Filter: ColumnFilter },
            { Header: "Date of Birth", accessor: "birth_date", Filter: ColumnFilter },
            { Header: "Hospital Name", accessor: "site_name",  Filter: ColumnFilter },
            { Header: "Cancer Type", accessor: "cancer_info", Filter: ColumnFilter },
            { Header: "Created By", accessor: "full_name", Filter: ColumnFilter},
            { Header: "Created On", accessor: "created_on", Filter: ColumnFilter},
            { Header: "Action", accessor: "ecrf_status",Filter: ColumnFilter}//action => row.original.status_name.toString()
            
        ];

    setHeaderCol(columnList);
	},[]);

	const clickRefresh = () => {
		update_eCRFList()
	}

    const handlePending = (ecrfId) => {
        const params = {  "eCRF_id" : ecrfId,"s_id" : siteId, "u_id" :uId};
        commonService.eCRFApprove(params)
        .then(function (response) {
            
            if (response.status){
                update_eCRFList()
                const msg = response.data;
                toast.success(msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else{
                const msg = response.data;
                toast.error(msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        });
    }

    const submitAction = (ecrfStatus,id, role_id) => {
        if(ecrfStatus === '0' && role_id ==='0'){
		    handlePending(id)
        }
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
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setPageSize,
        page,
		prepareRow,        
		state,
		setGlobalFilter,
	} = useTable({
			columns : headerColumn,
			data : eCRFData,
			initialState:{ sortBy: sortees }
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	const {globalFilter} = state
	const {pageIndex,pageSize} = state

    const populateInfoEdit = (eCRF_id,ecrf_status,site_id,user_id) => {
        const roleId=sessionStorage.getItem('rl_st');
        let action_btns = '';         
        
        //href will be replaced with "href={"../../eCRF/create?id="(eCRF_id)}"
        if(roleId === '0') {         
            action_btns=<><EcrfInfo data_id={eCRF_id} s_id={site_id} u_id={user_id}/><a className={"btn btn-sm btn-info mr-1"} href=""><i className={"fas fa-edit"}></i></a></>
        }
        if(roleId === '2' && ecrf_status == '0'){
            action_btns=<><EcrfInfo data_id={eCRF_id} s_id={site_id} u_id={user_id}/><a className={"btn btn-sm btn-info mr-1"} href=""><i className={"fas fa-edit"}></i></a></>
        }
        else{
            action_btns= <><EcrfInfo data_id={eCRF_id} s_id={site_id} u_id={user_id}/></>
        }
				return action_btns;	
    }

    const populateEcrfStatus = (eCRF_id,ecrf_status,site_id,user_id) => {
        const roleId=sessionStorage.getItem('rl_st');
        let action_btns = '';         
      
        //href will be replaced with "href={"../../eCRF/create?id="(eCRF_id)}"
        if(roleId === '0') {           
            if(ecrf_status === '0'){                
                action_btns = <><button type ="button" className={"btn btn-sm btn-danger eCRF-approve"} data-id={eCRF_id} title="Pathology not verify this study"> Pending </button></>
            }
            else{
                action_btns = <><a href="" className={"btn btn-sm btn-success ecrf-approved"} role="button" aria-pressed="true" title=" Pathology approved this study"> Approved</a></>
            }
        }
        else{

            if(ecrf_status == '1'){
                action_btns= <><a href="" className={"btn btn-sm btn-success ecrf-approved"}role="button" aria-pressed="true" title="Pathology approved this study">Approved</a></>
            }
            else{
                action_btns= <><a href="" className={"btn btn-sm btn-danger ecrf-approved"} role="button" aria-pressed="true" title="Pathology not verify this study">Pending</a></>
            }
                     						
        }
				return action_btns;	
    }


	
    return (
        <>
            <div className="container-fluid">
                <div className='section-step'>
                    <h3>eCRF details</h3>
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
                                return ( cell.column.Header === 'cancer_info')
                            ?<td {...cell.getCellProps()}>{cell.value.replace(/["'()]/g, "").split(",")}</td>
                            :(cell.column.Header === 'Action') ? 
                            <td {...cell.getCellProps()}>
                                <div style={{display: "flex"}}>
                                <div>
                                    {populateInfoEdit(cell.row.original.id,cell.row.original.ecrf_status,siteId,uId)}
                                </div>
                                <div onClick={() => submitAction(cell.row.original.ecrf_status,cell.row.original.id,roleId)}>
                                    {populateEcrfStatus(cell.row.original.id,cell.row.original.ecrf_status,siteId,uId)}
                                </div>
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
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
        </>
      )
    }
    
    export default eCRF_List;