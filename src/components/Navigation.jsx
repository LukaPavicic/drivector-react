import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem, ListItemIcon, ListItemText, Icon, Badge, Divider } from '@material-ui/core';
import { Help, MonetizationOn } from '@material-ui/icons';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
      backgroundColor: "#27ae60",
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
            <IconButton onClick={this._toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Drivector
            </Typography>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Register</Button>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.leftDrawerOpen} onClose={this._toggleDrawer}>
          <div className={classes.fullList}>            
            <List>
              <ListItem>     
                <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} badgeContent={"v0.1"}>
                  <Typography className={classes.mainColor} variant="h6">Drivector</Typography>
                </Badge>                           
              </ListItem>

              <Divider />

              <ListItem button>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>

              <ListItem button>
                <ListItemIcon><Icon component={Help} /></ListItemIcon>
                <ListItemText primary="Support" />
              </ListItem>

              <ListItem button>
                <ListItemIcon><Icon component={MonetizationOn} /></ListItemIcon>
                <ListItemText primary="Pricing" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);