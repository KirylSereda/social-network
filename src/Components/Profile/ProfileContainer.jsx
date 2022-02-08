import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile.jsx';
import { getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../Redux/profile-reducer.js';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../HOC/withAuthRedirect.jsx';
import { compose } from 'redux';

const ProfileContainer=(props)=> {

  useEffect(() => {
    let userId = props.match.params.userId;
    if (!userId) {
        userId = props.authorizedUserId;
    };
    props.getUsersProfile(userId);
    props.getStatus(userId);
    }, [props.match.params.userId]);

      return (
      <Profile {...props}
        isOwner={!props.match.params.userId}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto} />
    )
  };

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, { getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

