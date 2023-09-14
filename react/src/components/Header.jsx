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
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import ZenithEventsLogo from '../assets/zenitheventslogo.svg';

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
            <img
              className="flex-shrink-0 md:w-50 w-20"
              src={ZenithEventsLogo}
              alt="ZenithEvents"
            />
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
        <List>
          {navigation.map((item) => (
            <ListItem

              key={item.name}
              component={Link}
              to={item.to}
              onClick={toggleMobileMenu}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          <ListItem
            variant="contained"
            component={MuiLink}
            href="/login"
            onClick={toggleMobileMenu}
          >
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
