import React, { useState } from 'react'
import { makeStyles, Modal, Backdrop, Fade, Typography, Button } from '@material-ui/core'
import { ROOT_API } from '../../api_endpoint'
import axios from 'axios'
import { useAuth } from '../../store'
import JobInput from '../Jobs/JobInput'
import { FaCity, FaAlignJustify, FaCalendarAlt } from 'react-icons/fa'
import DateTimePicker from 'react-datetime-picker'

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        paddingBottom: 20,
        borderRadius: 10,
        width: 900,
        outline: "none",
        maxHeight: "80%",
        overflowY: "auto"
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
}))

export default function NewEventModal(props) {

    const classes = useStyles()
    const { authToken } = useAuth()
    const [eventTitle, setEventTitle] = useState("")
    const [eventStartCity, setEventStartCity] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [eventStartTime, setEventStartTime] = useState(null)
    const [eventStartDate, setEventStartDate] = useState(null)
    const [eventDatetime, setEventDatetime] = useState(new Date())

    const _createNewEvent = () => {   
      console.log(eventDatetime)   
      axios.post(`${ROOT_API}/v1/events/create`, {
        "event": {
          title: eventTitle,
          description: eventDescription,
          start_time: eventDatetime,
          start_city: eventStartCity
        }
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }).then(res => {
        console.log(res.data)
        props.closeModal()
      }).catch(err => {
        console.log(err)
      })
    }

    return (
      <div>
          <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={props.modalOpen}
              onClose={props.closeModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
              timeout: 500,
              }}
          >
              <Fade in={props.modalOpen}>
              <div className={classes.modalPaper}>
                  <Typography variant="h4">Create New Event</Typography>
                  <Typography variant="h6">Please fill out every field in this form to successfully create a new event.</Typography>
                  <JobInput value={eventTitle} setValue={(e) => setEventTitle(e)} label="Title for your event..." title="Event Title"/>
                  <JobInput icon={<FaCity/>} value={eventStartCity} setValue={(e) => setEventStartCity(e)} label="Starting point of your event..." title="Starting City"/>
                  <JobInput icon={<FaAlignJustify/>} rows={5} multiline={true} value={eventDescription} setValue={(e) => setEventDescription(e)} label="Tell the people what this event is all about..." title="Description"/>
                  {/* <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                    <JobInput style={{width: "45%"}} extraMessage="Month / Date / Year" icon={<FaCalendarAlt/>} type="date" value={eventStartDate} setValue={(e) => setEventStartDate(e)} title="Starting Date"/>
                    <JobInput style={{width: "50%"}} extraMessage="Hours:Minutes AM/PM in UTC time!" icon={<FaCalendarAlt/>} type="time" value={eventStartTime} setValue={(e) => setEventStartTime(e)} title="Starting Time (UTC)"/>                      
                  </div>      */}
                  <Typography variant="h6" style={{marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <FaCalendarAlt/> <span style={{marginLeft: 10}}>Start Time</span>
                  </Typography>
                  <div style={{marginTop: 15}}>
                    <DateTimePicker
                      calendarAriaLabel="Toggle calendar"
                      clearAriaLabel="Clear value"
                      dayAriaLabel="Day"
                      hourAriaLabel="Hour"                      
                      minuteAriaLabel="Minute"
                      monthAriaLabel="Month"
                      nativeInputAriaLabel="Date and time"
                      onChange={setEventDatetime}                      
                      value={eventDatetime}
                      yearAriaLabel="Year"
                    />
                  </div>                  
                  <Button onClick={() => _createNewEvent()} variant="contained" style={{backgroundColor: props.vtc.main_color, color: "white", marginTop: 15}}>Create New Event</Button>
              </div>
              </Fade>
          </Modal>
      </div>
    )
}