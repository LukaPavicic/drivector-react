import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Grid, Typography, Button} from "@material-ui/core";
import moment from "moment";
import {Alert} from "@material-ui/lab";

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

    const classes = useStyles();

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
                                <b style={{marginRight: "10px"}}>Member Count</b> <span style={{color: "black"}}>{props.vtc.member_count}/{props.vtc.maximum_amount_of_users}</span>
                            </Typography>
                            <Typography variant={"body1"} className={classes.generalInfoItem}>
                                <b style={{marginRight: "10px"}}>Main Color</b> <span style={{color: props.vtc.main_color}}>{props.vtc.main_color}</span>
                            </Typography>
                            <Button variant={"contained"} style={{backgroundColor: props.vtc.main_color, color: "white", marginTop: "10px"}}>EDIT</Button>
                        </div>

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