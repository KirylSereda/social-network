import { profileAPI, usersAPI } from "../../api/api";
import { stopSubmit } from "redux-form";
import { PhotosType, PostsType, ProfileType } from "../../types/generalTypes";

const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = ' SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: 'My personal ID is 18399', likesCount: 12 },
        { id: 2, message: "React/Redux", likesCount: 11 },
        { id: 3, message: "It's sunny today who wants to take a walk", likesCount: 11 },
        { id: 4, message: "It's my first post", likesCount: 11 }
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '' as string,
    newPostText:'' as string
};

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action:any):initialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case SET_USERS_PROFILE:
            return {
                ...state, profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state, status: action.status
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: { ...state.profile, photos: action.photos } as ProfileType
            };
        default:
            return state;
    };
};

type AddPostActionCreatorActionType = {
    type:typeof ADD_POST
    newPostText:string
}

type SetUsersProfileActionType = {
    type:typeof SET_USERS_PROFILE
    profile:ProfileType
}

type SetStatusActionType = {
    type:typeof SET_STATUS
    status:string
}

type SavePhotoSuccessActionType = {
    type:typeof SAVE_PHOTO_SUCCESS
    photos:PhotosType
}

export const addPostActionCreator = (newPostText:string):AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText });
export const setUsersProfile = (profile:ProfileType):SetUsersProfileActionType => ({ type: SET_USERS_PROFILE, profile });
export const setStatus = (status:string):SetStatusActionType => ({ type: SET_STATUS, status });
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType=> ({ type: SAVE_PHOTO_SUCCESS, photos });

export const getUsersProfile = (userId:number) => async (dispatch :any) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUsersProfile(response.data));
};

export const getStatus = (status:string) => async (dispatch:any) => {
    let response = await profileAPI.getStatus(status);
    dispatch(setStatus(response.data));
};

export const updateStatus = (status:string) => async (dispatch:any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    };
};

export const savePhoto = (file:any) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    };
};

export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUsersProfile(userId));
    }
    else {
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;