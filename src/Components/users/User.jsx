import s from './users.module.css';
import userPhoto from "../../assets/images/images.png"
import { NavLink } from 'react-router-dom';
import bodyStyle from '../../body.module.css'

let User = ({ user, followingInProgress, unfollow, follow, }) => {
    return (
        <div className={s.users_wrapper} >
            <span>
                <div> <NavLink to={"/Profile/" + user.id}  >
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.userPhoto} />
                     </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button className={bodyStyle.btn} disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id);
                            }}> Unfollow</button>
                        : <button className={bodyStyle.btn} disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id);
                            }}>Follow</button>}
                </div>
            </span>
            <span>
                <div className={s.user_name}>{user.name}</div><div className={s.user_status}><span> status:</span>{user.status}</div>
            </span>
                
        </div >
    )
}

export default User;