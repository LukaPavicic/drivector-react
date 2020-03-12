import React from 'react'
import { Link, Typography } from '@material-ui/core'
import Logo from '../img/logogreenwide.png'

function Copyright() {
    return (
        <div align="center" style={{padding: "15px"}}>
            <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://drivector.com/">
                Drivector
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            </Typography>
            <img align="center" src={Logo} style={{maxWidth: 100}}/>
        </div>
    )
}

export default Copyright;