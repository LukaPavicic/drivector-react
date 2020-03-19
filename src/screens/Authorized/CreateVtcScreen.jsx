import React, { useState } from 'react';
import { useAuth } from "../../store";
import Navigation from "../../components/Navigation";
import {Card, CardActions, CardContent, CardHeader, Container} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import Add from '@material-ui/icons/Add'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {SketchPicker} from 'react-color';
import Amex from '../../img/amex.png';
import Visa from '../../img/visa.png';
import Master from '../../img/master.png';
import Discover from '../../img/discover.png';
import Jcb from '../../img/jcb.png';
import Diners from '../../img/diners.png';
import CheckIcon from '@material-ui/icons/Check';
import {Alert} from "@material-ui/lab";
import PaymentForm from "../../components/PaymentForm";
import {ROOT_API} from "../../api_endpoint";
import axios from 'axios';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    addVtcImage: {
        backgroundColor: "#c2c2c2",
        width: "130px",
        height: "130px",
        borderRadius: "65px",
        marginTop: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        '&:hover': {
            backgroundColor: "#27ae60",
            cursor: "pointer"
        }
    },
    form: {
        width: '70%', // Fix IE 11 issue.
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
    navButtonsStepper: {
        width: "70%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    vtcImageSelected: {
        width: "100%",
        height: "100%",
        position: "relative",
        top: 0,
        left: 0,
        backgroundSize: "cover",
        borderRadius: "65px",
        backgroundPosition: "center"
    },
    cardHeader: {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    pricingTitle: {
        color: "white",
        marginBottom: "20px"
    },
    pricingButtons: {
        backgroundColor: "#27ae60",
        color: "white",
        '&:hover': {
            backgroundColor: "#2ecc71",
        }
    },
    pricingButtonsAlt: {
        borderColor: "#27ae60",
        color: "#27ae60",
        '&:hover': {
            color: "white",
            backgroundColor: "#2ecc71",
        }
    },
    pricingDescriptionDown: {
        color: "white",
        marginTop: "20px"
    },
    pricingCardsSelect: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    pricingCardUl: {
        paddingLeft: "10px",
    },
    pricingOptionsWrapper: {
        marginTop: "5px",
    },
    selectedPricingCard: {
        backgroundColor: "#27ae60",
        color: "white"
    },
    selectedPricingCardHeader: {
        backgroundColor: "#27ae60",
        color: "white",
    }
}));

const _getSteps = () => {
    return ['VTC Info', 'VTC Settings', 'Choose Payment Plan', 'Add Payment Method'];
};

const theme = createMuiTheme({
   overrides: {
       MuiStepIcon: {
           root: {
               '&$completed': {
                   color: "#27ae60"
               },
               '&$active': {
                   color: "#27ae60"
               }
           },
           active: {},
           completed: {},
       }
   }
});

