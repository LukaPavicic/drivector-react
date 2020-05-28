import React, { useState, useEffect } from 'react';
import {Grid, Paper, Typography, Button, Modal, Backdrop, Fade, makeStyles } from "@material-ui/core";
import { Pagination } from '@material-ui/lab'
import NewJobModal from '../../../components/Jobs/NewJobModal';
import axios from 'axios';
import { ROOT_API } from '../../../api_endpoint'
import { useAuth } from '../../../store'
import numeral from 'numeral'
import CountUp from 'react-countup'
import TodayJobsTable from '../../../components/Jobs/TodayJobsTable'

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
    const [isDailyStatsFinished, setIsDailyStatsFinished] = useState(false)
    const [isTodayJobsFinished, setIsTodayJobsFinished] = useState(false)
    const [todayJobs, setTodayJobs] = useState({})
    const [todayJobsPage, setTodayJobsPage] = useState(1)
    const [todayJobsPagesCount, setTodayJobsPagesCount] = useState(1)    

    const classes = useStyles();    
    const {authToken} = useAuth()

    const _getDailyStatistics = () => {
        axios.get(`${ROOT_API}/v1/jobs/daily_stats`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {            
            setTodaysStats(res.data)
            setIsDailyStatsFinished(true)
        }).catch(err => {
            console.log(err)
        })
    }

    const _getTodaysJobs = (val = todayJobsPage) => {
        axios.get(`${ROOT_API}/v1/jobs/today?page=${val}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {            
            setTodayJobs(res.data.objects)
            setTodayJobsPagesCount(res.data.meta.total_pages)
            setIsTodayJobsFinished(true)
        }).catch(err => {
            console.log(err)
        })
    }

    const _getData = () => {
        _getTodaysJobs()
        _getDailyStatistics()
    }

    useEffect(() => {
        _getData()
    }, [])

    const _onChangePagination = (event, value) => {        
        setTodayJobsPage(value)
        _getTodaysJobs(value)
    }

    if(!isTodayJobsFinished || !isDailyStatsFinished) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } else {
        return (
            <div>
                <Grid container spacing={3}>    
                    <NewJobModal refreshData={_getData} vtc={props.vtc} modalOpen={modalOpen} closeModal={() => setModalOpen(false)}/>                                    
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={classes.paper}>
                            <Typography variant={"h6"}>VTC's Today's Statistics</Typography>
                            <div style={{padding: 30, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <Grid container>
                                    <Grid item xs={12} lg={6} md={6} sm={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <Typography variant="h5">Jobs Completed</Typography>
                                        <Typography variant="h4" style={{color: props.vtc.main_color}}>
                                            <CountUp separator="," end={todaysStats.jobs_completed} duration={3} />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={6} md={6} sm={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <Typography variant="h5">Distance Driven</Typography>
                                        <Typography variant="h4" style={{color: props.vtc.main_color}}>
                                            <CountUp separator="," end={todaysStats.km_driven} duration={3} />km
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={6} md={6} sm={12} style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40}}>
                                        <Typography variant="h5">Average Damage Taken</Typography>
                                        <Typography variant="h4" style={{color: props.vtc.main_color}}>
                                            <CountUp separator="." end={todaysStats.average_damage} duration={3} />%                                        
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={6} md={6} sm={12} style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40}}>
                                        <Typography variant="h5">Money Earned</Typography>
                                        <Typography variant="h4" style={{color: props.vtc.main_color}}>
                                            $<CountUp separator="," end={todaysStats.money_earned} duration={3} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={classes.paper}>
                            <Typography variant={"h6"}>Submit New Job</Typography>
                            <Typography>Completed a job and want to log it?</Typography>
                            <div style={{padding: 30, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%"}}>
                                <Button onClick={() => setModalOpen(true)} variant="contained" style={{color: "white", backgroundColor: props.vtc.main_color, flexGrow: 1, width: "100%"}}>SUBMIT JOB</Button>
                            </div>                        
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant={"h6"}>Jobs Completed Today</Typography>    
                            <Pagination count={todayJobsPagesCount} page={todayJobsPage} onChange={_onChangePagination} style={{marginTop: 10}}/>                       
                            <TodayJobsTable jobs={todayJobs} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}