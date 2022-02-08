import React from 'react';
import { NavLink,} from 'react-router-dom';
import s from './Header.module.css';
import logo from '../../assets/images/MyLogo.png'
import bodyStyle from '../../body.module.css'
import cn from "classnames";

const Header = (props) => {
    return (
    <header className={s.header}>
        <img src={logo} />
        <div className={s.login_block}>
            {props.isAuth
            ? <div>{props.login}<button className={cn([bodyStyle.btn], s.header_button)} onClick={props.logout}>Log out</button> </div>
            : <button className={cn([bodyStyle.btn], s.header_button)}> <NavLink className={s.header_link} to={'/login'}>Login</NavLink></button>}
        </div>
    </header>
    )
}

export default Header;