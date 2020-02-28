import React from 'react'
import { withStyles, createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import Navigation from '../components/Navigation'
import WelcomeSectionImage from '../img/multipletrucks.jpg'
import OrganizeEventsImage from '../img/multipletrucks.jpg'
import DeliveryImage from '../img/delivery.jpg'
import ForumImage from '../img/forum.jpg'
import Copyright from '../components/Copyright'
import { Container, Grid, Typography, Button, Icon, Card, CardContent, CardActions, CardHeader, Link, Box } from '@material-ui/core';
import { ArrowDownward, MoneyOff, AttachMoney, Tune, Star } from '@material-ui/icons'

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
        paddingTop: "5rem",        
        paddingBottom: "5rem",
    },
    featuresSectionWrapper: {
        flexGrow: 1,
        width: "100%",
        paddingTop: "2rem",
        paddingBottom: "2rem"
    },
    pricingSectionWrapper: {
        flexGrow: 1,
        width: "100%",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        backgroundColor: "#27ae60"
    },
    welcomeSectionContainer: {
        paddingTop: "4.5rem",
        paddingBottom: "1rem",
        height: "100%",
    },
    featuresSectionContainer: {
        paddingTop: "1rem",
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
        fontSize: "4rem",
        color: "#27ae60",
    },
    featureDescription: {
        fontWeight: "300",
        marginTop: "10px"
    }, 
    featureRow: {
        marginBottom: "50px",
    },
    featureImageWrapper: {
        padding: "1rem"
    },
    featureImage: {
        borderRadius: "15px"
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
        heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    pricingTitle: {
        color: "white",
        marginBottom: "20px"
    },
    pricingButtons: {
        backgroundColor: "#27ae60",
        color: "white",
        '&:hover': {
            backgroundColor: "#2ecc71",
        }
    },
    pricingButtonsAlt: {
        borderColor: "#27ae60",
        color: "#27ae60",
        '&:hover': {
            color: "white",
            backgroundColor: "#2ecc71",
        }
    },
    pricingDescriptionDown: {
        color: "white",
        marginTop: "20px"
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,        
        paddingTop: "20px",
        color: "white", 
        // marginBottom: theme.spacing(8),   
    },
});

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

