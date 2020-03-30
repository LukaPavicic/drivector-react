import React, {useEffect, useState} from 'react';
import {useAuth} from "../../store";
import {
    Grid,
    Paper,
    Typography,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios';
import {ROOT_API} from "../../api_endpoint";
import EmployeeItem from "./EmployeeItem";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    generalInfo: {
        marginTop: "15px",
    },
    generalInfoItem: {
        color: "#7f8c8d",
        marginTop: "5px",
    }
}));

export default function AdminManageMembers(props) {

    const {authToken, setAuthToken} = useAuth();
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [currentEmployees, setCurrentEmployees] = useState([]);
    const [joinRequests, setJoinRequests] = useState([]);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const _getCurrentEmployees = () => {
        axios.get(`${ROOT_API}/v1/vtcs/${props.vtc.id}/retrieve_employees`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            console.log(res.data);
            setCurrentEmployees(res.data.user_joined_vtcs);
        }).catch(err => {
            console.log(err);
        })
    };

    const _getJoinRequests = () => {
        axios.get(`${ROOT_API}/v1/join_requests/vtc_requests`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            console.log(res.data);
            setJoinRequests(res.data.join_requests);
        }).catch(err => {
            console.log(err);
        })
    };

    useEffect(() => {
        _getCurrentEmployees();
        _getJoinRequests();
    }, []);

    const _renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return (
                    <TableContainer component={Paper} style={{marginTop: "10px"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Permissions</TableCell>
                                    <TableCell>Join Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentEmployees.map(emp => {
                                    return (
                                        <EmployeeItem key={emp.id} emp={emp}/>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            case 1:
                return (
                    <TableContainer component={Paper} style={{marginTop: "10px"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Permissions</TableCell>
                                    <TableCell>Join Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {joinRequests.map(req => {
                                    return (
                                        <h1>{req.user.username}</h1>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
        }
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={12} lg={12}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h6"}>Manage Members</Typography>
                        <Tabs
                            value={selectedTab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            TabIndicatorProps={{style: {background: props.vtc.main_color, textColor: props.vtc.main_color}}}
                        >
                            <Tab label="Current Employees" onClick={() => setSelectedTab(0)} />
                            <Tab label="Pending Requests To Join" onClick={() => setSelectedTab(1)}/>
                        </Tabs>
                        {_renderTabContent()}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};