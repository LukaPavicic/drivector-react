import React from 'react'
import { Paper, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 15,
        marginTop: 10,
    },
    titleWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
}))

const Event = (props) => {

    const classes = useStyles()

    return (
        <Paper elevation={2} className={classes.paper}>
            <div className={classes.titleWrapper}>
                <Typography variant="h5">{props.event.title}</Typography>
                <Typography style={{color: "grey"}}>created by {props.event.event_author.username}</Typography>
            </div>      
            <Typography variant="body1">{props.event.description}</Typography>      
        </Paper>
    )
}

export default Event