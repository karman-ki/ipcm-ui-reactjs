import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; 
import '../table-react/Table.css';

import commonService from "../../services/commonService";

function EcrfInfo(props){
    const [show, setShow] = useState(false);
    const [eCRFInfoData, seteCRFInfoData]=useState([]);
    const [dataId, setEcrfId]= useState(props.data_id)
    const [siteId, setSiteId]= useState(props.s_id)
    const [userId, setUserId]= useState(props.u_id)
    
     
    const handleClose = () => setShow(false); 
    
    const handleShow = () => {
      setShow(true);
        const params= {"eCRF_id" : dataId, "s_id" : siteId, "u_id": userId}
    
        commonService.eCRFInfoList(params)
          .then(function (response) {
              const jsonData= response.data;
              if (jsonData.length > 0)
              {
                seteCRFInfoData(jsonData[0])
              }
          });
    }
      
    return (
        <>
          
          <button type="button" onClick={handleShow} title="eCRF Information" className={"btn btn-sm btn-secondary eCRF-info mr-1" } data-id={dataId}><i className={"fas fa-info-circle"}></i></button>

            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          > 
          <Modal.Header> 
            <Modal.Title>eCRF Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
            <div className="displayblock"><p><b>Study Id</b></p><p>{eCRFInfoData.study_id}</p></div>
            <div className="displayblock"><p><b>Birth date</b></p><p>{eCRFInfoData.birth_date}</p></div>
            <div className="displayblock"><p><b>Cancer info</b></p><p>{eCRFInfoData.cancer_info}</p></div>
            <div className="displayblock"><p><b>Tissue type</b></p><p>{eCRFInfoData.tissue_type}</p></div>            
            <div className="displayblock"><p><b>Blood Before_treatment</b></p><p>{eCRFInfoData.blood_before_treatment}</p></div>
            <div className="displayblock"><p><b>Cell Fraction</b></p><p>{eCRFInfoData.cell_fraction}</p></div>
            <div className="displayblock"><p><b>Germline Dna</b></p><p>{eCRFInfoData.germline_dna}</p></div>
            <div className="displayblock"><p><b>Created on</b></p><p>{eCRFInfoData.created_on}</p></div></>
          </Modal.Body>     
             
        <Modal.Footer>
        <button onClick={handleClose} variant="primary" type="button"  className="btn btn-secondary" data-dismiss="modal">Close</button>
        </Modal.Footer>
        </Modal>
        </>
);
       
}  
export default EcrfInfo;