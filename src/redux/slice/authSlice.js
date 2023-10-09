import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn : false,
    email : null,
    username: null,
    user_id : null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
     // set action
    SET_ACTIVE_USER: (state, action)=>{
        const {email, username, user_id} = action.payload
        state.isLoggedIn = true
        state.username = username
        state.email = email
        state.user_id = user_id
    },

    REMOVE_ACTIVE_USER: (state, action)=>{
        state.isLoggedIn = false
        state.username = null
        state.email = null
        state.user_id = null
    }
  }
});
// export action
export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = authSlice.actions
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectEmail = (state) => state.auth.email
export const selectUserName = (state) => state.auth.username
export const selectUserID = (state) => state.auth.user_id

export default authSlice.reducer