import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'; 
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import commonService from "../../services/commonService";

function UploadPdf(props){

const [curId, setCurId] = useState(0);
const [studyId, setStudyId] = useState(0);
const [selectedFile, setSelectedFile] = useState(null);
const [selectedFileName, setSelectedFileName] = useState("Choose file");



const [show, setShow] = useState(false);

const handleCancel = () => setShow(false);
const handleShow = () => setShow(true);

useEffect(() => {
	setCurId(props.curation_id);
	setStudyId(props.study_id);
},[]);


const handleFileInput = (e) => {
	// handle validations
	const file = e.target.files[0];
	if(file.type === "application/pdf"){
		setSelectedFile(file)
		setSelectedFileName(file.name)
		const msg = "PDF Validated";
		toast.success(msg, {
			position: toast.POSITION.TOP_RIGHT
		});
	}
	else{
		setSelectedFileName(file.name)
		const msg = "Please upload a valid PDF file.";
		toast.error(msg, {
			position: toast.POSITION.TOP_RIGHT
		});
	}
}

const handleUpload = () => {

	const fd = new FormData();    
		fd.append( 'file', selectedFile)
		fd.append( 'curid', curId)
		fd.append( 'stdid', studyId)

	commonService.uploadPdfReport(fd)
		.then(function (response) {  
			console.log(response)          
			if(response.status){
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT
				});
				setShow(false);
			}
			else{
				toast.error(response.message, {
					position: toast.POSITION.TOP_RIGHT
				});
			}
		});
	
}


return (
  <>
	<button onClick={handleShow} type="button" title="Upload Pdf"  id={curId} data-id={studyId} className="btn btn-sm btn-secondary pdf-upload font-weight-bold" style={{ width: 'max-content' }}>Upload PDF</button>

	<Modal
	  show={show}
	  onHide={handleCancel}
	  backdrop="static"
	  keyboard={false}
	>
	  <Modal.Header closeButton>
		<Modal.Title>Upload Report - {studyId}</Modal.Title>
	  </Modal.Header>
	  <Modal.Body>
		<input type="hidden" id={curId} value="" />
		<div className="custom-file mb-3">
			<input type="file" onChange={handleFileInput} className="custom-file-input" />
			<label className="custom-file-label" htmlFor="reportformFile">{selectedFileName}</label>
		</div>
	  </Modal.Body>
	  <Modal.Footer>
		<button onClick={handleCancel} variant="secondary" type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
		<button onClick={handleUpload} type="button" variant="primary" className="btn btn-primary" >Upload</button>
	  </Modal.Footer>
	</Modal>
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
);
	   
}

export default UploadPdf;