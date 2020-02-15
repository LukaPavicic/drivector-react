import React from 'react'
import { withStyles, createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import Navigation from '../components/Navigation'
import WelcomeSectionImage from '../img/multipletrucks.jpg'
import { Container, Grid, Typography, Button, Icon, Paper, Card, CardContent, CardActions } from '@material-ui/core';
import { ArrowDownward, MoneyOff, AttachMoney, Tune } from '@material-ui/icons'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    welcomeSectionWrapper: {
        flexGrow: 1,
        width: "100%",
        background: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${WelcomeSectionImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        // backgroundAttachment: "fixed",
        paddingTop: "5rem",        
        paddingBottom: "5rem",
    },
    welcomeSectionContainer: {
        paddingTop: "4.5rem",
        paddingBottom: "1rem",
        height: "100%",
    },
    welcomeGrid: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        flexGrow: 1,
    },
    learnMoreButton: {
        backgroundColor: "#27ae60",
        color: "white",
        marginTop: "15px",
        '&:hover': {
            backgroundColor: "#2ecc71",
        }
    },
    welcomeFeaturesContainer: {
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",    
        marginTop: "7px",    
        marginBottom: "7px",    
    },
    featureIcon: {
        fontSize: "4rem"
    }
});

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

class HomeScreen extends React.Component {
    render() {

        const { classes } = this.props

        return (
            <div className={classes.root}>
                <Navigation />
                <div className={classes.welcomeSectionWrapper}>
                    <Container className={classes.welcomeSectionContainer}>
                        <div className={classes.welcomeGrid}>                            
                            <ThemeProvider theme={theme}>
                                <Typography align="center" variant="h2">Welcome to VTC Drivers Hub</Typography>
                                <Typography align="center" variant="h5">Easily add Drivers Hub to your existing VTC for better job management and happier users!</Typography>
                            </ThemeProvider>

                            <Grid container spacing={5} className={classes.welcomeFeaturesContainer}>
                                <Grid item sm={4} xs={12}>
                                    <Card elevation={3} className={classes.Card} height={200}>
                                        <CardContent align="center">
                                            <Typography align="center" variant="h6">Free For Users</Typography>
                                            <Icon className={classes.featureIcon} fontSize="inherit" component={MoneyOff} />
                                            <Typography>All users who are not running a VTC get all functionality for free!</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Card elevation={3} className={classes.Card}>
                                        <CardContent align="center">
                                            <Typography align="center" variant="h6">Highly Customizable</Typography>
                                            <Icon className={classes.featureIcon} fontSize="inherit" component={Tune} />
                                            <Typography>Customize your VTCs capacity, color, image, permissions, requirements and many more!</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Card elevation={3} className={classes.Card}>
                                        <CardContent align="center">
                                            <Typography align="center" variant="h6">Low Price For VTCs</Typography>
                                            <Icon className={classes.featureIcon} fontSize="inherit" component={AttachMoney} />
                                            <Typography>Running a VTC under 10 employees is FREE! Onwards starts from $2/month.</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            <Button className={classes.learnMoreButton} variant="contained">
                                LEARN MORE
                                <Icon component={ArrowDownward}/>
                            </Button>                            
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(HomeScreen)