import React from 'react'
import {Grid, Typography, TableRow, TableCell, Button, Tooltip} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import moment from "moment";
import axios from 'axios'
import {ROOT_API} from '../../api_endpoint'
import {useAuth} from '../../store'


export default function EmployeeItem(props) {
    // VTC Permissions:
    // 1 - member
    // 2 - moderator
    // 3 - admin

    const {authToken, setAuthToken} = useAuth();

    const _renderPermission = (p) => {
      switch (p) {
          case 1:
              return "Member";
          case 2:
              return "Moderator";
          case 3:
              if(props.emp.user.id === props.emp.vtc.owner) {
                  return "Admin (Owner)";
              }
              return "Admin";
          default:
              return "Not found. Please contact support.";
      }
    };

    const _kickEmployee = (user_to_kick) => {
        console.log(props.vtc)
        axios.delete(`${ROOT_API}/v1/user_joined_vtcs/kick`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            data: {            
                vtc_id: props.vtc,
                user_id: user_to_kick            
            }
        }).then(res => {
            console.log(res.data)
            props.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    const _promoteEmployee = (user_to_promote) => {
        axios.post(`${ROOT_API}/v1/user_joined_vtcs/promote`, {
            vtc_id: props.vtc,
            user_id: user_to_promote
        }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            props.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    const _demoteEmployee = (user_to_demote) => {
        axios.post(`${ROOT_API}/v1/user_joined_vtcs/demote`, {
            vtc_id: props.vtc,
            user_id: user_to_demote
        }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            props.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    const _renderPromote = (p) => {
        switch (p) {
            case 1:
                return (
                    <Tooltip title={"Promote to Moderator"}>
                        <Button onClick={() => _promoteEmployee(props.emp.user.id)} style={{backgroundColor: "#27ae60", marginLeft: "10px"}} variant={"contained"}><TrendingUpIcon style={{color: "white"}}/></Button>
                    </Tooltip>
                );
            case 2:
                return (
                    <Tooltip title={"Already Highest Rank"}>
                        <Button style={{backgroundColor: "#bdc3c7", marginLeft: "10px"}} variant={"contained"}><TrendingUpIcon style={{color: "white"}}/></Button>
                    </Tooltip>
                );
            case 3:
                return (
                    <Tooltip title={"Already Highest Rank"}>
                        <Button style={{backgroundColor: "#bdc3c7", marginLeft: "10px"}} variant={"contained"}><TrendingUpIcon style={{color: "white"}}/></Button>
                    </Tooltip>
                );
            default:
                return (
                    <Tooltip title={"Something went wrong. Please contact support."}>
                        <Button style={{backgroundColor: "#bdc3c7", marginLeft: "10px"}} variant={"contained"}><TrendingUpIcon style={{color: "white"}}/></Button>
                    </Tooltip>
                );
        }
    };

    const _renderDemote = (p) => {
        switch (p) {
            case 1:
                return (
                    <Tooltip title={"Already Lowest Rank"}>
                        <Button style={{backgroundColor: "#bdc3c7", marginLeft: "10px"}} variant={"contained"}><TrendingDownIcon style={{color: "white"}}/></Button>
                    </Tooltip>
                );
            case 2:
                return (
                    <Tooltip title={"Demote to Member"}>
                        <Button onClick={() => _demoteEmployee(props.emp.user.id)} style={{backgroundColor: "#f1c40f", marginLeft: "10px"}} variant={"contained"}><TrendingDownIcon style={{color: "white"}}/></Button>
                    </Tooltip>
                );
            case 3:
                if(props.emp.user.id === props.emp.vtc.owner) {
                    return (
                        <Tooltip title={"Owner cannot be demoted."}>
                            <Button style={{backgroundColor: "#bdc3c7", marginLeft: "10px"}} variant={"contained"}><TrendingDownIcon style={{color: "white"}}/></Button>
                        </Tooltip>
                    );
                }
            default:
                return (
                    <Tooltip title={"Something went wrong. Please contact support."}>
                        <Button style={{backgroundColor: "#bdc3c7", marginLeft: "10px"}} variant={"contained"}><TrendingDownIcon style={{color: "white"}}/></Button>
                    </Tooltip>
                );
        }
    };

    return (
        <TableRow>
            <TableCell component={"th"} scope={"row"}>{props.emp.user.username}</TableCell>
            <TableCell>{_renderPermission(props.emp.permissions)}</TableCell>
            <TableCell>{moment(props.emp.created_at).format("MMMM Do YYYY")}({moment(props.emp.created_at).fromNow()})</TableCell>
            <TableCell>
                {(props.emp.user.id === props.emp.vtc.owner) ?
                    <Tooltip title={"Owner cannot be kicked."}>
                        <Button style={{backgroundColor: "#bdc3c7"}} variant={"contained"}><DeleteIcon style={{color: "white"}}/></Button>
                    </Tooltip>
                    :
                    <Tooltip title={"Kick"}>
                        <Button onClick={() => _kickEmployee(props.emp.user.id)} style={{backgroundColor: "#e74c3c"}} variant={"contained"}><DeleteIcon style={{color: "white"}}/></Button>
                    </Tooltip>
                }
                {_renderPromote(props.emp.permissions)}
                {_renderDemote(props.emp.permissions)}
            </TableCell>
        </TableRow>
    )
};