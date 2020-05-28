import React, { useState } from 'react'
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core'
import axios from 'axios'
import { useAuth } from '../../store'
import { ROOT_API } from '../../api_endpoint'

const useStyles = makeStyles(theme => ({
    table: {
        width: "100%"
    }
}))

export default function TodayJobsTable(props) {

    const classes = useStyles()
    const { authToken } = useAuth()    

    return (
        <TableContainer component={Paper} style={{marginTop: 15}}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell align="right">Money Earned</TableCell>
                    <TableCell align="right">Distance Driven</TableCell>
                    <TableCell align="right">Goods Type</TableCell>
                    <TableCell align="right">Damage</TableCell>
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
                        <TableCell align="right">{job.damage}%</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}