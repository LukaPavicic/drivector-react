import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Container, Paper, Typography, Grid, Card, Button} from "@material-ui/core";
import axios from 'axios';
import {ROOT_API} from "../api_endpoint";
import Navigation from "../components/Navigation";
import { SocialIcon } from 'react-social-icons';
import PeopleIcon from '@material-ui/icons/People';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const useStyles = makeStyles(theme => ({
    vtcCard: {
        width: "100%",
        height: "auto",
        padding: "20px",
        marginBottom: "10px",
    },
    vtcImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "grey",
    },
    generalInfoItem: {
        color: "#000000",
        marginTop: "5px",
    }
}));

export default function VtcScreen(props) {

    const classes = useStyles();

    const [currentVtc, setCurrentVtc] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const _getCurrentVtc = () => {
        axios.get(`${ROOT_API}/v1/vtcs/${props.match.params.vtc_id}`).then(res => {
            setCurrentVtc(res.data.vtc);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        })
    };

    useEffect(() => {
        _getCurrentVtc();
    }, []);

    return (
        <div>
            {isLoading ?
                <Navigation/>
                :
                <div>
                    <Navigation vtcColor={currentVtc.main_color}/>
                    <Container style={{marginTop: "90px"}}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Card className={classes.vtcCard}>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <div style={{width: "35%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <div className={classes.vtcImage}>
                                            </div>
                                        </div>
                                        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", width: "65%"}}>
                                            <Typography variant={"h6"}>{currentVtc.name}</Typography>
                                            <Typography style={{wordWrap: "break-word"}}>{currentVtc.description}</Typography>
                                        </div>
                                    </div>
                                </Card>
                                <Card className={classes.vtcCard}>
                                    <Typography gutterBottom style={{color: "grey"}}>General Info</Typography>
                                    <Typography variant={"body1"} className={classes.generalInfoItem} style={{display: "flex"}}>
                                        <PeopleIcon/><b style={{marginRight: "10px", marginLeft: "5px"}}>Employees</b> <span style={{color: "#7f8c8d"}}>{currentVtc.member_count}/{currentVtc.maximum_amount_of_users}</span>
                                    </Typography>
                                    <Typography variant={"body1"} className={classes.generalInfoItem} style={{display: "flex"}}>
                                        <DateRangeIcon/><b style={{marginRight: "10px", marginLeft: "5px"}}>Minimum Age To Join</b> <span style={{color: "#7f8c8d"}}>{currentVtc.minimum_age_to_join}</span>
                                    </Typography>
                                    <Typography variant={"body1"} className={classes.generalInfoItem} style={{display: "flex"}}>
                                        <MarkunreadMailboxIcon/><b style={{marginRight: "10px", marginLeft: "5px"}}>Deliveries Completed </b> <span style={{color: "#7f8c8d"}}>{currentVtc.deliveries_completed}</span>
                                    </Typography>
                                    <Typography variant={"body1"} className={classes.generalInfoItem} style={{display: "flex"}}>
                                        <AccountBalanceIcon/><b style={{marginRight: "10px", marginLeft: "5px"}}>Money Earned </b> <span style={{color: "#7f8c8d"}}>${currentVtc.money_made}</span>
                                    </Typography>
                                </Card>
                                <Card className={classes.vtcCard} style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                    <Button variant={"contained"} style={{backgroundColor: currentVtc.main_color, color: "white", alignSelf: "center"}}>REQUEST TO JOIN</Button>
                                </Card>
                                <Card className={classes.vtcCard}>
                                    <Typography gutterBottom style={{color: "grey"}}>Social Media Links</Typography>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>
                                        <SocialIcon style={{width: 40, height: 40, marginRight: "5px"}} network={"twitch"}/>
                                        <SocialIcon style={{width: 40, height: 40, marginRight: "5px"}} network={"facebook"}/>
                                        <SocialIcon style={{width: 40, height: 40, marginRight: "5px"}} network={"twitter"}/>
                                        <SocialIcon style={{width: 40, height: 40, marginRight: "5px"}} network={"instagram"}/>
                                        <SocialIcon style={{width: 40, height: 40, marginRight: "5px"}} network={"youtube"}/>
                                    </div>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} lg={8}>

                            </Grid>
                        </Grid>
                    </Container>
                </div>
            }
        </div>
    )
};