import React, {useEffect, useState} from 'react';
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import {Container, ListItem, ListItemIcon, ListItemText, Typography,CircularProgress} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SettingsIcon from "@material-ui/icons/Settings";
import Copyright from "../Copyright";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {ROOT_API} from "../../api_endpoint";
import {useAuth} from "../../store";
import {useHistory} from "react-router-dom"
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleIcon from "@material-ui/icons/People";
import SubjectIcon from '@material-ui/icons/Subject';
import UserNoVtcHome from "./UserNoVtcHome";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        position: 'fixed',
        top: "65px",
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    activeMenuTab: {
        backgroundColor: "#ecf0f1"
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        marginLeft: 240,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default function NoVtcDashboard(props) {
    const [currentTab, setCurrentTab] = useState(0);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [featuredVtcs, setFeaturedVtcs] = useState([]);
    const [currentUser, setCurrentUser] = useState(props.currentUser);
    const {authToken, setAuthToken} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const _onClickCreateNewVtc = () => {
        history.push("/vtc/new");
    };

    const _getAllVtcs = () => {
        axios.get(`${ROOT_API}/v1/vtcs`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            console.log(res.data);
            setFeaturedVtcs(res.data.vtcs);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        })
    };

    useEffect(() => {
        _getAllVtcs();
    }, []);

    const _renderSections = () => {
        switch (currentTab) {
            case 0:
                return (
                    <UserNoVtcHome />
                )
        }
    };

    if(isLoading) {
        return (
            <div>
                <div style={{width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress style={{color: "#27ae60"}}/>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{display: "flex", flexGrow: 1, width: "100%"}}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <ListItem>
                        <Typography variant={"caption"} style={{color: "grey"}}>USER RELATED</Typography>
                    </ListItem>
                    <ListItem button className={currentTab===0 ? classes.activeMenuTab : null} onClick={() => setCurrentTab(0)}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                    <ListItem button className={currentTab===1 ? classes.activeMenuTab : null} onClick={() => setCurrentTab(1)}>
                        <ListItemIcon>
                            <ReceiptIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Receipts"}/>
                    </ListItem>
                    <ListItem button className={currentTab===2 ? classes.activeMenuTab : null} onClick={() => setCurrentTab(2)}>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Settings"}/>
                    </ListItem>
                    <ListItem>
                        <Typography variant={"caption"} style={{color: "grey"}}>OTHER</Typography>
                    </ListItem>
                    <ListItem button className={currentTab===2 ? classes.activeMenuTab : null} onClick={() => setCurrentTab(2)}>
                        <ListItemIcon>
                            <SubjectIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Drivector Blog"}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <EqualizerIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"VTC Rankings"}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"User Rankings"}/>
                    </ListItem>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {_renderSections()}
                    </Container>
                    <Copyright/>
                </main>
            </div>
        )
    }
}