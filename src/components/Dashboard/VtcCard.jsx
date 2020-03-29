import React, {useState} from 'react';
import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core";
import {useHistory} from 'react-router-dom';

export default function VtcCard(props) {

    const history = useHistory();

    const _goToVtcPage = (id) => {
        history.push(`/vtc/${id}`);
    };

    return (
        <Card key={props.vtc.id} elevation={3} style={{marginTop: "10px", width: "100%"}}>
            <CardContent style={{wordWrap: "break-word"}}>
                <Grid container>
                    <Grid item lg={3} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div style={{backgroundColor: "grey", width: 70, height: 70, borderRadius: 35}}>

                        </div>
                    </Grid>
                    <Grid item lg={7}>
                        <Typography align={"left"} variant="h6">{props.vtc.name}</Typography>
                        <Typography align={"left"}>{props.vtc.description}</Typography>
                        <Typography align={"left"} style={{color: "grey"}}>{props.vtc.member_count}/{props.vtc.maximum_amount_of_users}</Typography>
                    </Grid>
                    <Grid item lg={2} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Button onClick={() => _goToVtcPage(props.vtc.id)} variant={"contained"} style={{backgroundColor: "#27ae60", color: "white"}}>VIEW</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}