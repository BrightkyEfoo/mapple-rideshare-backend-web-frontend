import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isLogin: false,
  isLogged: false,
  selected: 1,
  reload: false,
};

const NavBarSlice = createSlice({
  name: 'NavBar',
  initialState,
  reducers: {
    reload: state => {
      state.reload = !state.reload;
    },
    setIsLogin: (state, data) => {
      state.isLogin = data.payload;
    },
    setIsLogged: (state, data) => {
      state.isLogged = data.payload;
    },
    setSelected: (state, data) => {
      state.selected = data.payload;
    },
  },
});
const NavBarReducer = NavBarSlice.reducer;
export default NavBarReducer;
export const NavBarActions = NavBarSlice.actions;
