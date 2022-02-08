import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { reduxForm } from "redux-form"
import { required } from "../../utils/validators/validators"
import { createField, Input } from "../common/FormsControls/FormsControls"
import { login } from "../Redux/auth-reducer"
import style from "./../common/FormsControls/FormsControls.module.css"

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <div className={style.login_inner} >
            <form onSubmit={handleSubmit}>
                <div className={style.login_input}>
                    {createField("Email", "email", [required], Input)}
                </div>
                <div className={style.login_input}>
                    {createField("Password", "password", [required], Input, { type: "password" })}
                </div>
                    {error && <div className={style.form_summary_error}>
                    {error}
                </div>
                }
                <div>
                    <button className={style.login_btn}>Login</button>
                </div>
            </form>
        </div>
    )
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSudmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div className={style.login}>
            <h3> Welcom to SK SocialNetwork</h3>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSudmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);