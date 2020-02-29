import React, {useState, useEffect, useContext} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import Copyright from '../components/Copyright'
import Navigation from '../components/Navigation'
import { Link } from 'react-router-dom'
import Logo from '../img/logogreenwide.png'
import { Alert } from '@material-ui/lab'
import {ROOT_API} from "../api_endpoint";
import axios from 'axios';
import {Context} from "../store";

const useStyles = makeStyles(theme => ({
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
}));

export default function LoginScreen(props) {
  const [afterSuccessRegister, setAfterSuccessRegister] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");

  const { store, dispatch } = useContext(Context);

  const _login = () => {
    axios.post(`${ROOT_API}/v1/users/login`, {
      "user": {
        "email": emailInput,
        "password": passwordInput
      }
    }, {}).then(res => {
      console.log(res.data);
      dispatch({type: 'SET_TOKEN', data: res.data.meta.access_token});
    }).catch(err => {
      console.log(err.response);
      setLoginErrorMessage(err.response.data.message)
    })
  };

  const _handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const _handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  useEffect(() => {
    console.log(store);
    if(typeof props.location.state !== "undefined") {
      if (typeof props.location.state.success_register === 'undefined' || props.location.state.success_register === null || props.location.state.success_register === false) {
        console.log("login");
      } else {
        setAfterSuccessRegister(true);
        setCreatedUserEmail(props.location.state.created_user_email);
        delete props.location.state;
      }
    }
  }, [props.location.state]);

  const classes= useStyles();
  const theme = createMuiTheme({
    palette: {
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
            Login
          </Typography>
          {afterSuccessRegister ?
            <Alert style={{marginTop: "10px"}} severity={"success"}>Account successfully created! Confirmation email has been sent to {createdUserEmail}!</Alert>
          : null}
          {(loginErrorMessage.length > 0) ?
              <Alert style={{marginTop: "10px", width: "100%"}} severity={"error"}>{loginErrorMessage}</Alert>
          : null}
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  value={emailInput}
                  onChange={_handleEmailChange}
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
                  value={passwordInput}
                  onChange={_handlePasswordChange}
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
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={_login}
            >
            Login
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/register" variant="body2" className={classes.registerButtonForm}>
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