import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className={s.item}>
        < NavLink to="/Profile" activeClassName={s.active_link}> Profile</NavLink>
      </div>
      <div className={s.item }>
        < NavLink to='/Dialogs' activeClassName={s.active_link}> Massages</NavLink>
      </div>
      <div className={s.item}>
        < NavLink to="/News" activeClassName={s.active_link}> News </NavLink>
      </div>
      <div className={s.item}>
        < NavLink to="/Music" activeClassName={s.active_link}> Music </NavLink>
      </div>
      <div className={s.item}>
        < NavLink to="/Settings" activeClassName={s.active_link}> Settings </NavLink>
      </div>
      <div className={s.item}>
        < NavLink to="/Users" activeClassName={s.active_link}> Find sers </NavLink>
      </div>
    </nav>
  )
}

export default NavBar;