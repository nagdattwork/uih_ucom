import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projectDetails: {},
  customerDetails: {},
  documents: {},
  prevDocuments: {},
  system: {},
  documentsDetails: {},

  fiFunding: {},
  fiFundingDocuments: {},
  projectId: "",
  outcomes: {},

}


export const editDataSlice = createSlice({
  name: 'projectData',
  initialState,

  reducers: {
    appendEdits: (state, action) => {

      if (action.payload?.projectDetails)
        state.projectDetails = action.payload.projectDetails

      if (action.payload?.customerDetails)
        state.customerDetails = action.payload.customerDetails

      if (action.payload?.documents)
        state.documents = action.payload.documents
      if (action.payload?.documentsDetails) {
        // console.log(action.payload.documentsDetails)

        state.documentsDetails = action.payload.documentsDetails

      }

      if (action.payload?.prevDocuments)
        state.prevDocuments = action.payload.prevDocuments

      if (action.payload?.system)
        state.system = action.payload.system

      if (action.payload?.fiFunding)
        state.fiFunding = action.payload.fiFunding


      if (action.payload?.fiFundingDocuments)
        state.fiFundingDocuments = action.payload.fiFundingDocuments

      if (action.payload?.projectId)
        state.projectId = action.payload.projectId
    
      if(action.payload?.outcomes)
        state.outcomes=action.payload.outcomes


    },
    emptyEdits: (state, action) => {
      state.projectDetails = {}
      state.customerDetails = {}

      state.documents = {}


      state.prevDocuments = {}
      state.documentsDetails = {}

      state.system = {}

      state.fiFunding = {}


      state.fiFundingDocuments = {}

      state.projectId = ""
      state.outcomes={}



    }



  },
})

export const { appendEdits, emptyEdits } = editDataSlice.actions

export default editDataSlice.reducer