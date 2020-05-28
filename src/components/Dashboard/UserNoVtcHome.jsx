import React from 'react';
import {Grid, Paper, Typography, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { Link } from 'react-router-dom'


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
}));

export default function UserNoVtcHome(props) {

    const classes = useStyles();    

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={classes.paper} elevation={3}>
                        <Typography variant="h6">Create your own VTC</Typography>
                        <p>Want to run your own VTC! Create one now starting for FREE!</p>
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
                        <Typography variant={"h6"}>All-Time Stats</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}