class HomeScreen extends React.Component {
    render() {

        const { classes } = this.props;

        const tiers = [
            {
              title: 'Free',
              price: '0',
              description: ['Up to 10 employees', 'All features', 'Email support'],
              buttonText: 'GET STARTED',
              buttonVariant: 'outlined',
            },
            {
              title: 'Standard',
              subheader: 'Most popular',
              price: '5',
              description: [
                'Up to 30 employees',
                'All features',                
                'Priority email support',
              ],
              buttonText: 'Get started',
              buttonVariant: 'contained',
            },
            {
              title: 'Pro',
              price: '8',
              description: [
                'Unlimited employees',
                'All features',
                'Priority email support'                        
              ],
              buttonText: 'Contact us',
              buttonVariant: 'outlined',
            },
        ];

        const footers = [
            {
              title: 'Drivector',
              description: ['Team', 'Credits', 'About', 'Contact'],
            },
            {
              title: 'Help',
              description: ['Contact Support', 'FAQ', 'Server Status'],
            },            
            {
              title: 'Legal',
              description: ['Privacy policy', 'Terms of use'],
            },
        ];

        return (
            <div className={classes.root}>
                <Navigation />
                <div className={classes.welcomeSectionWrapper}>
                    <Container className={classes.welcomeSectionContainer}>
                        <div className={classes.welcomeGrid}>                            
                            <ThemeProvider theme={theme}>
                                <Typography align="center" variant="h2">Welcome to Drivector</Typography>
                                <Typography align="center" variant="h5">Easily add Drivers Hub to your existing VTC for better job management and happier users!</Typography>
                            </ThemeProvider>

                            <Grid container spacing={5} className={classes.welcomeFeaturesContainer}>
                                <Grid item sm={4} xs={12}>
                                    <Card elevation={3} height={200}>
                                        <CardContent align="center">
                                            <Typography align="center" variant="h6">Free For Users</Typography>
                                            <Icon className={classes.featureIcon} fontSize="inherit" component={MoneyOff} />
                                            <Typography>All users who are not running a VTC get all functionality for free!</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Card elevation={3}>
                                        <CardContent align="center">
                                            <Typography align="center" variant="h6">Highly Customizable</Typography>
                                            <Icon className={classes.featureIcon} fontSize="inherit" component={Tune} />
                                            <Typography>Customize your VTCs capacity, color, image, permissions, requirements and many more!</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Card elevation={3}>
                                        <CardContent align="center">
                                            <Typography align="center" variant="h6">Low Price For VTCs</Typography>
                                            <Icon className={classes.featureIcon} fontSize="inherit" component={AttachMoney} />
                                            <Typography>Running a VTC under 10 employees is FREE! Onwards starts from $5/month.</Typography>
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

                <div className={classes.featuresSectionWrapper}>
                    <Container className={classes.featuresSectionContainer}>
                        <ThemeProvider theme={theme}>
                            <Grid container className={classes.featureRow}>
                                <Grid xs={12} sm={8} item>
                                    <Typography variant="h3">Track deliveries</Typography>
                                    <Typography variant="h5" className={classes.featureDescription}>Your employees can log how much money they made, driving distance, goods etc. on every 
                                    job they finish. You can then see work done by single employee or statistics for all of your company.
                                    </Typography>
                                </Grid>
                                <Grid xs={12} sm={4} item className={classes.featureImageWrapper}>
                                    <img alt={"delivery"} src={DeliveryImage} width="100%" className={classes.featureImage}/>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.featureRow}>
                                <Grid xs={12} sm={8} item>
                                    <Typography variant="h3">Organize Events</Typography>
                                    <Typography variant="h5" className={classes.featureDescription}>Your employees can log how much money they made, driving distance, goods etc. on every 
                                    job they finish. You can then see work done by single employee or statistics for all of your company.
                                    </Typography>
                                </Grid>
                                <Grid xs={12} sm={4} item className={classes.featureImageWrapper}>
                                    <img alt={"organize events"} src={OrganizeEventsImage} width="100%" className={classes.featureImage}/>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.featureRow}>
                                <Grid xs={12} sm={8} item>
                                    <Typography variant="h3">Your VTCs own Forum</Typography>
                                    <Typography variant="h5" className={classes.featureDescription}>
                                        Every VTC can have their own forum where you can post news about your VTC, where all employees can discuss on topics about 
                                        trucking, where your employees can get support and help with their problems.
                                    </Typography>
                                </Grid>
                                <Grid xs={12} sm={4} item className={classes.featureImageWrapper}>
                                    <img alt={"forum"} src={ForumImage} width="100%" className={classes.featureImage}/>
                                </Grid>
                            </Grid>
                            <Typography align="center" variant="h5">And many more features to explore...</Typography>
                        </ThemeProvider>                        
                    </Container>
                </div>
                {/* PRICING */}
                <div className={classes.pricingSectionWrapper}>
                    <Container maxWidth="md" component="main">
                        <ThemeProvider theme={theme}>
                            <Typography variant="h3" align="center" className={classes.pricingTitle}>VTC Pricing</Typography>
                        </ThemeProvider>
                        <Grid container spacing={5} alignItems="flex-end">
                        {tiers.map(tier => (
                            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                            <Card>
                                <CardHeader
                                title={tier.title}
                                subheader={tier.subheader}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                action={tier.title === 'Standard' ? <Icon component={Star} /> : null}
                                className={classes.cardHeader}
                                />
                                <CardContent>
                                <div className={classes.cardPricing}>
                                    <Typography component="h2" variant="h3" color="textPrimary">
                                    ${tier.price}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary">
                                    /mo
                                    </Typography>
                                </div>
                                <ul>
                                    {tier.description.map(line => (
                                    <Typography component="li" variant="subtitle1" align="center" key={line}>
                                        {line}
                                    </Typography>
                                    ))}
                                </ul>
                                </CardContent>
                                <CardActions>
                                <Button fullWidth variant={tier.buttonVariant} className={(tier.title === "Standard") ? classes.pricingButtons : classes.pricingButtonsAlt}>
                                    {tier.buttonText}
                                </Button>
                                </CardActions>
                            </Card>
                            </Grid>
                        ))}
                        </Grid>
                        <ThemeProvider theme={theme}>
                            <Typography align="center" className={classes.pricingDescriptionDown}>
                                NOTE: This pricing only applies to VTCs. If you are just a regular user who is not running a VTC, it is completely FREE!
                            </Typography>
                        </ThemeProvider>
                    </Container>
                </div>          

                <Container maxWidth="md" component="footer" className={classes.footer}>
                    <Grid container spacing={4} justify="space-evenly">
                    {footers.map(footer => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            {footer.title}
                        </Typography>
                        <ul>
                            {footer.description.map(item => (
                            <li key={item}>
                                <Link href="#" variant="subtitle1" color="textSecondary">
                                {item}
                                </Link>
                            </li>
                            ))}
                        </ul>
                        </Grid>
                    ))}
                    </Grid>
                    <Box mb={3}>
                        <Copyright />
                    </Box>
                </Container>

            </div>
        )
    }
}

export default withStyles(styles)(HomeScreen);