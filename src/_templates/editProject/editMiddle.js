import React, { useState } from 'react'
import EditProjectMain from './edit_project_main'
import { appendEdits } from '../features/projectData/editData'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'

export default function EditMiddle() {

    const dispatch=useDispatch()
    const locationData=useLocation()
    const [editData,setEditData]=React.useState(locationData.state.data)
    const [temp,setTemp]=useState(0)
    React.useEffect(()=>{
        // const initialState = {
        //   projectDetails:{},
        //   customerDetails:{},
        //   documents:{},
        //   system:{},
        //   fiFunding:{},
        //   projectId:""
        // }
        // console.log(editData)
        dispatch(appendEdits({
          projectDetails:editData.project_title,
          customerDetails:editData.customer_details,
          system:editData.system,
          projectId:editData._id,
          fiFunding:editData.fi_funding,
          prevDocuments:editData.documents,
          
         
        }))
        if(temp==0)
        setTemp(temp+1)
      },[dispatch,temp])
      // console.log("location",locationData.state.data,"\n saved",editData.fi_funding)
  return (
    <EditProjectMain/>
  )
}
