import React, { useState } from 'react';
import clsx from "clsx";
import { Container, ListItem, ListItemIcon, ListItemText, Typography, makeStyles, Drawer } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import Copyright from "../Copyright";
import BusinessIcon from '@material-ui/icons/Business';
import ForumIcon from '@material-ui/icons/Forum';
import WorkIcon from '@material-ui/icons/Work';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import UserHome from "../../components/Dashboard/UserHome";
import AdminSettings from "../../components/Dashboard/AdminSettings";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SubjectIcon from '@material-ui/icons/Subject';
import AdminManageMembers from "./AdminManageMembers";
import JobsScreen from '../../screens/Authorized/Dashboard/JobsScreen'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    topSectionLeft: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
        padding: "20px",
        backgroundColor: "#fafafa",
        textAlign: "center",
    },
    featureIcon: {
        fontSize: "4rem",
        color: "#27ae60",
    },
    vtcInfoCard: {
        marginTop: "20px",
    },
    vtcCardPresent: {
        width: "70%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        marginBottom: "20px"
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
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
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    activeMenuTab: {
        backgroundColor: "#ecf0f1"
    }
}));


export default function InVtcDashboard(props) {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(props.currentUser);
    const [currentTab, setCurrentTab] = useState(0);
    const [open, setOpen] = React.useState(true);    

    const _renderMainContent = () => {
        switch (currentTab) {
            case 0:
                return <UserHome/>;
            case 1:
                return <UserHome/>;
            case 2:
                return <JobsScreen vtc={currentUser.user_joined_vtc} />;
            case 8:
                return <AdminSettings getNewUserData={() => props.refreshUserData()} vtc={currentUser.user_joined_vtc}/>;
            case 9:
                return <AdminManageMembers vtc={currentUser.user_joined_vtc}/>;
            default:
                return <UserHome/>;
        }
    };

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
                <ListItem>
                    <Typography variant={"caption"} style={{color: "grey"}}>VTC RELATED</Typography>
                </ListItem>
                <ListItem button className={currentTab===1 ? classes.activeMenuTab : null} onClick={() => setCurrentTab(1)}>
                    <ListItemIcon>
                        <BusinessIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"VTC Home"}/>
                </ListItem>
                <ListItem button className={currentTab===2 ? classes.activeMenuTab : null} onClick={() => setCurrentTab(2)}>
                    <ListItemIcon>
                        <WorkIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Jobs"}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <EventIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Events"}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ForumIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Forum"}/>
                </ListItem>
                <ListItem>
                    <Typography variant={"caption"} style={{color: "grey"}}>GENERAL</Typography>
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
                <ListItem button>
                    <ListItemIcon>
                        <SubjectIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Drivector Blog"}/>
                </ListItem>
                {currentUser.id === currentUser.user_joined_vtc.owner ?
                    <div>
                        <ListItem>
                            <Typography variant={"caption"} style={{color: "grey"}}> ADMIN RELATED</Typography>
                        </ListItem>
                        <ListItem button className={currentTab===8 ? classes.activeMenuTab : null} onClick={() => setCurrentTab(8)}>
                            <ListItemIcon>
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Settings"}/>
                        </ListItem>
                        <ListItem button className={currentTab===9 ? classes.activeMenuTab : null} onClick={() => setCurrentTab(9)}>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Manage Members"}/>
                        </ListItem>
                    </div>
                    :
                    null
                }
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {_renderMainContent()}
                </Container>
                <Copyright/>
            </main>
        </div>
    )
}