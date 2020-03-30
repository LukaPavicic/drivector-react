import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Container, Paper, Typography, Grid, Card, Button, TextField} from "@material-ui/core";
import axios from 'axios';
import {ROOT_API} from "../api_endpoint";
import Navigation from "../components/Navigation";
import { SocialIcon } from 'react-social-icons';
import PeopleIcon from '@material-ui/icons/People';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {useAuth} from "../store";
import {Alert} from "@material-ui/lab";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
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
}));

export default function VtcScreen(props) {

    const classes = useStyles();
    const {authToken, setAuthToken} = useAuth();

    const [currentVtc, setCurrentVtc] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasSentRequestToJoin, setHasSentRequestToJoin] = useState(false);
    const [showJoinErrorAlert, setJoinErrorAlert] = useState(false);
    const [sendRequestModalOpen, setSendRequestModalOpen] = useState(false);
    const [motivationText, setMotivationText] = useState("");
    const [hasRequestSucceeded, setHasRequestSucceeded] = useState(false);

    const _getCurrentVtc = () => {
        axios.get(`${ROOT_API}/v1/vtcs/${props.match.params.vtc_id}`).then(res => {
            setCurrentVtc(res.data.vtc);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        })
    };

    const _showJoinAlert = (type) => {
        // type 0 -> request failed
        // type 1 -> request succeeded
        switch (type) {
            case 0:
                setHasSentRequestToJoin(true);
                setTimeout(() => setHasSentRequestToJoin(false), 10000);
                break;
            case 1:
                setHasRequestSucceeded(true);
                setTimeout(() => setHasRequestSucceeded(false), 10000);
                break;
        }
    }

    const _requestToJoin = () => {
      axios.post(`${ROOT_API}/v1/join_request/new`, {
          "join_request": {
              "vtc_id": currentVtc.id,
              "motivation_text": motivationText
          }
      }, {
          headers: {
              'Authorization': `Bearer ${authToken}`
          }
      }).then(res => {
          setSendRequestModalOpen(false);
          _showJoinAlert(1);
          setMotivationText("");
      }).catch(err => {
          setMotivationText("");
          setSendRequestModalOpen(false);
          if(err.response.data.includes("User has already been taken")) {
              _showJoinAlert(0);
          }
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
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={sendRequestModalOpen}
                            onClose={() => setSendRequestModalOpen(false)}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={sendRequestModalOpen}>
                                <div className={classes.modalPaper}>
                                    <Typography gutterBottom variant={"h6"}>Why should this VTC accept you?</Typography>
                                    <Typography gutterBottom variant={"body1"} style={{color: "grey"}}>
                                        This is a letter that will be seen by a VTC admin you are currently applying to. Write something nice about yourself.
                                    </Typography>
                                    <TextField
                                        rows={5}
                                        multiline
                                        variant={"outlined"}
                                        style={{width: "100%"}}
                                        value={motivationText}
                                        onChange={(e) => setMotivationText(e.target.value)}
                                        placeholder={"Write something about you..."}
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
                                    <Button onClick={() => _requestToJoin()} variant={"contained"} style={{backgroundColor: currentVtc.main_color, color: "white", alignSelf: "center", marginTop: "10px"}}>REQUEST TO JOIN</Button>
                                </div>
                            </Fade>
                        </Modal>
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
                                    <Button onClick={() => setSendRequestModalOpen(true)} variant={"contained"} style={{backgroundColor: currentVtc.main_color, color: "white", alignSelf: "center"}}>REQUEST TO JOIN</Button>
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
                    {hasSentRequestToJoin ? <Alert onClose={() => setHasSentRequestToJoin(false)} severity={"error"} style={{position: "absolute", bottom: 5, left: 5}}>
                        You already sent a request to join this VTC. Please wait for the response.
                    </Alert> : null}
                    {hasRequestSucceeded ? <Alert onClose={() => setHasRequestSucceeded(false)} severity={"success"} style={{position: "absolute", bottom: 5, left: 5}}>
                        Request to join sent successfully. You will hear back from the VTC admin as soon as possible. Sit tight.
                    </Alert> : null}
                </div>
            }
        </div>
    )
};