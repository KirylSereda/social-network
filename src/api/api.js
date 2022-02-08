import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers:  {
    "API-KEY": "150d914b-0c39-4e15-a6fc-98bf47f87328"
    }
});



export const usersAPI = {
    getUsers(currentPage = 5, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {

        return profileAPI.getProfile(userId);
    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe, })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}


export const profileAPI = {

    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            Headers: {
                'Content-Type': 'multipart/form-data'
            },

        })

    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    }
}
    



//  this.props.getUsers(pageNumber,this.props.pageSize);
//         this.props.toggleIsFetching(true);
//         this.props.setCurrentPages(pageNumber);
//         usersAPI.getUsers(pageNumber,this.props.pageSize)
//             .then(data => {
//                 this.props.toggleIsFetching(false);
//                 this.props.setUsers(data.items);
//             });

// export const getUsers2 = (currentPage = 1, pageSize = 10) => {
//     return instance.get(`users?page=${currentPage}&count=${pageSize}`)
//         .then(response => {
//             return response.data;
//         });
// }