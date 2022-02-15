import { authAPI } from "../../api/api";
import { stopSubmit } from "redux-form";
const SET_USERS_DATA = 'samurai-networ/auth/SET_USERS_DATA';

let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    };

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action:any): InitialStateType => {
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


type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USERS_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setUsersData = (userId: number | null, email: string | null, login:string | null, isAuth: boolean ):SetAuthUserDataActionType => ({
    type: SET_USERS_DATA, payload:
        { userId, email, login, isAuth }
});

export const getUserData = () => async (dispatch:any) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setUsersData(id, email, login, true));
    };
};

export const login = (email:string, password:string, rememberMe:boolean) => async (dispatch:any) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getUserData());
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }));
    };
};

export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setUsersData(null, null, null, false));
    };
};

export default authReducer;