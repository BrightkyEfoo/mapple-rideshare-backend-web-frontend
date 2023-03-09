import {configureStore} from "@reduxjs/toolkit"
import RiderLoginFormReducer from "../features/RiderLoginFormSlice"
import NavBarReducer from "../features/NavBarSlice"
import UserCreateOrEditReducer from "../features/UserCreateOrEditFormSlice"
import userListReducer from "../features/AdminUserListReload"
import BookRideReducer from "../features/BookRide"
import AdminBookHistoryReducer from "../features/AdminBookHistory"

const store = configureStore({
    reducer : {
        RiderLoginForm : RiderLoginFormReducer,
        NavBar : NavBarReducer,
        userList : userListReducer,
        BookRide : BookRideReducer,
        AdminBookHistory : AdminBookHistoryReducer,
        UserCreateOrEdit : UserCreateOrEditReducer,
    }
})
export default store