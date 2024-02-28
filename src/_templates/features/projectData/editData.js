import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projectDetails:{},
  customerDetails:{},
  documents:{},
  prevDocuments:{},
  system:{},
  fiFunding:{},
  fiFundingDocuments:{},
  projectId:""
}


export const editDataSlice = createSlice({
  name: 'projectData',
  initialState,
   
  reducers: {
    appendEdits: (state,action) => {
        
      if(action.payload?.projectDetails)
      state.projectDetails=action.payload.projectDetails

      if(action.payload?.customerDetails)
      state.customerDetails=action.payload.customerDetails

      if(action.payload?.documents)
      state.documents=action.payload.documents

      
      if(action.payload?.prevDocuments)
      state.prevDocuments=action.payload.prevDocuments

      if(action.payload?.system)
      state.system=action.payload.system

      if(action.payload?.fiFunding)
      state.fiFunding=action.payload.fiFunding


      if(action.payload?.fiFundingDocuments)
      state.fiFundingDocuments=action.payload.fiFundingDocuments

      if(action.payload?.projectId)
      state.projectId=action.payload.projectId


    
    },

 
   
   
  },
})

export const { appendEdits } = editDataSlice.actions

export default editDataSlice.reducer