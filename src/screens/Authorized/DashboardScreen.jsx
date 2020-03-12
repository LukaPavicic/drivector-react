import React, {useEffect, useState} from 'react';
import Navigation from "../../components/Navigation";
import {Container, Grid, Button, Typography, Paper, CircularProgress, Card, CardContent, Icon} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { useAuth } from "../../store";
import { ROOT_API } from "../../api_endpoint";
import Copyright from "../../components/Copyright";
import { useHistory } from 'react-router-dom';
import {AttachMoney, MoneyOff, Tune} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    topSectionLeft: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
        padding: "20px",
        backgroundColor: "#fafafa",
        textAlign: "center",
    },
    featureIcon: {
        fontSize: "4rem",
        color: "#27ae60",
    },
    vtcInfoCard: {
        marginTop: "20px",
    }
}));

export default function DashboardScreen(props) {

    const { authToken, setAuthToken } = useAuth();
    const classes = useStyles();
    const history = useHistory();

    const _getLoggedInUserData = () => {
        console.log(authToken);
        axios.get(`${ROOT_API}/v1/users/current_user`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            setCurrentUser(res.data.user);
            setIsLoading(false);
        }).catch(err => {
            setAuthToken();
            history.push('/');
        })
    };

    const _onClickCreateNewVtc = () => {
      history.push("/vtc/new");
    };

    useEffect(() => {
        console.log(authToken);
        _getLoggedInUserData();
    }, []);

    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    if(isLoading) {
        return (
            <div style={{width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <CircularProgress />
            </div>
        )
    } else {
        return (
            <div>
                <Navigation userLoggedIn={true} />
                <Container>
                    {(currentUser.user_joined_vtc === null) ?
                        <Grid container spacing={5} direction={"row"} style={{paddingTop: "105px", paddingBottom: "20px"}}>
                            <Grid className={classes.topGrid} item xs={12} sm={6}>
                                <Paper elevation={3} className={classes.topSectionLeft}>
                                        <Typography variant={"h4"}>You are currently not in a VTC</Typography>
                                        <Button variant={"contained"} style={{backgroundColor: "#27ae60", color: "white", marginTop: "20px"}}>SEARCH FOR VTCs</Button>
                                        <Typography style={{marginTop: "10px"}}>Featured VTCs:</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper elevation={3} className={classes.topSectionLeft}>
                                    <Typography variant={"h4"}>Want to run your own VTC?</Typography>
                                    <Button onClick={_onClickCreateNewVtc} to={"/vtc/new"} variant={"contained"} style={{backgroundColor: "#27ae60", color: "white", marginTop: "20px"}}>CREATE VTC NOW</Button>
                                    <Typography style={{marginTop: "10px"}}>Here is some more info:</Typography>
                                    <Grid container>
                                        <Grid className={classes.vtcInfoCard} item sm={12} xs={12}>
                                            <Card elevation={3} height={200}>
                                                <CardContent align="center">
                                                    <Typography align="center" variant="h6">Free For Your Employees</Typography>
                                                    <Icon className={classes.featureIcon} fontSize="inherit" component={MoneyOff} />
                                                    <Typography>All of your employees don't have to pay a dime for anything!</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid className={classes.vtcInfoCard} item sm={12} xs={12}>
                                            <Card elevation={3}>
                                                <CardContent align="center">
                                                    <Typography align="center" variant="h6">Highly Customizable</Typography>
                                                    <Icon className={classes.featureIcon} fontSize="inherit" component={Tune} />
                                                    <Typography>Customize your VTCs capacity, color, image, permissions, requirements and many more!</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid className={classes.vtcInfoCard} item sm={12} xs={12}>
                                            <Card elevation={3}>
                                                <CardContent align="center">
                                                    <Typography align="center" variant="h6">Low Price To Start</Typography>
                                                    <Icon className={classes.featureIcon} fontSize="inherit" component={AttachMoney} />
                                                    <Typography>Running a VTC under 10 employees is FREE! Onwards starts from $5/month.</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                        :
                        <span>in vtc</span>
                    }
                </Container>
                <Copyright/>
            </div>
        )
    }
}