import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../../assets/imgs/home/logo.png';


const Logo = ({ height }) => {

    const { theme } = useSelector(state => state.themeState);
console.log(theme);
    const isTheme = () => {
        if (theme?.mode === 0) {
            return 'light'
        } else if (theme?.mode === 1) {
            return 'dark'
        }
    }

    return (
        <div>
            {isTheme() === 'dark' ? (
                <img src={logo} height={40} width={150}/>
            ) : isTheme() === 'light' && (
                <img src={logo} height={50} width={150}/>
            )}

        </div>
    )
}

export default Logo