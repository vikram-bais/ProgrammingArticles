import * as React from 'react';
import { Menu, MenuItem, Button, Avatar, makeStyles, Box, createTheme } from '@material-ui/core';
import { useHistory } from 'react-router';


const theme = createTheme();

const useStyle = makeStyles(() => ({
    sizeAvatar: {
      height: theme.spacing(5),
      width: theme.spacing(5),
      marginRight: 4
    },
  }));

export default function CategoriesMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyle();
  const history = useHistory();

  const handleMyProfile = () => {
      history.push('/profile/'+localStorage.getItem('username'))
  }
  const categoriesList = [
    'Algorithms',
    'Data Structure',
    'C++',
    'Java',
    'Opps'
]

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        style={{textTransform: 'none', border:'1px solid #444444'}}
        onClick={handleClick}
        variant= 'contained'
      >
        {'Select Category'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 
          'aria-labelledby':  'basic-button',
        }}
      >
         {categoriesList.map(ele=>(
            <MenuItem onClick={handleClose}>{ele}</MenuItem>

         ))}

        <MenuItem onClick={handleMyProfile}>My Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Articles</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
