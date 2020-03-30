import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import Navigation from "../../components/Navigation";
import {
    Container,
    Grid,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Card,
    CardContent,
    Icon,
    ListItemIcon,
    ListItem, ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { useAuth } from "../../store";
import { ROOT_API } from "../../api_endpoint";
import Copyright from "../../components/Copyright";
import { useHistory } from 'react-router-dom';
import {AttachMoney, MoneyOff, Tune} from "@material-ui/icons";
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import ForumIcon from '@material-ui/icons/Forum';
import WorkIcon from '@material-ui/icons/Work';
import EventIcon from '@material-ui/icons/Event';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import UserHome from "../../components/Dashboard/UserHome";
import AdminSettings from "../../components/Dashboard/AdminSettings";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SubjectIcon from '@material-ui/icons/Subject';
import AdminManageMembers from "../../components/Dashboard/AdminManageMembers";
import VtcCard from "../../components/Dashboard/VtcCard";

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

export default function DashboardScreen(props) {

    const { authToken, setAuthToken } = useAuth();
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

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

    const _getAllVtcs = () => {
      axios.get(`${ROOT_API}/v1/vtcs`, {
          headers: {
              'Authorization': `Bearer ${authToken}`
          }
      }).then(res => {
          console.log(res.data);
          setFeaturedVtcs(res.data.vtcs);
      }).catch(err => {
          console.log(err);
      })
    };

    const _getJoinedVtc = () => {
        if(currentUser.user_joined_vtc !== null) {
            axios.get(`${ROOT_API}/v1/vtcs/${currentUser.user_joined_vtc.id}`).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    };


    const _onClickCreateNewVtc = () => {
      history.push("/vtc/new");
    };

    useEffect(() => {
        _getAllVtcs();
        _getLoggedInUserData();
    }, []);

    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState(0);
    const [featuredVtcs, setFeaturedVtcs] = useState([]);
    const [loggedUserVtc, setLoggedUserVtc] = useState({});

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const _renderMainContent = () => {
        switch (currentTab) {
            case 0:
                return <UserHome/>;
            case 1:
                return <UserHome/>;
            case 8:
                return <AdminSettings getNewUserData={_getLoggedInUserData} vtc={currentUser.user_joined_vtc}/>;
            case 9:
                return <AdminManageMembers vtc={currentUser.user_joined_vtc}/>;
            default:
                return <UserHome/>;
        }
    };

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
                <Navigation userLoggedIn={true} vtcColor={(currentUser.user_joined_vtc === null) ? "#27ae60" : currentUser.user_joined_vtc.main_color} />
                    {(currentUser.user_joined_vtc === null) ?
                        <Container style={{marginTop: "70px"}}>
                            <Grid container spacing={5} direction={"row"} style={{paddingTop: "10px", paddingBottom: "20px"}}>
                                <Grid className={classes.topGrid} item xs={12} sm={12} md={6} lg={6}>
                                    <Paper elevation={3} className={classes.topSectionLeft}>
                                        <Typography variant={"h4"}>You are currently not in a VTC</Typography>
                                        <Button variant={"contained"} style={{backgroundColor: "#27ae60", color: "white", marginTop: "20px"}}>SEARCH FOR VTCs</Button>
                                        <Typography style={{marginTop: "10px"}}>Featured VTCs:</Typography>
                                        {featuredVtcs.slice(0,5).map(vtc => {
                                            return (
                                                <VtcCard vtc={vtc}/>
                                            )
                                        })}
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Paper elevation={3} className={classes.topSectionLeft}>
                                        <Typography variant={"h4"}>Want to run your own VTC?</Typography>
                                        <Button onClick={_onClickCreateNewVtc} to={"/vtc/new"} variant={"contained"} style={{backgroundColor: "#27ae60", color: "white", marginTop: "20px"}}>CREATE VTC NOW</Button>
                                        <Typography style={{marginTop: "10px"}}>Here is some more info:</Typography>
                                        <Grid container>
                                            <Grid className={classes.vtcInfoCard} item sm={12} xs={12}>
                                                <Card elevation={3} height={200}>
                                                    <CardContent align="center">
                                                        <Typography align="center" variant="h6">Free For Your Employees</Typography>
                                                        <Icon className={classes.featureIcon} fontSize="inherit" component={MoneyOff} />
                                                        <Typography>All of your employees don't have to pay a dime for anything!</Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid className={classes.vtcInfoCard} item sm={12} xs={12}>
                                                <Card elevation={3}>
                                                    <CardContent align="center">
                                                        <Typography align="center" variant="h6">Highly Customizable</Typography>
                                                        <Icon className={classes.featureIcon} fontSize="inherit" component={Tune} />
                                                        <Typography>Customize your VTCs capacity, color, image, permissions, requirements and many more!</Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid className={classes.vtcInfoCard} item sm={12} xs={12}>
                                                <Card elevation={3}>
                                                    <CardContent align="center">
                                                        <Typography align="center" variant="h6">Low Price To Start</Typography>
                                                        <Icon className={classes.featureIcon} fontSize="inherit" component={AttachMoney} />
                                                        <Typography>Running a VTC under 10 employees is FREE! Onwards starts from $5/month.</Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                        :
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
                                <ListItem button className={currentTab===1 ? classes.activeMenuTab : null}>
                                    <ListItemIcon>
                                        <BusinessIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={"VTC Home"}/>
                                </ListItem>
                                <ListItem button>
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
                    }
            </div>
        )
    }
}