export default function CreateVtcScreen(props) {

    const classes = useStyles();
    const steps = _getSteps();
    const [activeStep, setActiveStep] = useState(0);
    const [vtcName, setVtcName] = useState("");
    const [vtcDescription, setVtcDescription] = useState("");
    const [vtcImage, setVtcImage] = useState(null);
    const [vtcColor, setVtcColor] = useState("#27ae60");
    const [vtcMinimumAge, setVtcMinimumAge] = useState(null);
    const [selectedPricingPlan, setSelectedPricingPlan] = useState(null);
    const [stepErrors, setStepErrors] = useState([]);
    const {authToken, setAuthToken} = useAuth();


    const handleNext = () => {
        setStepErrors([]);
        let  canGoNext = true;
        if(activeStep === 0) {
            if(vtcName.length < 3 || vtcName.length > 35) {
                canGoNext = false;
                setStepErrors(prevState => [...prevState, "Name needs to be between 3 and 35 characters"])
            }
            if(vtcDescription.length < 10 || vtcDescription.length > 255) {
                canGoNext = false;
                setStepErrors(prevState => [...prevState, "Description needs to be between 10 and 255 characters"])
            }
            if(vtcImage === null) {
                canGoNext = false;
                setStepErrors(prevState => [...prevState, "You need to select VTC image"])
            }
        }
        if(activeStep === 2) {
            if(selectedPricingPlan === null) {
                canGoNext = false;
                setStepErrors(prevState => [...prevState, "Choose a pricing plan"])
            }
        }
        if(canGoNext) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const _handleImageSelect = (e) => {
        setVtcImage(URL.createObjectURL(e.target.files[0]));
    };

    const _showUploadFile = () => {
        document.getElementById('addVtcImage').click()
    };

    const _handleVtcNameInput = (e) => {
      setVtcName(e.target.value);
    };

    const _handleVtcDescriptionInput = (e) => {
        setVtcDescription(e.target.value);
    };

    const _handleVtcColorChange = (color) => {
      setVtcColor(color.hex);
    };

    const _handleVtcMinimumAgeInput = (e) => {
        setVtcMinimumAge(e.target.value);
    };

    const history = useHistory();

    const createVtc = () => {
        axios.post(`${ROOT_API}/v1/vtcs/create`, {
            "vtc": {
                "name": vtcName,
                "description": vtcDescription,
                "main_color": vtcColor,
                "minimum_age_to_join": vtcMinimumAge
            }
        }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            console.log(res.data);
            history.push('/dashboard')
        }).catch(err => {
            console.log(err);
        })
    };

    const _getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div style={{textAlign: "center", padding: "24px", display: "flex",alignItems: "center", flexDirection: "column"}}>
                        <Typography style={{marginBottom: "7px"}} variant={"h3"}>VTC Info</Typography>
                        <Typography variant={"h5"}>This data will be shown to all users who see you VTC page.</Typography>
                        <Typography variant={"h6"} style={{marginTop: "15px"}}>Add an image to your VTC</Typography>
                        <div onClick={_showUploadFile} className={classes.addVtcImage}>
                            <input id={"addVtcImage"} style={{display: "none", width: "100%", height: "100%"}} type={"file"} onChange={_handleImageSelect}/>
                            {(vtcImage === null) ?
                                <Icon component={Add} style={{color: "white", fontSize: "65px"}}/>
                                :
                                <div className={classes.vtcImageSelected} style={{backgroundImage: `url('${vtcImage}')`}}>

                                </div>
                            }
                        </div>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="vtc_name"
                                        label="VTC Name"
                                        value={vtcName}
                                        onChange={_handleVtcNameInput}
                                        name="vtc_name"
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
                                        multiline
                                        id="description"
                                        value={vtcDescription}
                                        onChange={_handleVtcDescriptionInput}
                                        label="About your VTC"
                                        name="description"
                                        rows={4}
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
                        </form>
                    </div>
                );
            case 1:
                return (
                    <div style={{textAlign: "center", padding: "24px", display: "flex",alignItems: "center", flexDirection: "column"}}>
                        <Typography style={{marginBottom: "7px"}} variant={"h3"}>VTC Settings</Typography>
                        <Typography variant={"h5"}>Add simple configuration for your VTC.</Typography>
                        <Typography variant={"caption"} style={{color: "grey", marginTop: "10px"}}>You'll be able to configure more settings later on.</Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="minimum_age_to_join"
                                        label="Minimum Age To Join"
                                        value={vtcMinimumAge}
                                        onChange={_handleVtcMinimumAgeInput}
                                        name="minimum_age_to_join"
                                        type={"number"}
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
                                    <Typography variant={"caption"} style={{color: "grey"}}>Leave empty if you don't want to set age requirement.</Typography>
                                </Grid>
                                <Grid item xs={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <Typography variant={"h6"} style={{marginTop: "5px", marginBottom: "5px"}}>Choose your VTCs primary color</Typography>
                                    <Typography variant={"caption"} style={{color: "grey", marginBottom: "5px"}}>Choose anything you want. This will be used as main display color on your VTC page.</Typography>
                                    <SketchPicker color={vtcColor} onChangeComplete={_handleVtcColorChange}/>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                );
            case 2:
                return (
                    <div style={{textAlign: "center", padding: "24px", display: "flex",alignItems: "center", flexDirection: "column", width: "80%"}}>
                        <Typography variant={"h6"} style={{marginBottom: "15px"}}>Choose your pricing plan</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <Card className={selectedPricingPlan === 0 ? classes.selectedPricingCard : null}>
                                    <CardHeader
                                        title={"Free"}
                                        titleTypographyProps={{ align: 'center' }}
                                        subheaderTypographyProps={{ align: 'center' }}
                                        className={selectedPricingPlan === 0 ? classes.selectedPricingCardHeader : classes.cardHeader}
                                    />
                                    <CardContent>
                                        <div className={classes.cardPricing}>
                                            <Typography component="h2" variant="h3" color={selectedPricingPlan === 0 ? "" : "textPrimary"}>
                                                $0
                                            </Typography>
                                            <Typography variant="h6" color={selectedPricingPlan === 0 ? "" : "textSecondary"}>
                                                /mo
                                            </Typography>
                                        </div>
                                        <ul className={classes.pricingCardUl}>
                                            <Typography component="li" variant="subtitle1" align="center">
                                                Up to 10 employees
                                            </Typography>
                                            <Typography component="li" variant="subtitle1" align="center">
                                                All features
                                            </Typography>
                                            <Typography component="li" variant="subtitle1" align="center">
                                                Email support
                                            </Typography>
                                        </ul>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => setSelectedPricingPlan(0)} fullWidth className={classes.pricingButtons}>
                                            {selectedPricingPlan === 0 ? <CheckIcon/> : "SELECT"}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Card className={selectedPricingPlan === 1 ? classes.selectedPricingCard : null}>
                                    <CardHeader
                                        title={"Standard"}
                                        titleTypographyProps={{ align: 'center' }}
                                        subheaderTypographyProps={{ align: 'center' }}
                                        className={selectedPricingPlan === 1 ? classes.selectedPricingCardHeader : classes.cardHeader}
                                    />
                                    <CardContent>
                                        <div className={classes.cardPricing}>
                                            <Typography component="h2" variant="h3" color={selectedPricingPlan === 1 ? "" : "textPrimary"}>
                                                $5
                                            </Typography>
                                            <Typography variant="h6" color={selectedPricingPlan === 1 ? "" : "textSecondary"}>
                                                /mo
                                            </Typography>
                                        </div>
                                        <ul className={classes.pricingCardUl}>
                                            <Typography component="li" variant="subtitle1" align="center">
                                                Up to 30 employees
                                            </Typography>
                                            <Typography component="li" variant="subtitle1" align="center">
                                                All features
                                            </Typography>
                                            <Typography component="li" variant="subtitle1" align="center">
                                                Priority email support
                                            </Typography>
                                        </ul>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => setSelectedPricingPlan(1)} fullWidth className={classes.pricingButtons}>
                                            {selectedPricingPlan === 1 ? <CheckIcon/> : "SELECT"}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Card className={selectedPricingPlan === 2 ? classes.selectedPricingCard : null}>
                                    <CardHeader
                                        title={"Pro"}
                                        titleTypographyProps={{ align: 'center' }}
                                        subheaderTypographyProps={{ align: 'center' }}
                                        className={selectedPricingPlan === 2 ? classes.selectedPricingCardHeader : classes.cardHeader}
                                    />
                                    <CardContent>
                                        <div className={classes.cardPricing}>
                                            <Typography component="h2" variant="h3" color={selectedPricingPlan === 2 ? "" : "textPrimary"}>
                                                $8
                                            </Typography>
                                            <Typography variant="h6" color={selectedPricingPlan === 2 ? "" : "textSecondary"}>
                                                /mo
                                            </Typography>
                                        </div>
                                        <ul className={classes.pricingCardUl}>
                                            <Typography component="li" variant="subtitle1" align="center">
                                                Unlimited employees
                                            </Typography>
                                            <Typography component="li" variant="subtitle1" align="center">
                                                All features
                                            </Typography>
                                            <Typography component="li" variant="subtitle1" align="center">
                                                Priority email support
                                            </Typography>
                                        </ul>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => setSelectedPricingPlan(2)} fullWidth className={classes.pricingButtons}>
                                            {selectedPricingPlan === 2 ? <CheckIcon/> : "SELECT"}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                        <Typography variant={"caption"} style={{marginTop: "10px", color: "grey"}}>Payment methods:</Typography>
                        <Grid container justify={"center"} className={classes.pricingOptionsWrapper} spacing={1}>
                            <Grid item>
                                <img src={Amex} alt={"amex"}/>
                            </Grid>
                            <Grid item>
                                <img src={Visa} alt={"visa"}/>
                            </Grid>
                            <Grid item>
                                <img src={Master} alt={"master"}/>
                            </Grid>
                            <Grid item>
                                <img src={Diners} alt={"discover"}/>
                            </Grid>
                            <Grid item>
                                <img src={Discover} alt={"discover"}/>
                            </Grid>
                            <Grid item>
                                <img src={Jcb} alt={"discover"}/>
                            </Grid>
                        </Grid>
                    </div>
                );
            case 3:
                return (
                    <div style={{textAlign: "center", padding: "24px", display: "flex",alignItems: "center", flexDirection: "column", width: "80%"}}>
                        <PaymentForm createVtc={createVtc} userToken={authToken} selectedPlan={selectedPricingPlan}/>
                    </div>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <Navigation userLoggedIn={true}/>
                <Container style={{padding: "110px 0px 15px 0px", display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div style={{width: "40%"}}>
                        {stepErrors.map(error => (
                            <Alert style={{width: "100%", marginTop: "7px"}} severity={"error"}>{error}</Alert>
                        ))}
                    </div>
                    {_getStepContent(activeStep)}
                    <div className={classes.navButtonsStepper}>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            style={{backgroundColor: "#27ae60", color: "white"}}
                            onClick={handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </Container>
            </div>
        </MuiThemeProvider>
    )
}