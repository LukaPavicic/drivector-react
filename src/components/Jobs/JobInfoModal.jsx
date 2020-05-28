import React, { useState } from 'react'
import { makeStyles, Modal, Backdrop, Fade, Typography, Button } from '@material-ui/core'
import JobInput from './JobInput'
import { ROOT_API } from '../../api_endpoint'
import axios from 'axios'
import { useAuth } from '../../store'
import { IoLogoUsd } from 'react-icons/io'
import { FaRoad, FaBox, FaCity, FaBuilding, FaHouseDamage, FaCalendar } from 'react-icons/fa'
import moment from 'moment'

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
}))

export default function JobInfo(props) {

    const classes = useStyles()
    const { authToken } = useAuth()

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
                    <Typography variant="h4">Job Info</Typography>
                    <Typography variant="h6">Complete log of {props.job.user.username}'s job'.</Typography>

                    <Typography variant="h6" style={{marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <IoLogoUsd/> <span style={{marginLeft: 10}}>Money Earned</span>
                    </Typography>
                    <Typography variant="h6" style={{color: "grey"}}>${props.job.money_made}</Typography>

                    <Typography variant="h6" style={{marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <FaRoad/> <span style={{marginLeft: 10}}>Distance Driven</span>
                    </Typography>
                    <Typography variant="h6" style={{color: "grey"}}>{props.job.km_driven}km</Typography>

                    <Typography variant="h6" style={{marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <FaBox/> <span style={{marginLeft: 10}}>Goods Type</span>
                    </Typography>
                    <Typography variant="h6" style={{color: "grey"}}>{props.job.goods_type}</Typography>

                    <Typography variant="h6" style={{marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <FaHouseDamage/> <span style={{marginLeft: 10}}>Damage</span>
                    </Typography>
                    <Typography variant="h6" style={{color: "grey"}}>{props.job.damage}%</Typography>

                    <Typography variant="h6" style={{marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <FaCity/> <span style={{marginLeft: 10}}>Starting City</span>
                    </Typography>
                    <Typography variant="h6" style={{color: "grey"}}>{props.job.from_city}</Typography>

                    <Typography variant="h6" style={{marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <FaCity/> <span style={{marginLeft: 10}}>Destination City</span>
                    </Typography>
                    <Typography variant="h6" style={{color: "grey"}}>{props.job.to_city}</Typography>

                    <Typography variant="h6" style={{marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <FaBuilding/> <span style={{marginLeft: 10}}>Starting Company</span>
                    </Typography>
                    <Typography variant="h6" style={{color: "grey"}}>{props.job.from_company}</Typography>

                    <Typography variant="h6" style={{marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <FaBuilding/> <span style={{marginLeft: 10}}>Destination Company</span>
                    </Typography>
                    <Typography variant="h6" style={{color: "grey"}}>{props.job.to_company}</Typography>

                    <Typography variant="h6" style={{marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <FaCalendar/> <span style={{marginLeft: 10}}>Submitted At</span>
                    </Typography>
                    <Typography variant="h6" style={{color: "grey"}}>{moment(props.job.created_at).format("D-M-Y hh:mm:ss")}</Typography>
                </div>
                </Fade>
            </Modal>
        </div>
    )
}