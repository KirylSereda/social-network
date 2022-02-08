import React from 'react';
import s from './App.module.css'
import NavBar from './Components/Navbar/Navbar';
import News from './Components/news/News';
import { Route, } from 'react-router-dom';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/login/login';
import { connect } from 'react-redux';
import { initializeApp } from './Components/Redux/app-reducer'
import Preloader from './Components/common/preloader/preloader';
import { Component } from 'react';
import { withSuspense } from './Components/HOC/withSuspense';
import Settings from './Components/Settings/Settings';
import UsersPage from './Components/users/UsersContainer';

const DialogsContainer = React.lazy(() => import('./Components/Diologs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className={s.header}><HeaderContainer />
        <div className={s.app_wrapper_content}>
          <div className={s.nav}><NavBar /></div>
          <Route exact path="/dialogs" render={withSuspense(DialogsContainer)} />
          <div><Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} /></div>
          <Route path="/News" render={() => <News />} />
          <Route path="/users" render={() => <UsersPage />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/settings" render={() => <Settings />} />
        </div>
      </div>
    )
  }
}

const mapStateToprops = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToprops, { initializeApp })(App)


