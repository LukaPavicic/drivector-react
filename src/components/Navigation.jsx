import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Logo from '../img/logowhitewide.png'
import { withRouter } from 'react-router-dom'

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
    super(props)
    this.state = {
      leftDrawerOpen: false,
    }
  }  

  _onLogoClick = () => {
    // window.location.replace("/")
    this.props.history.push("/")
  }

  _toggleDrawer = event => {
    if(event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    this.setState({
      leftDrawerOpen: !this.state.leftDrawerOpen
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>           
            <div className={classes.logoWrapper}>
              <img onClick={this._onLogoClick} src={Logo} className={classes.logo} />
            </div>
            <Link to="/login"><Button color="inherit">Login</Button></Link>
            <Link to="/register"><Button color="inherit">Register</Button></Link>
          </Toolbar>
        </AppBar>        
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Navigation));