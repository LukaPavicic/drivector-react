import React from 'react';
import { Button, CssBaseline, TextField, Grid, Box, Typography, Container, withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core'
import Copyright from '../components/Copyright'
import Navigation from '../components/Navigation'
import { Link, withRouter } from 'react-router-dom'
import Logo from '../img/logogreenwide.png'
import axios from 'axios';
import { ROOT_API } from '../api_endpoint.js';
import { Alert } from '@material-ui/lab';

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
  },
  registerButtonForm: {
    color: "#27ae60",
  }
});

class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email_input: "",
      password_input: "",
      password_confirmation_input: "",
      tmp_profile_link_input: "",
      steam_profile_link_input: "",
      birth_date_input: null,
      username_input: "",
      error_messages: [],
    }
  }

  _handleEmailChange = (e) => {
    this.setState({
      email_input: e.target.value
    })
  };

  _handlePasswordChange = (e) => {
    this.setState({
      password_input: e.target.value
    })
  };

  _handleTmpChange = (e) => {
    this.setState({
      tmp_profile_link_input: e.target.value
    })
  };

  _handleSteamChange = (e) => {
    this.setState({
      steam_profile_link_input: e.target.value
    })
  };

  _handlePasswordConfirmationChange = (e) => {
    this.setState({
      password_confirmation_input: e.target.value
    })
  };

  _handleBirthDateChange = (e) => {
    this.setState({
      birth_date_input: e.target.value
    })
  };

  _handleUsernameChange = (e) => {
    this.setState({
      username_input: e.target.value
    })
  };

  _getKeyWithValue = (object, value) => {
    for(let prop in object) {
      if(object.hasOwnProperty(prop)) {
        if(object[prop] === value){
          return prop;
        }
      }
    }
  };

  _register = () => {
    // send register request to server
    axios.post(`${ROOT_API}/v1/users/register`, {
      "user": {
        "username": this.state.username_input,
        "email": this.state.email_input,
        "password": this.state.password_input,
        "password_confirmation": this.state.password_confirmation_input,
        "tmp_profile_link": this.state.tmp_profile_link_input,
        "steam_profile_link": this.state.steam_profile_link_input,
        "birth_date": this.state.birth_date_input
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res.data);
      let state = {
        success_register: true,
        created_user_email: res.data.user.email
      };
      this.props.history.push('/login', state);
    }).catch(err => {
      this.setState({
        error_messages: err.response.data
      })
    })
  };

  render() {
    const { classes } = this.props;

    const theme = createMuiTheme({
      pallete: {
        primary: {
          main: "#27ae60",
          contrastText: "#fff",
        }
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Navigation/>
          <CssBaseline />
          <div className={classes.paper}>
            <img alt={"logo"} src={Logo} style={{maxWidth: 250}}/>
            <Typography component="h1" variant="h5">
              Register
            </Typography>      
            {this.state.error_messages.map(msg => (
                <Alert style={{marginTop: "20px", width: "100%"}} severity={"error"}>{msg}</Alert>
            ))}
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField                  
                    name="username"
                    variant="outlined"
                    value={this.state.username}
                    onChange={this._handleUsernameChange}
                    required
                    fullWidth                    
                    label="Username"
                    autoFocus
                    color="primary"                  
                    id="validation-outlined-input"
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
                    name="tmplink"
                    variant="outlined"
                    value={this.state.tmp_profile_link_input}
                    onChange={this._handleTmpChange}
                    required
                    fullWidth
                    id="tmplink"
                    label="TruckersMP Profile Link"  
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
                    value={this.state.steam_profile_link_input}
                    onChange={this._handleSteamChange}
                    id="steamlink"
                    label="Steam Profile Link"
                    name="steamprofilelink"    
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
                    value={this.state.email_input}
                    onChange={this._handleEmailChange}
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
                    value={this.state.password_input}
                    onChange={this._handlePasswordChange}
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
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password_confirmation"
                      label="Password Confirmation"
                      value={this.state.password_confirmation_input}
                      onChange={this._handlePasswordConfirmationChange}
                      type="password"
                      id="password_confirmation"
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
                    name="age"
                    value={this.state.birth_date_input}
                    onChange={this._handleBirthDateChange}
                    label="Birthday"
                    type="date"
                    id="date"
                    InputLabelProps={{
                      classes: {
                        root: classes.inputLabel,
                        focused: classes.cssFocused,
                      },
                      shrink: true
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
                  <Typography>
                    By signing up you agree to our <Link style={{color: "#27ae60"}} to={"/"}>Terms Of Use</Link>.
                  </Typography>
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this._register}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2" className={classes.registerButtonForm}>
                    Already have an account? Sign in
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

export default withRouter(withStyles(styles)(RegisterScreen))