export const tab1Validation=(data)=>{
    if(!data.title)
    return {status:false,message:"Enter Title First",attribute:"title"}


    return {status:true,message:"Validated Succefully"}

   
}


export const tab2Validation=(data)=>{
    // return {status:false,message:"Enter Title First"}
    return {status:true,message:"Validated Succefully"}

}
