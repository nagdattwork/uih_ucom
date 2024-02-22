import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from '../_templates/features/userCred/userLogin'
import ProjectDataReducer from '../_templates/features/projectData/projectData'
export const store = configureStore({
  reducer: {
    login: LoginReducer,
    projectData:ProjectDataReducer
  }
})