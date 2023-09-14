import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Link as MuiLink,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { ApplicationLogo } from './core/ApplicationLogo';
import { AiOutlineLogin } from 'react-icons/ai';

export const Header = ({ navigation }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>

          <Link to="/">
            <ApplicationLogo className="flex-shrink-0 md:w-50 w-20"/>
          </Link>
          <div style={{ flexGrow: 1 }} />
          <div className="hidden md:flex md:items-center md:justify-between w-2/3">
            <div>
            {navigation.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.to}
                color={location.pathname === item.to ? 'primary' : 'inherit'}
                variant="text"
              >
                {item.name}
              </Button>
            ))}
            </div>
            <Button
              color="primary"
              to="/login"
              component={Link}
              variant="contained"
            >
              Login
            </Button>
          </div>
          <div className="flex md:hidden">
            <IconButton
              color="inherit"
              onClick={toggleMobileMenu}
              edge="end"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        variant="temporary"
      >
        <List component="nav">
          {navigation.map((item) => (
            <ListItem
              color={location.pathname === item.to ? 'primary' : 'inherit'}
              key={item.name}
              component={Link}
              to={item.to}
              onClick={toggleMobileMenu}
            >
              <Button
                color={location.pathname === item.to ? 'primary' : 'inherit'}
                variant="text"
              >
                {item.name}
              </Button>
            </ListItem>
          ))}
          <ListItem
            variant="contained"
            component={MuiLink}
            href="/login"
            onClick={toggleMobileMenu}
          >
            <Button variant='contained'>
            <ListItemAvatar>
                <Avatar>
                    <AiOutlineLogin/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Login" />
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
