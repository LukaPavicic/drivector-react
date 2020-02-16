import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles, createMuiTheme, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles'
import Copyright from '../components/Copyright'
import Navigation from '../components/Navigation'
import { Link } from 'react-router-dom'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#27ae60",
    '&:hover': {
      backgroundColor: "#2ecc71",
    }
  },
  inputLabel: {
    "&$cssFocused": {
      color: "green",
    },
  },
  textOutlineInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `#27ae60 !important`,      
    }
  },
  cssFocused: {},
  notchedOutline: {
    borderWidth: '1px',    
  },
  registerButton: {
    backgroundColor: "#27ae60",
  }
});

class LoginScreen extends React.Component {

  render() {

    const { classes } = this.props

    const theme = createMuiTheme({
      pallete: {
        primary: {
          main: "#27ae60",
          contrastText: "#fff",
        }
      }
    })

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Navigation/>
          <CssBaseline />
          <div className={classes.paper}>
            {/* LOGO GOES HERE */}
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>                
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    InputLabelProps={{
                      classes: {      
                        root: classes.inputLabel,                                                          
                        focused: classes.cssFocused,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textOutlineInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },                    
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    InputLabelProps={{
                      classes: {      
                        root: classes.inputLabel,                                                          
                        focused: classes.cssFocused,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textOutlineInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },                    
                    }}
                  />
                </Grid>                
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
              Login
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/register" variant="body2">
                    Don't have an account? Register.
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(LoginScreen)