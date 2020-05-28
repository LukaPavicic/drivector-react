import React, { useState } from 'react'
import { Table, Tooltip, Button, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core'
import axios from 'axios'
import { useAuth } from '../../store'
import { ROOT_API } from '../../api_endpoint'
import moment from 'moment'
import JobInfoModal from './JobInfoModal'
import { FaInfoCircle } from 'react-icons/fa'

const useStyles = makeStyles(theme => ({
    table: {
        width: "100%"
    }
}))

export default function TodayJobsTable(props) {

    const [moreInfoModalOpen, setMoreInfoModalOpen] = useState(false)
    const [selectedJob, setSelectedJob] = useState({})

    const classes = useStyles()
    const { authToken } = useAuth()    

    const _openMoreInfoModal = (job) => {
        setSelectedJob(job)
        setMoreInfoModalOpen(true)
    }

    return (
        <TableContainer component={Paper} style={{marginTop: 15}}>     
            {moreInfoModalOpen ? <JobInfoModal modalOpen={moreInfoModalOpen} closeModal={() => setMoreInfoModalOpen(false)} job={selectedJob}/> : null}
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Money Earned</TableCell>
                        <TableCell align="right">Distance Driven</TableCell>
                        <TableCell align="right">Goods Type</TableCell>
                        <TableCell align="right">Submitted At</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.jobs.map((job) => (
                    <TableRow key={job.id}>                        
                        <TableCell component="th" scope="row">
                            {job.user.username}
                        </TableCell>
                        <TableCell align="right">${job.money_made}</TableCell>
                        <TableCell align="right">{job.km_driven}km</TableCell>
                        <TableCell align="right">{job.goods_type}</TableCell>
                        <TableCell align="right">{moment(job.created_at).fromNow()}</TableCell>
                        <TableCell align="right">
                            <Tooltip title={"More Job Info"}>
                                <Button onClick={() => _openMoreInfoModal(job)} style={{backgroundColor: "#f1c40f", marginLeft: "10px"}} variant={"contained"}><FaInfoCircle style={{color: "white"}}/></Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}