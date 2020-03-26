import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Grid, Typography, Button, TextField} from "@material-ui/core";
import moment from "moment";
import {Alert} from "@material-ui/lab";
import { SocialIcon } from 'react-social-icons';
import DiscordLogo from '../../img/discordlogo.svg';
import axios from 'axios';
import {ROOT_API} from "../../api_endpoint";
import {useAuth} from "../../store";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    generalInfo: {
        marginTop: "15px",
    },
    generalInfoItem: {
        color: "#7f8c8d",
        marginTop: "5px",
    }
}));

export default function AdminSettings(props) {

    const [editingSocialLinks, setEditingSocialLinks] = useState(false);
    const [twitterLinkInput, setTwitterLinkInput] = useState(props.vtc.twitter_link);
    const [instagramLinkInput, setInstagramLinkInput] = useState(props.vtc.instagram_link);
    const [facebookLinkInput, setFacebookLinkInput] = useState(props.vtc.facebook_link);
    const [twitchLinkInput, setTwitchLinkInput] = useState(props.vtc.twitch_link);
    const [youtubeLinkInput, setYoutubeLinkInput] = useState(props.vtc.youtube_link);
    const [discordLinkInput, setDiscordLinkInput] = useState(props.vtc.discord_link);

    const [socialLinksUpdateErrorMessage, setSocialLinksUpdateErrorMessage] = useState("");

    const classes = useStyles();
    const {authToken, setAuthToken} = useAuth();

    const _translatePricingPlan = (key) => {
        switch (key) {
            case 0:
                return "FREE";
            case 1:
                return "STANDARD";
            case 2:
                return "PRO";
            default:
                return "Not Found, please contact support!"
        }
    };

    const _translatePricingPlanPrice = (key) => {
        switch (key) {
            case 0:
                return "$0/month";
            case 1:
                return "$5/month";
            case 2:
                return "$8/month";
            default:
                return "Not found, please contact support!"
        }
    };

    const _socialLinkRender = link => {
        if(link === "") {
            return "Not set";
        } else {
            return <a target={"_blank"} href={link}>{link}</a>;
        }
    };

    const _updateSocialLinks = () => {
        axios.post(`${ROOT_API}/v1/vtcs/${props.vtc.id}/update_socials`, {
            "vtc": {
                "twitter_link": twitterLinkInput,
                "twitch_link": twitchLinkInput,
                "youtube_link": youtubeLinkInput,
                "facebook_link": facebookLinkInput,
                "discord_link": discordLinkInput,
                "instagram_link": instagramLinkInput
            }
        }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            props.getNewUserData();
            setEditingSocialLinks(false);
        }).catch(err => {
            console.log(err);
            setSocialLinksUpdateErrorMessage("Something went wrong. Please try again later.");
            setEditingSocialLinks(false);
        })
    };

    const _renderSocialLinksSettings = () => {
        if(editingSocialLinks) {
            return (
                <div className={classes.generalInfo}>
                    <Typography variant={"body1"} style={{fontWeight: "bold", color: "black"}}>Social Links</Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <SocialIcon style={{width: 25, height: 25, marginRight: "5px"}} network={"twitter"}/>
                        <b style={{marginRight: "10px"}}>Twitter Link</b>
                        <TextField variant={"outlined"} label={"Twitter Link"} value={twitterLinkInput} onChange={(e) => setTwitterLinkInput(e.target.value)}/>
                    </Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <SocialIcon style={{width: 25, height: 25, marginRight: "5px"}} network={"instagram"}/>
                        <b style={{marginRight: "10px"}}>Instagram Link</b>
                        <TextField variant={"outlined"} label={"Instagram Link"} value={instagramLinkInput} onChange={(e) => setInstagramLinkInput(e.target.value)}/>
                    </Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <SocialIcon style={{width: 25, height: 25, marginRight: "5px"}} network={"twitch"}/>
                        <b style={{marginRight: "10px"}}>Twitch Link</b>
                        <TextField variant={"outlined"} label={"Twitch Link"} value={twitchLinkInput} onChange={(e) => setTwitchLinkInput(e.target.value)}/>
                    </Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <img src={DiscordLogo} alt={"discord"} width={"25px"} height={"25px"}/>
                        <b style={{marginRight: "10px"}}>Discord Link</b>
                        <TextField variant={"outlined"} label={"Discord Link"} value={discordLinkInput} onChange={(e) => setDiscordLinkInput(e.target.value)}/>
                    </Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <SocialIcon style={{width: 25, height: 25, marginRight: "5px"}} network={"facebook"}/>
                        <b style={{marginRight: "10px"}}>Facebook Link</b>
                        <TextField variant={"outlined"} label={"Facebook Link"} value={facebookLinkInput} onChange={(e) => setFacebookLinkInput(e.target.value)}/>
                    </Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <SocialIcon style={{width: 25, height: 25, marginRight: "5px"}} network={"youtube"}/>
                        <b style={{marginRight: "10px"}}>YouTube Link</b>
                        <TextField variant={"outlined"} label={"YouTube Link"} value={youtubeLinkInput} onChange={(e) => setYoutubeLinkInput(e.target.value)}/>
                    </Typography>
                    <Button onClick={_updateSocialLinks} variant={"contained"} style={{backgroundColor: props.vtc.main_color, color: "white", marginTop: "10px"}}>SAVE</Button>
                </div>
            )
        } else {
            return (
                <div className={classes.generalInfo}>
                    <Typography variant={"body1"} style={{fontWeight: "bold", color: "black"}}>Social Links</Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem}>
                        <SocialIcon style={{width: 25, height: 25, marginRight: "5px"}} network={"twitter"}/>
                        <b style={{marginRight: "10px"}}>Twitter Link</b><span>{_socialLinkRender(props.vtc.twitter_link)}</span>
                    </Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem}>
                        <SocialIcon style={{width: 25, height: 25, marginRight: "5px"}} network={"instagram"}/>
                        <b style={{marginRight: "10px"}}>Instagram Link</b><span>{_socialLinkRender(props.vtc.instagram_link)}</span>
                    </Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem}>
                        <SocialIcon style={{width: 25, height: 25, marginRight: "5px"}} network={"twitch"}/>
                        <b style={{marginRight: "10px"}}>Twitch Link</b><span>{_socialLinkRender(props.vtc.twitch_link)}</span>
                    </Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <img src={DiscordLogo} alt={"discord"} width={"25px"} height={"25px"}/>
                        <b style={{marginRight: "10px"}}>Discord Link</b><span>{_socialLinkRender(props.vtc.discord_link)}</span>
                    </Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem}>
                        <SocialIcon style={{width: 25, height: 25, marginRight: "5px"}} network={"facebook"}/>
                        <b style={{marginRight: "10px"}}>Facebook Link</b><span>{_socialLinkRender(props.vtc.facebook_link)}</span>
                    </Typography>
                    <Typography variant={"body1"} className={classes.generalInfoItem}>
                        <SocialIcon style={{width: 25, height: 25, marginRight: "5px"}} network={"youtube"}/>
                        <b style={{marginRight: "10px"}}>YouTube Link</b><span>{_socialLinkRender(props.vtc.youtube_link)}</span>
                    </Typography>
                    <Typography style={{color: "#e74c3c"}}>{socialLinksUpdateErrorMessage}</Typography>
                    <Button variant={"contained"} style={{backgroundColor: props.vtc.main_color, color: "white", marginTop: "10px"}} onClick={() => setEditingSocialLinks(true)}>EDIT</Button>
                </div>
            )
        }
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12} lg={12} sm={12}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h6"}>VTC Settings</Typography>
                        <Typography style={{color: "grey"}}>Set up your VTC the way you want to.</Typography>
                        <div className={classes.generalInfo}>
                            <Typography variant={"body1"} style={{fontWeight: "bold", color: "black"}}>General Info</Typography>
                            <Typography variant={"body1"} className={classes.generalInfoItem}><b style={{marginRight: "10px"}}>Name</b> <span style={{color: "black"}}>{props.vtc.name}</span></Typography>
                            <Typography variant={"body1"} className={classes.generalInfoItem}><b style={{marginRight: "10px"}}>Description</b> <span style={{color: "black"}}>{props.vtc.description}</span></Typography>
                            <Typography variant={"body1"} className={classes.generalInfoItem}><b style={{marginRight: "10px"}}>
                                Minimum Age To Join</b> <span style={{color: "black"}}>{props.vtc.minimum_age_to_join}</span>
                            </Typography>
                            <Typography variant={"body1"} className={classes.generalInfoItem}><b style={{marginRight: "10px"}}>
                                Created At</b> <span style={{color: "black"}}>{moment(props.vtc.created_at).format("MMMM Do YYYY")}({moment(props.vtc.created_at).fromNow()})</span>
                            </Typography>
                            <Typography variant={"body1"} className={classes.generalInfoItem}>
                                <b style={{marginRight: "10px"}}>Pricing Plan</b> <span style={{color: "black"}}>{_translatePricingPlan(props.vtc.pricing_plan)}</span>
                            </Typography>
                            <Typography variant={"body1"} className={classes.generalInfoItem}>
                                <b style={{marginRight: "10px"}}>Member Count</b>
                                <span style={{color: "black"}}>
                                    {props.vtc.member_count}/{props.vtc.maximum_amount_of_users}{(props.vtc.maximum_amount_of_users === 20000) ? " (Contact support if you need more than 20 000 slots, it will be added for free!)" : null}
                                </span>
                            </Typography>
                            <Typography variant={"body1"} className={classes.generalInfoItem}>
                                <b style={{marginRight: "10px"}}>Main Color</b> <span style={{color: props.vtc.main_color}}>{props.vtc.main_color}</span>
                            </Typography>
                            <Button variant={"contained"} style={{backgroundColor: props.vtc.main_color, color: "white", marginTop: "10px"}}>EDIT</Button>
                        </div>

                        {_renderSocialLinksSettings()}

                        <div className={classes.generalInfo}>
                            <Typography variant={"body1"} style={{fontWeight: "bold", color: "black"}}>Payment Info</Typography>
                            <Typography variant={"body1"} className={classes.generalInfoItem}>
                                <b style={{marginRight: "10px"}}>Pricing Plan</b> <span style={{color: "black"}}>{_translatePricingPlan(props.vtc.pricing_plan)}</span>
                            </Typography>
                            <Typography variant={"body1"} className={classes.generalInfoItem}>
                                <b style={{marginRight: "10px"}}>Cost</b> <span style={{color: "black"}}>{_translatePricingPlanPrice(props.vtc.pricing_plan)}</span>
                            </Typography>
                            <Typography variant={"subtitle1"} style={{color: "grey"}}>NOTE: In order to see invoices and billing information, please visit your profile.</Typography>
                            <Button variant={"contained"} style={{backgroundColor: props.vtc.main_color, color: "white", marginTop: "10px"}}>CHANGE PRICING PLAN</Button>
                        </div>

                        <div className={classes.generalInfo}>
                            <Typography variant={"body1"} style={{fontWeight: "bold", color: "black"}}>Danger Zone</Typography>
                            <Typography variant={"body1"} className={classes.generalInfoItem}>
                                <b style={{marginRight: "10px"}}>Delete your VTC</b>
                            </Typography>
                            <Alert style={{marginTop: "10px"}} severity={"error"}>This action is permanent!</Alert>
                            <Button variant={"contained"} style={{backgroundColor: "#e74c3c", color: "white", marginTop: "10px"}}>DELETE VTC</Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}