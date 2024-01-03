import React from 'react'
import { Link } from 'react-router-dom';
import { HOME_PAGE } from '../../../helpers/route-paths/paths';

const NotFound404 = () => {
    return (
        <div>
            <div className='not-found d-flex align-items-center justify-content-center'>
                <div>
                    <div className='d-flex align-items-center justify-content-center'>404 | PAGE NOT FOUND</div>
                    <Link to={HOME_PAGE}>click here to go homepage</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound404;