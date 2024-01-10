import React from 'react';
import { useLocation } from 'react-router-dom';
import { ABOUT_PAGE, CONTACT_PAGE, HOME_PAGE, NOT_FOUND_404, LOGIN_PAGE } from '../../../helpers/route-paths/paths';
import NavBar from './layouts/NavBar';
import TopBar from './layouts/TopBar';
import { useSelector } from 'react-redux';

const Header = () => {

    const location = useLocation();
    const { isAuthenticated } = useSelector(state => state.authState);

    const defaultPages = [
        HOME_PAGE,
        ABOUT_PAGE,
        CONTACT_PAGE
    ]

    const authPages = [
        LOGIN_PAGE,
        // REGISTER_PAGE
    ]

    const errorPages = [
        NOT_FOUND_404
    ]

    const isDefaultPage = () => {
        if (defaultPages.find(page => page === location.pathname)) {
            return true;
        } else {
            return false;
        }
    }

    const isAuthPage = () => {
        if (authPages.find(page => page === location.pathname)) {
            return true;
        } else {
            return false;
        }
    }

    const isErrorPage = () => {
        if (errorPages.find(page => page === location.pathname)) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className={`${(isAuthPage() || isErrorPage()) && 'd-none'} position-sticky-0`}>
            {isDefaultPage() ? <NavBar /> : <TopBar />}
        </div>
    )
}

export default Header;