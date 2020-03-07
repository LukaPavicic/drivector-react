import React from 'react';
import { withStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Logo from '../img/logowhitewide.png'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Settings from '@material-ui/icons/Settings';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {ListItemIcon} from "@material-ui/core";

const styles = theme => ({
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
      backgroundColor: "#27ae60",
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
});

class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leftDrawerOpen: false,
      anchorEl: null,
      open: false
    }
  }

  _handleMenu = event => {
    this.setState({
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget)
    })
  };

  _handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false
    })
  };

  _onLogoClick = () => {
    if(this.props.userLoggedIn) {
      this.props.history.push("/dashboard");
    } else {
      this.props.history.push("/");
    }
  };

  _renderNavBarRightContent = () => {
    if(this.props.userLoggedIn) {
      return (
          <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this._handleMenu}
                color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={this.state.open}
                onClose={this._handleClose}
            >
              <MenuItem onClick={this._handleClose}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                Your Profile
              </MenuItem>
              <MenuItem onClick={this._handleClose}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={this._handleClose}>
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>           
            <div className={classes.logoWrapper}>
              <img alt={"logo"} onClick={this._onLogoClick} src={Logo} className={classes.logo} />
            </div>
            {this._renderNavBarRightContent()}
          </Toolbar>
        </AppBar>        
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Navigation));