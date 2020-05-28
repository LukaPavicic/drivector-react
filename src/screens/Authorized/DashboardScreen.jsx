import React, {useEffect, useState} from 'react';
import Navigation from "../../components/Navigation";
import axios from 'axios';
import { useAuth } from "../../store";
import { ROOT_API } from "../../api_endpoint";
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import NoVtcDashboard from "../../components/Dashboard/NoVtcDashboard";
import InVtcDashboard from "../../components/Dashboard/InVtcDashboard";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function DashboardScreen(props) {

    const { authToken, setAuthToken } = useAuth();
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const _getLoggedInUserData = () => {
        axios.get(`${ROOT_API}/v1/users/current_user`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            setCurrentUser(res.data.user);
            setIsLoading(false);
            console.log(res.data);
        }).catch(err => {
            setAuthToken();
            history.push('/');
        })
    };

    useEffect(() => {
        _getLoggedInUserData();
    }, []);

    if(isLoading) {
        return (
            <div style={{width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <CircularProgress style={{color: "#27ae60"}}/>
            </div>
        )
    } else {
        return (
            <div>
                <CssBaseline/>
                <Navigation userLoggedIn={true} vtcColor={(currentUser.vtc === null) ? "#27ae60" : currentUser.vtc.main_color} />
                {(currentUser.user_joined_vtc === null) ?
                    <NoVtcDashboard refreshUserData={_getLoggedInUserData} currentUser={currentUser}/>
                    :
                    <InVtcDashboard refreshUserData={_getLoggedInUserData} currentUser={currentUser}/>
                }
            </div>
        )
    }
}