import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const ToastMessage = ({ message, status, clearFunc, hideProgressBar }) => {
    const { theme } = useSelector(state => state.themeState);
    const dispatch = useDispatch();
    toast(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: status,
        onOpen: () => { dispatch(clearFunc()) }
    })
    const getTheme = () => {
        if (theme?.mode === '0') {
            return 'dark';
        } else if (theme?.mode === '1') {
            return 'light';
        }
    }
    return <ToastContainer theme={getTheme()} hideProgressBar={hideProgressBar ? true : false} />;
}

export default ToastMessage;