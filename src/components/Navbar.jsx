import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar className='nav'position="static" sx={{ backgroundColor: 'green' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <h1 className='logo'>Doggy Daycare</h1>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Tooltip title="Home">
            <IconButton color="inherit" component={Link} to="/">
              <HomeIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Catalog">
            <IconButton color="inherit" component={Link} to="/catalog">
              <PetsIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add Dog">
            <IconButton color="inherit" component={Link} to="/add-dog">
              <AddBoxIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


