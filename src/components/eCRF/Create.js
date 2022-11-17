import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import cancerList from "../../data/cancer_type_list.json";
import { Form, Formik } from "formik";
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
    cancerTypes[i + 1] = { val: 'value', key: 'label' };
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
                                        <label className="switch">
                                            <CheckboxInput
                                                name="germline"
                                                type="checkbox"
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className='input-container'>
                                        <p>Blood collected before treatment start</p>
                                        <label className="switch">
                                            <CheckboxInput
                                                name="bloodCollected"
                                                type="checkbox"
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className='input-border button'>
                                    Submit
                                </button>
                        </Form>
                    </div>
                </section>
            )}
        </Formik >
    );
}









