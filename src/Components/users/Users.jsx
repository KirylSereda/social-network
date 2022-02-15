import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { follow, getUsers, setCurrentPages, unfollow } from '../Redux/users-reducer';
import { getCurrentPage, getFollowingInProgress,  getPageSize, getTotalUsersCount, takeUsers } from '../Redux/users-selectors';
import Paginator from './paginatorForUsers/Paginator';

import User from './User';

const Users = () => {
    
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(takeUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    }, []);

    const onPageChanged = (pageNumber) => {
        dispatch(setCurrentPages(pageNumber));
        dispatch(getUsers(pageNumber, pageSize));
    }

    const Follow = (userId) => {
        dispatch(follow(userId));
    }

    const Unfollow = (userId) => {
        dispatch(unfollow(userId));
    }

    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div>
                {       users.map(u => <User user={u}
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