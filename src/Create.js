import * as React from 'react';
import Select from 'react-select'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Switch from "@mui/material/Switch";
import cancerList from "./cancer_type_list.json";
import { Form, Formik, Field } from "formik";
import { useField } from "formik";
import * as yup from "yup";


const schema = yup.object().shape({
    studyId: yup
        .string()
        .required("Required"),
    birthDate: yup
        .string()
        .required("Required"),
    hospital: yup
        .string()
        .oneOf(["karolinska", "st_göran", "södersjukhuset"], "Invalid hospital name")
        .required("Required"),
    cancerFraction: yup
        .string(),
    cancerType: yup
        .string(),
    cancerSub: yup
        .string(),
    cancerTissue: yup
        .string(),
    ffpe: yup
        .boolean(),
    cytology: yup
        .boolean(),
    cfDna: yup
        .boolean(),
    bloodCollected: yup
        .boolean()
});

const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label className='input-label'>{label}</label>
            <input
                {...field}
                {...props}
                className={`input input-border text-field' ${meta.touched && meta.error ? "input-error" : ""}`}
            />
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </>
    );
};

const CheckboxInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <input
                {...field}
                {...props}
                className={meta.touched && meta.error ? "input-error" : ""}
            />
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </>
    );
};


const SelectInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label className='input-label'>{label}</label>
            <select
                {...field}
                {...props}
                className={`input input-border select' ${meta.touched && meta.error ? "input-error" : ""}`}
            />
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </>
    );
};


const onSubmit = async (actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(actions)
    const form = document.getElementById('form');
    form.reset();

};


var cancerTypes = [{ value: 'select', label: '-- Select a cancer type --' }];
for (let i = 0; i < cancerList.data.length; i++) {
    cancerTypes[i + 1] = { key: 'value', key: 'label' };
    cancerTypes[i + 1]['value'] = cancerList.data[i].t_id;
    cancerTypes[i + 1]['label'] = cancerList.data[i].tissue_name;
}


export default function Create() {
    return (
        <Formik
            initialValues={{
                studyId: "",
                hospital: "",
                birthDate: "",
                cancerFraction: "",
                cancerType: "",
                cancerSub: "",
                ffpe: false,
                cytology: false,
                cfDna: false,
                germline: true,
                bloodCollected: true,
                acceptedTos: true
            }}
            validationSchema={schema}
            onSubmit={onSubmit}

        >
            {({ isSubmitting }) => (
                <section>
                    <div className='sync-section section-step' id='sync-section'>
                        <h3>Create eCRF</h3>
                        <Form id='form'>
                            <Row>
                                <Col lg={{ span: 5, offset: 0 }}>
                                    <div className='input-container'>
                                        <TextInput
                                            label="Study ID"
                                            name="studyId"
                                            type="text"
                                            placeholder="Study Id"
                                        />
                                    </div>
                                    <div className='input-container'>
                                        <TextInput
                                            label="Birth date"
                                            name="birthDate"
                                            type="date"
                                        />
                                    </div>
                                    <div className='input-container'>
                                        <SelectInput
                                            label="Hospital"
                                            name="hospital"
                                            placeholder="Select a hospital"
                                        >
                                            <option value="">-- Select a hosital --</option>
                                            <option value="karolinska">Karolinska</option>
                                            <option value="st_göran">St Göran</option>
                                            <option value="södersjukhuset">Södersjukhuset</option>
                                        </SelectInput>
                                    </div>
                                    <div className='input-container'>
                                        <TextInput
                                            label="Cancer cell fraction"
                                            name="cancerFraction"
                                            type="text"
                                            placeholder="Cancer cell fraction"
                                        />
                                    </div>
                                    <div className='input-container'>
                                        <SelectInput
                                            label="Cancer type"
                                            name="cancerType"
                                            placeholder="Select a hospital"
                                        >
                                            {cancerTypes.map((x) =>
                                                <option key={x.value}>{x.label}</option>)}
                                        </SelectInput>
                                    </div>

                                </Col>
                                <Col lg={{ span: 5 }}>

                                    <div className='input-container'>
                                        <TextInput
                                            label="Cancer sub type"
                                            name="cancerSub"
                                            type="text"
                                            placeholder="Cancer sub type"
                                        />
                                    </div>
                                    <div className='input-container'>
                                        <p>Cancer tissue type</p>
                                        <div className="checkbox">
                                            <CheckboxInput
                                                name="ffpe"
                                                type="checkbox"
                                            /><p>FFPE</p>
                                        </div>
                                        <div className="checkbox">
                                            <CheckboxInput
                                                name="cytology"
                                                type="checkbox"
                                            /><p>Cytology</p>
                                        </div>
                                        <div className="checkbox">
                                            <CheckboxInput
                                                name="cfDna"
                                                type="checkbox"
                                            /><p>cfDNA</p>
                                        </div>
                                    </div>
                                    <div className='input-container'>
                                        <p>Germline DNA</p>
                                        <label class="switch">
                                            <CheckboxInput
                                                name="germline"
                                                type="checkbox"
                                            />
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                    <div className='input-container'>
                                        <p>Blood collected before treatment start</p>
                                        <label class="switch">
                                            <CheckboxInput
                                                name="bloodCollected"
                                                type="checkbox"
                                            />
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            <div className='input-container-inline'>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className='input input-border button'>
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </div>
                </section>
            )}
        </Formik >
    );
};


/*
import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Switch from "@mui/material/Switch";
import cancerList from "./cancer_type_list.json";
import { useFormik } from "formik";
import * as yup from "yup";







function Create() {

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            studyId: "",
            birthDate: "",
            hospital: "",
        },
        validationSchema: basicSchema,
        onSubmit,
    });

    console.log(errors);


    return (
        <>
            <section>
                <div className='sync-section section-step' id='sync-section'>
                    <h3>Create eCRF</h3>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <Row>
                            <Col lg={{ span: 5, offset: 0 }}>
                                <div className='input-container'>
                                    <p>Study ID</p>
                                    <input
                                        value={values.studyId}
                                        onChange={handleChange}
                                        id="studyId"
                                        className={`input input-border text-field ${errors.studyId && touched.studyId ? "input-error" : ""}`}
                                        type="text"
                                        placeholder='Study ID'
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <div className='input-container'>
                                    <p>Date of birth</p>
                                    <input
                                        value={values.birthDate}
                                        onChange={handleChange}
                                        id="birthDate"
                                        className={`input input-border text-field ${errors.birthDate && touched.birthDate ? "input-error" : ""}`}
                                        type="date"
                                        onBlur={handleBlur}
                                    />
                                </div>


                                <div className='input-container'>
                                    <p>Hospital</p>
                                    <Select
                                        //value={values.hospital}
                                        //onChange={handleChange}
                                        id="hospital"
                                        type="text"
                                        className={'input input-border text-field'}
                                        options={hospitals}
                                        onBlur={handleBlur}
                                    />

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

*/
