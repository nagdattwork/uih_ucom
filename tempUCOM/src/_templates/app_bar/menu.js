import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, IconButton } from '@mui/material';
import {  useDispatch ,useSelector} from 'react-redux';
import { logout } from '../features/userCred/userLogin';
export default function BasicMenu(props) {
  const [user,setUser]=React.useState(useSelector((state)=>state.login))

  const dispatch=useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  console.log("Inside Menu bar",user)
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
       <Avatar alt="Remy Sharp" src={"http://13.232.174.92/"+user.user.image } />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>

        <MenuItem onClick={()=>{
          localStorage.removeItem('user')
          setAnchorEl(null)
          dispatch(logout())
          props.setLogin(false)
        }}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
