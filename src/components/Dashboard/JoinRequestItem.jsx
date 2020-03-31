import React, { useState } from 'react';
import {Grid, Typography, TableRow, TableCell, Button, Tooltip, CircularProgress} from "@material-ui/core";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from '@material-ui/icons/Check';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import InfoIcon from '@material-ui/icons/Info';
import {makeStyles} from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import {ROOT_API} from "../../api_endpoint";
import {useAuth} from "../../store";
import DateRangeIcon from '@material-ui/icons/DateRange';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EmailIcon from '@material-ui/icons/Email';
import LinkIcon from '@material-ui/icons/Link';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: "5px",
        minWidth: "50%"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function JoinRequestItem(props) {

    const classes = useStyles();
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const {authToken, setAuthToken} = useAuth();
    const [userProfile, setUserProfile] = useState({});
    const [isModalDoneLoading, setIsModalDoneLoading] = useState(false);

    const _openUserProfileModal = () => {
        setIsUserModalOpen(true);
        axios.get(`${ROOT_API}/v1/users/${props.req.user.id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            console.log(res.data);
            setUserProfile(res.data.user);
            setIsModalDoneLoading(true);
        }).catch(err => {
            console.log(err);
        })
    };

    const _handleJoinRequest = (code) => {
        axios.post(`${ROOT_API}/v1/join_request/handle`, {
            "join_request": {
                "id": props.req.id
            },
            "handle_code": code,
            "rejection_message": ""
        }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            props.refreshData();
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <TableRow>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isUserModalOpen}>
                    {isModalDoneLoading ?
                        <div className={classes.modalPaper}>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <Typography gutterBottom variant={"h6"}>More about {userProfile.username}</Typography>
                                <CloseIcon style={{cursor: "pointer"}} onClick={() => setIsUserModalOpen(false)}/>
                            </div>
                            <Typography style={{color: "grey", display: "flex"}} gutterBottom><EmailIcon style={{marginRight: "7px"}}/> MOTIVATION LETTER</Typography>
                            <Typography style={{marginBottom: "10px"}}>{props.req.motivation_text}</Typography>

                            <Typography style={{color: "grey", display: "flex"}} gutterBottom><MarkunreadMailboxIcon style={{marginRight: "7px"}}/> DELIVERIES COMPLETED</Typography>
                            <Typography style={{marginBottom: "10px"}}>{userProfile.jobs_completed} deliveries</Typography>

                            <Typography style={{color: "grey", display: "flex"}} gutterBottom><AccountBalanceIcon style={{marginRight: "7px"}}/> MONEY EARNED</Typography>
                            <Typography style={{marginBottom: "10px"}}>${userProfile.money_earned} earned</Typography>

                            <Typography style={{color: "grey", display: "flex"}} gutterBottom><LinkIcon style={{marginRight: "7px"}}/> TruckersMP PROFILE</Typography>
                            <Typography style={{marginBottom: "10px"}}><a href={userProfile.tmp_profile_link}>{userProfile.tmp_profile_link}</a></Typography>

                            <Typography style={{color: "grey", display: "flex"}} gutterBottom><LinkIcon style={{marginRight: "7px"}}/> Steam PROFILE</Typography>
                            <Typography style={{marginBottom: "10px"}}><a href={userProfile.steam_profile_link}>{userProfile.steam_profile_link}</a></Typography>

                            <Typography style={{color: "grey", display: "flex"}} gutterBottom><DateRangeIcon style={{marginRight: "7px"}}/> ACCOUNT REGISTRATION DATE</Typography>
                            <Typography style={{marginBottom: "10px"}}>{moment(userProfile.created_at).format("MMMM Do YYYY")} ({moment(userProfile.created_at).fromNow()})</Typography>
                        </div>
                    :
                        <div>
                            <CircularProgress />
                        </div>
                    }
                </Fade>
            </Modal>
            <TableCell component={"th"} scope={"row"}>
                {props.req.user.username}
                <Tooltip title={"More Info"}>
                    <Button onClick={() => _openUserProfileModal()} style={{backgroundColor: "#f1c40f", marginLeft: "10px"}} variant={"contained"}><InfoIcon style={{color: "white"}}/></Button>
                </Tooltip>
            </TableCell>
            <TableCell>{props.req.user.age}</TableCell>
            <TableCell>{moment(props.req.requested_at).format("MMMM Do YYYY HH:MM")}({moment(props.req.requested_at).fromNow()})</TableCell>
            <TableCell>
                <Tooltip title={"Accept"}>
                    <Button onClick={() => _handleJoinRequest(1)} style={{backgroundColor: "#27ae60"}} variant={"contained"}><CheckIcon style={{color: "white"}}/></Button>
                </Tooltip>
                <Tooltip title={"Reject"}>
                    <Button onClick={() => _handleJoinRequest(2)} style={{backgroundColor: "#e74c3c", marginLeft: "10px"}} variant={"contained"}><NotInterestedIcon style={{color: "white"}}/></Button>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
};