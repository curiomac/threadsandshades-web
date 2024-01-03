import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const MetaData = ({ title, activate }) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{`${activate ? title : ''} ${activate ? '-' : ''} Curiomac`}</title>
            </Helmet>
        </HelmetProvider>
    )
}

export default MetaData;