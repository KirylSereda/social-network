import Preloader from '../../common/preloader/preloader.jsx';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks.jsx';
import userPhoto from "../../../assets/images/images.png"
import bodyStyle from '../../../body.module.css'
import cn from "classnames";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
    
    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={s.userProffile}>
                <div className={s.userPhoto} >
                    <div className={s.fullName}>
                    {profile.fullName}
                    </div>
                    <img src={profile.photos.large || userPhoto} />
                </div>
                <div className={s.dataProfile}>
                    <ProfileStatusWithHooks className status={status} updateStatus={updateStatus} />           
                    <ProfileData  profile={profile}  />
                        <input className={s.addPhotoBtn} type={"file"} onChange={onMainPhotoSelected} />
                </div>
            </div>
        </div>
    )
}

 export const ProfileData = ({ profile, goToEditMode, isOwner,btn}) => {
    return <div className={s.OwnerPage}>
        <div></div>{isOwner}
        <div>
            <b>Looking for a job</b>:{profile.lookingForAJob ? "Yes" : "No"}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>:{profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About Me</b>:{profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>:{Object.keys(profile.contacts).map(key => {
                if (key === 'mainLink' || key === 'youtube' || key === 'twitter'
                    || key === 'website' || key === 'facebook') {
                    return;
                }
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
            
        </div>
        <div> {btn ? <button className={cn( [bodyStyle.btn], s.editBtn) } onClick={goToEditMode}>Edit</button>:''
        }</div>
    </div>
}

export const Contact = ({ contactTitle, contactValue }) => {

    return <div className={s.contact}>
        <b>{contactTitle}</b>:{contactValue}
    </div>

}
export default ProfileInfo;