import React, {useState} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Logo from '../img/logowhitewide.png'
import { withRouter, useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Settings from '@material-ui/icons/Settings';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {ListItemIcon} from "@material-ui/core";
import { useAuth } from "../store";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    height: "100%",
    '& a': {
      color: "white",
      textDecoration: "none",
    }
  },
  appBar: {
      '& a': {
        color: "white"
      }
  },
  fullList: {
    width: 250,
  },
  mainColor: {
    color: "#27ae60",
  },
  logo: {
    maxWidth: 160,
    cursor: "pointer",
  },
  logoWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }
}));

function Navigation(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const {history} = useHistory();
  const classes = useStyles();
  const { authToken, setAuthToken } = useAuth();

  const _handleMenu = event => {
    setAnchorEl(event.currentTarget);
    setOpen(Boolean(event.currentTarget));
  };

  const _handleClose = () => {
    setAnchorEl(null);
    setOpen(Boolean(false));
  };

  const _onLogoClick = () => {
    if(props.userLoggedIn) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  };

  const _logout = () => {
    setAuthToken(null);
    history.push('/');
  };

  const _renderNavBarRightContent = () => {
    if(props.userLoggedIn) {
      return (
          <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={_handleMenu}
                color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={_handleClose}
            >
              <MenuItem onClick={_handleClose}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                Your Profile
              </MenuItem>
              <MenuItem onClick={_handleClose}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={_logout}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
      )
    } else {
      return (
          <div>
            <Link to="/login"><Button color="inherit">Login</Button></Link>
            <Link to="/register"><Button color="inherit">Register</Button></Link>
          </div>
      )
    }
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} style={(typeof props.vtcColor === "undefined" || props.vtcColor === false) ? {backgroundColor: "#27ae60"} : {backgroundColor: props.vtcColor}} position="fixed">
        <Toolbar>
          <div className={classes.logoWrapper}>
            <img alt={"logo"} onClick={_onLogoClick} src={Logo} className={classes.logo} />
          </div>
          {_renderNavBarRightContent()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;