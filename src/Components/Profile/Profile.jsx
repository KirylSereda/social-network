import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MypostsContainer from './Myposts/MypostsContainer';

const Profile = (props) => {
  
  return <div>
    <ProfileInfo isOwner={props.isOwner}
     profile={props.profile}
      status={props.status} 
      updateStatus={props.updateStatus}
      savePhoto={props.savePhoto} 
      saveProfile={props.saveProfile}/>
    <MypostsContainer />
  </div>
}

export default Profile;