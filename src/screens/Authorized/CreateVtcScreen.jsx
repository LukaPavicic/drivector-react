import React, { useState } from 'react';
import { useAuth } from "../../store";
import Navigation from "../../components/Navigation";
import {Container} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Icon from "@material-ui/core/Icon";
import Add from '@material-ui/icons/Add'

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
    }
}));

const _getSteps = () => {
    return ['VTC Info', 'VTC Settings', 'Choose Payment Plan'];
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
    const [activeStep, setActiveStep] = useState(0);
    const steps = _getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const _getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div style={{textAlign: "center", padding: "24px", display: "flex",alignItems: "center", flexDirection: "column"}}>
                        <Typography style={{marginBottom: "7px"}} variant={"h3"}>VTC Info</Typography>
                        <Typography variant={"h5"}>This data will be shown to all users who see you VTC page.</Typography>
                        <Typography variant={"h6"} style={{marginTop: "15px"}}>Add an image to your VTC</Typography>
                        <div className={classes.addVtcImage}>
                            <Icon component={Add} style={{color: "white", fontSize: "65px"}}/>
                        </div>
                    </div>
                );
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown step';
        }
    };

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <Navigation userLoggedIn={true}/>
                <Container style={{padding: "110px 0px 15px 0px"}}>
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
                    {_getStepContent(activeStep)}
                </Container>
            </div>
        </MuiThemeProvider>
    )
}