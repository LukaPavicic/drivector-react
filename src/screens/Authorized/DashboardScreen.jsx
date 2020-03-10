import React, {useEffect, useState} from 'react';
import Navigation from "../../components/Navigation";
import { Container, Grid, Button, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { useAuth } from "../../store";
import { ROOT_API } from "../../api_endpoint";
import Copyright from "../../components/Copyright";

const useStyles = makeStyles(theme => ({
    topSectionLeft: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#fafafa"
    }
}));

export default function DashboardScreen(props) {

    const { authToken, setAuthToken } = useAuth();
    const classes = useStyles();

    const _getLoggedInUserData = () => {
        axios.get(`${ROOT_API}/v1/users/current_user`, {
            headers: {
                'Authorization': `Bearer ${authToken.slice(1, -1)}`
            }
        }).then(res => {
            setCurrentUser(res.data.user);
            setIsLoading(false);
        })
    };

    useEffect(() => {
        console.log(authToken);
        _getLoggedInUserData();
    }, []);

    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    if(isLoading) {
        return (
            <div>
                <Button onClick={() => {setAuthToken()}}>logout</Button>
                <span>loading...</span>
            </div>
        )
    } else {
        return (
            <div>
                <Navigation userLoggedIn={true} />
                <Container>
                    {(currentUser.user_joined_vtc === null) ?
                        <Grid container spacing={5} direction={"row"} alignItems={"center"} justify={"center"} style={{minHeight: "50vh"}}>
                        <Grid className={classes.topGrid} item xs={12} sm={6}>
                            <Paper elevation={3} className={classes.topSectionLeft}>
                                    <Typography variant={"h4"}>You are currently not in a VTC</Typography>
                                    <Button variant={"contained"} style={{backgroundColor: "#27ae60", color: "white", marginTop: "20px"}}>SEARCH FOR VTCs</Button>
                                    <Typography style={{marginTop: "10px"}}>Here are some popular ones:</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} className={classes.topSectionLeft}>
                                <Typography variant={"h4"}>Want to run your own VTC?</Typography>
                                <Button variant={"contained"} style={{backgroundColor: "#27ae60", color: "white", marginTop: "20px"}}>CREATE VTC NOW</Button>
                                <Typography style={{marginTop: "10px"}}>Here are some things you will be able to do:</Typography>
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