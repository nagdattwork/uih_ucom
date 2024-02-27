import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from '../_templates/features/userCred/userLogin'
import ProjectDataReducer from '../_templates/features/projectData/projectData'
import EditDataReducer from '../_templates/features/projectData/editData'
export const store = configureStore({
  reducer: {
    login: LoginReducer,
    projectData:ProjectDataReducer,
    editData:EditDataReducer
  }
})