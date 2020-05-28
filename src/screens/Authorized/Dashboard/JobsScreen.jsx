import React, { useState, useEffect } from 'react';
import {Grid, Paper, Typography, Button, Modal, Backdrop, Fade, makeStyles} from "@material-ui/core";
import NewJobModal from '../../../components/Jobs/NewJobModal';
import axios from 'axios';
import { ROOT_API } from '../../../api_endpoint'
import { useAuth } from '../../../store'
import numeral from 'numeral'
import CountUp from 'react-countup'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: "100%"
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function JobsScreen(props) {

    const [modalOpen, setModalOpen] = useState(false)
    const [todaysStats, setTodaysStats] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const classes = useStyles();    
    const {authToken} = useAuth()

    const _getDailyStatistics = () => {
        axios.get(`${ROOT_API}/v1/jobs/daily_stats`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {            
            setTodaysStats(res.data)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        _getDailyStatistics()
    }, [])

    if(isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } else {
        return (
            <div>
                <Grid container spacing={3}>
    
                    <NewJobModal vtc={props.vtc} modalOpen={modalOpen} closeModal={() => setModalOpen(false)}/>                
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={classes.paper}>
                            <Typography variant={"h6"}>VTC's Today's Statistics</Typography>
                            <div style={{padding: 30, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <Grid container>
                                    <Grid item xs={12} lg={6} md={6} sm={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <Typography variant="h5">Jobs Completed</Typography>
                                        <Typography variant="h4" style={{color: props.vtc.main_color}}>
                                            <CountUp decimal="," end={todaysStats.jobs_completed} duration={3} />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={6} md={6} sm={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <Typography variant="h5">Distance Driven</Typography>
                                        <Typography variant="h4" style={{color: props.vtc.main_color}}>
                                            <CountUp decimal="," end={todaysStats.km_driven} duration={3} />km
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={6} md={6} sm={12} style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40}}>
                                        <Typography variant="h5">Average Damage Taken</Typography>
                                        <Typography variant="h4" style={{color: props.vtc.main_color}}>
                                            <CountUp decimal="." end={todaysStats.average_damage} duration={3} />%                                        
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={6} md={6} sm={12} style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40}}>
                                        <Typography variant="h5">Money Earned</Typography>
                                        <Typography variant="h4" style={{color: props.vtc.main_color}}>
                                            $<CountUp decimal="," end={todaysStats.money_earned} duration={3} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={classes.paper}>
                            <Typography variant={"h6"}>Submit New Job</Typography>
                            <div style={{padding: 30, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <Button onClick={() => setModalOpen(true)} variant="contained" style={{color: "white", backgroundColor: props.vtc.main_color}}>SUBMIT JOB</Button>
                            </div>                        
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant={"h6"}>Jobs Completed Today</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}