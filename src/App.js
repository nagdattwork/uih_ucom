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

import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditProjectMain from './_templates/editProject/edit_project_main';
import EditMiddle from './_templates/editProject/editMiddle';
import FileUpload from './_templates/TesterTab/fileUpload';
import Profile from './_templates/profile/profile';
import CreateAccount from './_templates/profile/createAccount';
import Account from './_templates/profile/account';

// Define a custom theme
const theme = createTheme({
  palette: {
    
    success: {
      main: '#3f51b5', // Change this to your desired primary color
    },
    primary: {
      main: '#3f51b5', // Change this to your desired primary color
      light:"#9fa8da"
    },
    info:{
      main:"#00695c"
    }
  },
});
function App() {
  const [login,setLogin]=useState(false)
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{

    // localStorage.removeItem('user')
    if(localStorage.getItem('user'))
    {
    const temp=JSON.parse(localStorage.getItem('user'))
    // console.log(temp)
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
   <ThemeProvider theme={theme}
   
   style={{
    backgroundColor : 'green',
  color : 'white',
  height : '100%'
   }}>
     {loading?(  <Box sx={{ display: 'flex',alignItems: 'center', justifyContent: 'center',height:"100vh" }}>
      <CircularProgress />
    </Box>):
     (<div >
      
     {
       login?(<BrowserRouter>
         <AppBarMain setLogin={setLogin}/>
         <Routes>
          
             <Route index element={<Home />} />
             <Route path="createnew" element={<CreateNewMain />} />
             <Route path="dashboard" element={<Dashboard />} />
             <Route path="search" element={<SearchPage />} forceRefresh={true} />
             <Route path="templates" element={<TemplateLC />} />
             <Route path="editproject" element={<EditMiddle />} />
             <Route path="filepush" element={<FileUpload />} />

             <Route path="/profile" element={<Profile />} />
             <Route path="/accounts" element={<Account />} />

         </Routes>
       </BrowserRouter>):(
        <BrowserRouter>
        <Routes>
        <Route index element={<Login setLogin={setLogin}/>}/>
        <Route path='createaccount' element={<CreateAccount/>}/>
        </Routes>
        </BrowserRouter>
       )
     }
  
     </div>)
     
    }
   </ThemeProvider>
  );
}

export default App;
