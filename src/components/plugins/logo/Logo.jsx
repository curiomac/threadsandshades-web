import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../../assets/imgs/home/logo.png';


const Logo = ({ height, onClick }) => {

    const { theme } = useSelector(state => state.themeState);
    const isTheme = () => {
        if (theme?.mode === 0) {
            return 'light'
        } else if (theme?.mode === 1) {
            return 'dark'
        }
    }

    return (
        <div onClick={() => onClick && onClick()}>
            {isTheme() === 'dark' ? (
                <img src={logo} height={60} width={155} className='logo-img'/>
            ) : isTheme() === 'light' && (
                <img src={logo} height={60} width={155} className='logo-img'/>
            )}

        </div>
    )
}

export default Logo