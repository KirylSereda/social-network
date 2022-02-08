import React from 'react';
import Users from './Users';
import Preloader from '../common/preloader/preloader.jsx';
import { getIsFetching } from '../Redux/users-selectors';
import { useSelector } from 'react-redux';


const UsersPage = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}


export default UsersPage;



