/* src/App.js */


import * as React from 'react';
import { Tabs, TabItem } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { LauncherNavbar } from './Sidebar.js'

function Profile() {
    return (
        <>
            <section>
                <div className='section-step'>
                    <h3>Kalle Kalleson</h3>
                    <div className='config-tabs'>
                        <p>Option 1</p>
                        <p>Option 2</p>
                        <p>Profile settings</p>
                    </div>
                </div>

            </section>

        </>

    );
}

export default Profile;
