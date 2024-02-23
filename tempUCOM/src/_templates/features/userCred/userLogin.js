import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
  token:null,
  user:{}
}


export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
   
  reducers: {
    login: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.loggedIn=action.payload.loggedIn
      state.user=action.payload.user
      state.token=action.payload.token

    
    },
    logout: (state) => {
      state.loggedIn=false
      state.user={}
      state.token=null
    },
   
  },
})

export const { login, logout } = userLoginSlice.actions

export default userLoginSlice.reducer