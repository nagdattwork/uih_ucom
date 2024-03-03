import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Divider, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import {  useDispatch ,useSelector} from 'react-redux';
import { logout } from '../features/userCred/userLogin';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
export default function BasicMenu(props) {
  const [user,setUser]=React.useState(useSelector((state)=>state.login))
  const history=useNavigate()
  const dispatch=useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  // console.log("Inside Menu bar",user)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        variant='contained'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='success'
      >
       <Avatar src={process.env.REACT_APP_LINK+user.user.image } alt={user.user.image} >

       <PersonIcon/>
        </Avatar>
       
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}

        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        
<MenuItem  onClick={handleClose}>
      <ListItemIcon>
            <Avatar  src={process.env.REACT_APP_LINK+user.user.image}   sx={{ width: 24, height: 24 }} />
          </ListItemIcon>
        <ListItemText primary={user.user.fname+" "+user.user.lname}
        
       
        />
        
      
      </MenuItem>

<Divider/>
      <Link to='/profile' 
        component="button"
        style={{textDecoration:'none',color:'black'}}
      >
      <MenuItem  onClick={handleClose}>
      <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText>
          Profile
        </ListItemText>
      </MenuItem>
      </Link>
        <MenuItem onClick={handleClose}>

        <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText>
          My Account
        </ListItemText>
        </MenuItem>

        <MenuItem onClick={()=>{
          localStorage.removeItem('user')
          setAnchorEl(null)
          dispatch(logout())
          props.setLogin(false)
          history("/")
        }}>

<ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText>
          Logout
        </ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
