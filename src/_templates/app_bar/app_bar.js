import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BasicMenu from './menu';
import { green } from '@mui/material/colors';
import { Outlet, Link, useLocation } from "react-router-dom";
import { createTheme, makeStyles } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    
    success: {
      main: '#3f51b5', // Change this to your desired primary color
    },
    primary: {
      main: '#3f51b5', // Change this to your desired primary color
    },
    info:{
      main:"#1a237e"
    }
  },
});
function AppBarMain(props) {
  const [navItems,setNavItems]=React.useState([
    { title: 'Home', link: '/',state:{caller:"home",data:null} },
    { title: 'Create New', link: '/createnew',state:{caller:"create_new",data:null} },
    { title: 'Search & Edit', link: 'search',state:{caller:"search",data:null} },
    { title: 'Dashboard', link: 'dashboard',state:{caller:"dashboard",data:null} },
    { title: 'Templates- L&C', link: 'templates',state:{caller:"templates",data:null} },
    {
      title: "Requests",
      link: "accounts",
      state: { caller: "accounts", data: null }
  }
    // { title: 'Tester - FILE ', link: 'filepush',state:{caller:"tester",data:null} }
  
  ])
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [selected,setSelected]=React.useState(-1)
  const user=useSelector(state=>state.login)
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

 
  React.useEffect(()=>{
    console.log(navItems)
  },[navItems])

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        uCOM
      </Typography>
      <Divider />
      <List>
        {navItems.map((item,index) => {
          
          if(user.user.userType === 'basic' && item.link=='accounts'){
            return <></>
          }
          return(
          <Link 
          to={item.link}
          state={item.state}
          
          >
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
          </Link>
        )})}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const [selectedButton, setSelectedButton] = React.useState('Home');
  // const classes = useStyles();
  // Function to handle button click and update the selected button

  const location = useLocation();
  const [currentPath, setCurrentPath] = React.useState('');

  React.useEffect(() => {
    if(location.pathname==='/')
    { 
      setSelected(0)
     }
    if(location.pathname==='/createnew')
   { 
     setSelected(1)
    }
    if(location.pathname==='/search')
    { 
      setSelected(2)
     }
     if(location.pathname==='/dashboard')
     { 
       setSelected(3)
      }
      if(location.pathname==='/templates')
      { 
        setSelected(4)
       }
       if(location.pathname==='/accounts')
      { 
        setSelected(5)
       }
  }, [location.pathname]);


  React.useEffect(()=>{
    setNavItems([...navItems])
  },[selectedButton])
  const handleButtonClick = (buttonName) => {
    console.log(buttonName,location.pathname)
    setSelectedButton(buttonName);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" color='success' position='sticky' >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton sx={{ ml: 1 }} onClick={()=>{props.setMode(!props.mode);}} color="inherit">
        {props.mode === true ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {/* MUI */}
          </Typography>
          <ThemeProvider theme={theme}>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item,index) => {
              if(user.user.userType === 'basic' && item.link=='accounts'){
                return <></>
              }
              
              return(
                   <Link 
                   to={item.link}
                   state={item.state}
                   
                   >
              <Button key={index}   
              sx={{color:"#fff"}}
              // color={selectedButton === item ? 'primary' : 'error'}
             
             
              onClick={() =>{
                setSelected(index)
                handleButtonClick(item.title)}}
              variant={selected===index?'contained':"text"}
              color={selected===index?'info':'success'}
              
              >
                {item.title}
              </Button>
              </Link>
            )})}
          </Box>
</ThemeProvider>
         
          <BasicMenu setLogin={props.setLogin} mode = {props.mode}  />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

       
      </nav>
      
      <Box >
        {/* <Toolbar /> */}
        
      </Box>
    </Box>
  );
}

AppBarMain.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AppBarMain;
