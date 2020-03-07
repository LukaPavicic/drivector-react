import React, { useState } from 'react';
import { useAuth } from "../../store";
import { Button } from "@material-ui/core";
import Navigation from "../../components/Navigation";

export default function DashboardScreen(props) {

    const { setAuthToken } = useAuth();

    const _logout = () => {
        setAuthToken();
    };

    return (
        <div>
            <Navigation userLoggedIn={true} />
            hello there
            <Button onClick={_logout}>logout</Button>
        </div>
    )
}