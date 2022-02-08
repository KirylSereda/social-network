import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileDataFormReduxForm from "../Profile/ProfileInfo/profileDataForm";
import { ProfileData } from "../Profile/ProfileInfo/ProfileInfo";
import { saveProfile } from "../Redux/profile-reducer";

const Settings = () => {

    const profile = useSelector(state => state.profilePage.profile);
    const [editMode, setEditMode] = useState(false);
    const { userId } = useParams();
    const dispatch = useDispatch();

    const onSubmit = (formData) => {
        dispatch(saveProfile(formData))
            .then(
                () => {
                    setEditMode(false);
                }
            );
    }
    return (
        <div>
            {editMode
                ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={userId} btn={true}  />}
        </div>
    )
}

export default Settings;