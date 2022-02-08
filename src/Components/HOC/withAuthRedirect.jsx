import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

let mapStateToPropsForReDirect = (state) => ({
    isAuth: state.auth.isAuth
  });

export const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Redirect to={"/login"} />
        return <Component {...props} />
    } 

    let ConnectedAuthRedirectComponent=connect(mapStateToPropsForReDirect)(RedirectComponent);
    return ConnectedAuthRedirectComponent;
}


  
