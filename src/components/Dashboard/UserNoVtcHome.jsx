import React from 'react';
import { Grid, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Icon, CardContent } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { Link } from 'react-router-dom'
import moment from 'moment'
import { ArrowDownward, MoneyOff, AttachMoney, Tune, Star } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    table: {
        minWidth: "100%",        
    },
    welcomeFeaturesContainer: {
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",    
        marginTop: "7px",    
        marginBottom: "7px",    
    },
    featureIcon: {
        fontSize: "4rem",
        color: "#27ae60",
    },
}));

export default function UserNoVtcHome(props) {

    const classes = useStyles();   
    
    const _statusTranslator = (code) => {
        switch(code) {
            case 0:
                return "Pending"
            case 1:
                return "Accepted"
            case 2:
                return "Rejected"
            default:
                return "Unknown"
        }
    }

    const _classNameTranslator = (code) => {
        switch(code) {
            case 0:
                return {backgroundColor: "rgb(255, 244, 229)", color: "rgb(102, 60, 0)"}
            case 1:
                return {backgroundColor: "rgb(237, 247, 237)", color: "rgb(30, 70, 32)"}
            case 2:
                return {backgroundColor: "rgb(253, 236, 234)", color: "rgb(97, 26, 21)"}
        }
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={classes.paper} elevation={3}>
                        <Typography variant="h6">Create your own VTC</Typography>                        
                        <Grid container spacing={5} className={classes.welcomeFeaturesContainer}>
                            <Grid item sm={4} xs={12}>
                                <Card elevation={3} height={200}>
                                    <CardContent align="center">
                                        <Typography align="center" variant="h6">Free For Users</Typography>
                                        <Icon className={classes.featureIcon} fontSize="inherit" component={MoneyOff} />
                                        <Typography>All users who are not running a VTC get all functionality for free!</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <Card elevation={3}>
                                    <CardContent align="center">
                                        <Typography align="center" variant="h6">Highly Customizable</Typography>
                                        <Icon className={classes.featureIcon} fontSize="inherit" component={Tune} />
                                        <Typography>Customize your VTCs capacity, color, image, permissions, requirements and many more!</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <Card elevation={3}>
                                    <CardContent align="center">
                                        <Typography align="center" variant="h6">Low Price For VTCs</Typography>
                                        <Icon className={classes.featureIcon} fontSize="inherit" component={AttachMoney} />
                                        <Typography>Running a VTC under 10 employees is FREE! Onwards starts from $5/month.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Link to="/vtc/new">
                            <Button variant="contained" style={{backgroundColor: "#27ae60", color: "white"}}>Create VTC</Button>
                        </Link>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h6"}>Your Profile</Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h6"}>Join Requests</Typography>
                        <TableContainer component={Paper} style={{marginTop: 15}}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>VTC Name</TableCell>
                                    <TableCell align="right">Submitted At</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {props.userJoinRequests.map((jr) => (
                                    <TableRow style={_classNameTranslator(jr.status)} key={jr.id}>
                                        <TableCell component="th" scope="row">
                                            {jr.vtc.name}
                                        </TableCell>
                                        <TableCell align="right">{moment(jr.requested_at).format("DD-MM-YYYY hh:mm:ss")}({moment(jr.requested_at).fromNow()})</TableCell>
                                        <TableCell align="right">{_statusTranslator(jr.status)}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h6"}>All-Time Stats</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}