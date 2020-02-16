import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
  }
});

class Navigation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      leftDrawerOpen: false,
    }
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
            <Typography variant="h6" className={classes.title}>
              <Link to="/">
                Drivector
              </Link>              
            </Typography>
            <Link to="/login"><Button color="inherit">Login</Button></Link>
            <Link to="/register"><Button color="inherit">Register</Button></Link>
          </Toolbar>
        </AppBar>        
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);