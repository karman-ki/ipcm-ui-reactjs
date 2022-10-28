import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import BrandLogo from './logo.png'


function App() {
    return (
        <div className='login-page'>
            <MDBContainer fluid className='p-4'>

                <MDBCard className='my-5 login-container'>
                    <MDBRow>

                        <MDBCol md='5' className='text-center text-md-start d-flex flex-column justify-content-center'>
                            <div>
                                <img className="login-logo" src={BrandLogo}></img>
                            </div>
                            <h1>
                                Welcome to iPCM
                            </h1>



                        </MDBCol>
                        <MDBCol md='7' className='text-md-start d-flex flex-column justify-content-center'>

                            <MDBCardBody className='login-form'>

                                <h3 className='text-center mb-5'>
                                    <b>Sign in</b>
                                </h3>

                                <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' />
                                <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' />

                                <div className='mb-4'>
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                </div>

                                <MDBBtn className='w-100 mb-4 button login-button' size='md'>Login</MDBBtn>

                                <div className="text-center">

                                    <p>Don't have an account? <a href='#'>Register</a></p>

                                </div>

                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBContainer>
        </div>
    );
}

export default App;