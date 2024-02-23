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
import { Outlet, Link } from "react-router-dom";
import { makeStyles } from '@mui/material';

const drawerWidth = 240;
const navItems =[
  { title: 'Home', link: '/' },
  { title: 'Create New', link: '/createnew' },
  { title: 'Search & Edit', link: 'search' },
  { title: 'Dashboard', link: 'dashboard' },
  { title: 'Templates- L&C', link: 'templates' }
]
// const useStyles = makeStyles((theme) => ({
//   selectedButton: {
//     color: theme.palette.success.main, // Change the color for the selected button
//   },
// }));
function AppBarMain(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item,index) => (
          <Link to={item.link}>
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const [selectedButton, setSelectedButton] = React.useState('Home');
  // const classes = useStyles();
  // Function to handle button click and update the selected button
  const handleButtonClick = (buttonName) => {
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {/* MUI */}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item,index) => (
                 <Link to={item.link}>
              <Button key={index}   
              sx={{color:"#fff"}}
              // color={selectedButton === item ? 'primary' : 'error'}
              color={selectedButton === item.title ? 'primary' : 'error'}
             
              onClick={() => handleButtonClick(item.title)}
              >
                {item.title}
              </Button>
              </Link>
            ))}
          </Box>
          <BasicMenu setLogin={props.setLogin}/>
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
