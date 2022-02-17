import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { UserType } from '../../types/generalTypes';
import { follow, getUsers, setCurrentPages, unfollow } from '../Redux/users-reducer';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, takeUsers } from '../Redux/users-selectors';
import Paginator from './paginatorForUsers/Paginator';
import User from './User';

const Users: React.FC = () => {

    const totalUsersCount:number = useSelector(getTotalUsersCount)
    const currentPage:number = useSelector(getCurrentPage)
    const pageSize:number = useSelector(getPageSize)
    const users: Array<UserType> = useSelector(takeUsers)
    const followingInProgress:Array<number> = useSelector(getFollowingInProgress)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPages(pageNumber));
        dispatch(getUsers(pageNumber, pageSize));
    }

    const Follow = (userId: number) => {
        dispatch(follow(userId));
    }

    const Unfollow = (userId: number) => {
        dispatch(unfollow(userId));
    }

    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div>
                {users.map(u => <User user={u}
                    followingInProgress={followingInProgress}
                    key={u.id}
                    unfollow={Unfollow}
                    follow={Follow} />
                )
                }
            </div>
        </div>
    );
};

export default Users;