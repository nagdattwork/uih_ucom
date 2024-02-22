import Login from './_templates/initialPages/Login';
import Home from './_templates/homePage/home';
import CreateNewMain from './_templates/create_new/create_new_main';
import Dashboard from './_templates/dashboard.js/dashboard';
import SearchPage from './_templates/searchPage/searchpage';
import TemplateLC from './_templates/template_l_and_c/templateLC';
import AppBarMain from './_templates/app_bar/app_bar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login as loginRedux}  from './_templates/features/userCred/userLogin';
import { Box, CircularProgress } from '@mui/material';
function App() {
  const [login,setLogin]=useState(false)
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    if(localStorage.getItem('user'))
    {
    const temp=JSON.parse(localStorage.getItem('user'))
    console.log(temp)
    dispatch(loginRedux({
      loggedIn:temp.loggedIn,
        user:temp.user,
        token:temp.token
    }))
    setLogin(true)
    
  }
  setLoading(false)
  },[])
  return (
   <div>
     {loading?(  <Box sx={{ display: 'flex',alignItems: 'center', justifyContent: 'center',height:"100vh" }}>
      <CircularProgress />
    </Box>):
     (<div style={{backgroundColor:"#f6fdf7"}}>
      
     {
       login?(<BrowserRouter>
         <AppBarMain setLogin={setLogin}/>
         <Routes>
          
             <Route index element={<Home />} />
             <Route path="createnew" element={<CreateNewMain />} />
             <Route path="dashboard" element={<Dashboard />} />
             <Route path="search" element={<SearchPage />} />
             <Route path="templates" element={<TemplateLC />} />
         </Routes>
       </BrowserRouter>):(<Login setLogin={setLogin}/>)
     }
  
     </div>)
     
    }
   </div>
  );
}

export default App;
