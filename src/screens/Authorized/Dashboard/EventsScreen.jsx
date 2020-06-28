import React, { useState, useEffect } from 'react'
import { Typography, makeStyles, Button, Grid } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import NewEventModal from '../../../components/Events/NewEventModal'
import axios from 'axios'
import { ROOT_API } from '../../../api_endpoint'
import { useAuth } from '../../../store'
import Event from '../../../components/Events/Event'

const useStyles = makeStyles(theme => ({
    titleWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    }
}))

const EventsScreen = (props) => {

    const classes = useStyles()
    const { authToken } = useAuth()

    const [newEventModalOpen, setNewEventModalOpen] = useState(false)
    const [vtcEvents, setVtcEvents] = useState([])
    const [eventsPage, setEventsPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(1)

    const _getVtcEvents = (page = 1) => {
        axios.get(`${ROOT_API}/v1/events/vtc_events?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            setVtcEvents(res.data.events)
            setPagesCount(res.data.meta.total_pages)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        _getVtcEvents()      
    }, [])

    return (
        <div>
            <NewEventModal vtc={props.vtc} modalOpen={newEventModalOpen} closeModal={() => setNewEventModalOpen(false)}/>
            <div className={classes.titleWrapper}>
                <div>
                    <Typography variant="h3">Events</Typography>
                    <Typography variant="h6" style={{color: "grey"}}>Check out all the events for your VTC which you can be apart of.</Typography>
                </div>  
                <div>
                    <Button variant="contained" onClick={() => setNewEventModalOpen(true)} style={{backgroundColor: props.vtc.main_color, color: "white"}}>New Event</Button>
                </div>              
            </div>  

            <Pagination count={pagesCount} onChange={(event, page) => _getVtcEvents(page)} style={{marginTop: 10, marginBottom: 10}}/>                     

            <Grid container spacing={4}>
                {vtcEvents.map(event => (
                    <Grid item xs={12} lg={6} md={6} sm={12}>
                        <Event key={event.id} event={event}/>
                    </Grid>                    
                ))}
            </Grid>            
        </div>
    )
}

export default EventsScreen