import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-scroll';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const navItems = [
  { name: 'Home', to: 'home' },
  { name: 'Education', to: 'education' },
  { name: 'Experience', to: 'experience' },
  { name: 'Projects', to: 'projects' },
  { name: 'Skills', to: 'skills' },
  { name: 'Resume', to: 'resume' },
  { name: 'Contact', to: 'contact' },
];

const Header = ({ toggleTheme, mode, customCursorEnabled, setCustomCursorEnabled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem button key={item.name} component={Link} to={item.to} onClick={handleDrawerToggle}>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
      <ListItem button onClick={toggleTheme}>
        <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </ListItem>
    </List>
  );

  return (
    <>
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.name}
              component={Link}
              to={item.to}
              sx={{
                color: 'secondary.main',
                mx: 1,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {item.name}
            </Button>
          ))}
          <IconButton sx={{ ml: 2 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
    </>
  );
};

export default Header; 