import {configureStore} from "@reduxjs/toolkit"
import RiderLoginFormReducer from "../features/RiderLoginFormSlice"
import NavBarReducer from "../features/NavBarSlice"

const store = configureStore({
    reducer : {
        RiderLoginForm : RiderLoginFormReducer,
        NavBar : NavBarReducer,
    }
})
export default store