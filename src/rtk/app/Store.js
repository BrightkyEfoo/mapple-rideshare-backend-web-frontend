import {configureStore} from "@reduxjs/toolkit"
import RiderLoginFormReducer from "../features/RiderLoginFormSlice"
import NavBarReducer from "../features/NavBarSlice"
import UserCreateOrEditReducer from "../features/UserCreateOrEditFormSlice"
import userListReducer from "../features/AdminUserListReload"
import BookRideReducer from "../features/BookRide"

const store = configureStore({
    reducer : {
        RiderLoginForm : RiderLoginFormReducer,
        NavBar : NavBarReducer,
        userList : userListReducer,
        BookRide : BookRideReducer,
        UserCreateOrEdit : UserCreateOrEditReducer,
    }
})
export default store