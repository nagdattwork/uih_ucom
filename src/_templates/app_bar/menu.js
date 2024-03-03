import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, IconButton } from '@mui/material';
import {  useDispatch ,useSelector} from 'react-redux';
import { logout } from '../features/userCred/userLogin';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
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
      >
      <Link to='/profile'>
      <MenuItem  onClick={handleClose}>Profile</MenuItem>
      </Link>
        <MenuItem onClick={handleClose}>My account</MenuItem>

        <MenuItem onClick={()=>{
          localStorage.removeItem('user')
          setAnchorEl(null)
          dispatch(logout())
          props.setLogin(false)
          history("/")
        }}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
