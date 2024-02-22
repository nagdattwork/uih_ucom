import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projectDetails:{},
  customerDetails:{},
  documents:{},
}


export const projectDataSlice = createSlice({
  name: 'projectData',
  initialState,
   
  reducers: {
    append: (state,action) => {
        
      if(action.payload?.projectDetails)
      state.projectDetails=action.payload.projectDetails

      if(action.payload?.customerDetails)
      state.customerDetails=action.payload.customerDetails

      if(action.payload?.documents)
      state.documents=action.payload.documents

      if(action.payload?.system)
      state.system=action.payload.system

    
    },
   
   
  },
})

export const { append } = projectDataSlice.actions

export default projectDataSlice.reducer