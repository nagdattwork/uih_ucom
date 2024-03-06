import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projectDetails:{},
  customerDetails:{},
  documents:{},
  documentsDetails:{},
  system:{},
  fiFunding:{},
  fiFundingDocuments:{},
  projectId:""
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

      
      if(action.payload?.documentsDetails)
      {
        // console.log(action.payload.documentsDetails)
        
        state.documentsDetails=action.payload.documentsDetails
      
      }
      
      if(action.payload?.system)
      state.system=action.payload.system

      
      
      if(action.payload?.fiFundingDocuments)
      state.fiFundingDocuments=action.payload.fiFundingDocuments

      if(action.payload?.fiFunding)
      state.fiFunding=action.payload.fiFunding


    
    },

    makeEmpty:(state,action)=>{
      state.projectDetails={}
      state.customerDetails={}
      state.documents={}
      state.documentsDetails={}
      state.system= {}
      state.fiFunding={}
      state.projectId=""

     




    }
   
   
  },
})

export const { append,makeEmpty } = projectDataSlice.actions

export default projectDataSlice.reducer