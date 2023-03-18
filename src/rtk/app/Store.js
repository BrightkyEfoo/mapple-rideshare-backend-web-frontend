import {configureStore} from "@reduxjs/toolkit"
import RiderLoginFormReducer from "../features/RiderLoginFormSlice"
import NavBarReducer from "../features/NavBarSlice"
import UserCreateOrEditReducer from "../features/UserCreateOrEditFormSlice"
import userListReducer from "../features/AdminUserListReload"
import BookRideReducer from "../features/BookRide"
import AdminBookHistoryReducer from "../features/AdminBookHistory"
import DriverBookingReducer from "../features/DriverBooking"
import NotificationReducer from "../features/Notificarion"

const store = configureStore({
    reducer : {
        RiderLoginForm : RiderLoginFormReducer,
        NavBar : NavBarReducer,
        userList : userListReducer,
        BookRide : BookRideReducer,
        DriverBooking : DriverBookingReducer,
        AdminBookHistory : AdminBookHistoryReducer,
        Notification : NotificationReducer,
        UserCreateOrEdit : UserCreateOrEditReducer,
    }
})
export default store