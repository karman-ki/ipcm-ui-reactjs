import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from "react-select";
import Switch from "@mui/material/Switch";
import cancerList from "./cancer_type_list.json";



const hospitals = [
    { value: 'karolinska', label: 'Karolinska' },
    { value: 'södersjukhuset', label: 'Södersjukhuset' },
    { value: 'st_göran', label: 'St Göran' }
]

var cancerTypes = [];
for (let i = 0; i < cancerList.data.length; i++) {
    cancerTypes[i] = { key: 'value', key: 'label' };
    cancerTypes[i]['value'] = cancerList.data[i].t_id;
    cancerTypes[i]['label'] = cancerList.data[i].tissue_name;
}


function Create() {


    return (
        <>
            <section>
                <div className='sync-section section-step' id='sync-section'>
                    <h3>Create eCRF</h3>
                    <form>
                        <Row>
                            <Col lg={{ span: 5, offset: 0 }}>
                                <div className='input-container'>
                                    <p>Study ID</p>
                                    <input
                                        className='input input-border text-field'
                                        type="text"
                                        placeholder='Study ID' />
                                </div>

                                <div className='input-container'>
                                    <p>Date of birth</p>
                                    <input className='input input-border text-field' type="date" />
                                </div>


                                <div className='input-container'>
                                    <p>Hospital</p>
                                    <Select className='input select' options={hospitals} />
                                </div>

                                <div className='input-container'>
                                    <p>Cancer cell fraction</p>
                                    <input className='input input-border text-field' type="text" placeholder='Cancer cell fraction' />
                                </div>

                            </Col>
                            <Col lg={{ span: 5 }}>
                                <div className='input-container'>
                                    <p>Cancer type</p>
                                    <Select className='input select' options={cancerTypes} />
                                </div>

                                <div className='input-container'>
                                    <p>Cancer sub type</p>
                                    <input className='input input-border text-field' type="text" placeholder='Cancer sub type' />
                                </div>
                                <div className='input-container'>
                                    <p>Cancer tissue type</p>
                                    <div className="checkbox">
                                        <input type="checkbox" /><p>FFPE</p>
                                    </div>
                                    <div className="checkbox">
                                        <input type="checkbox" /><p>Cytology</p>
                                    </div>
                                    <div className="checkbox">
                                        <input type="checkbox" /><p>cfDNA</p>
                                    </div>
                                </div>
                                <div className='input-container'>
                                    <p>Germline DNA</p>
                                    <Switch defaultChecked />
                                </div>
                                <div className='input-container'>
                                    <p>Blood collected before treatment start</p>
                                    <Switch defaultChecked />
                                </div>

                            </Col>
                        </Row>
                        <div className='input-container-inline'>
                            <button type="submit" className='input input-border button'>Submit</button>
                        </div>
                    </form>


                </div>
            </section>
        </>
    );
}

export default Create;
