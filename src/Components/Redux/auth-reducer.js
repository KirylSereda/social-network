import { authAPI } from "../../api/api";
import { stopSubmit } from "redux-form";
const SET_USERS_DATA = 'samurai-networ/auth/SET_USERS_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA: {
            return {
                ...state,
                ...action.payload,
            };
        };
        default:
            return state;
    };
};

export const setUsersData = (userId, email, login, isAuth) => ({
    type: SET_USERS_DATA, payload:
        { userId, email, login, isAuth }
});

export const getUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setUsersData(id, email, login, true));
    };
};

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getUserData());
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }));
    };
};

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setUsersData(null, null, null, false));
    };
};

export default authReducer;