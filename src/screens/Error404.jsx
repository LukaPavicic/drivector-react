import React from 'react';
import Typography from "@material-ui/core/Typography";
import Image404 from '../img/404img.jpg'
import Button from "@material-ui/core/Button";
import LogoWhiteWide from '../img/logowhitewide.png'
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from "@material-ui/core/styles";

export default function Error404(props) {

    let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);

    return (
        <div style={{width: "100%", height: "100vh", display: "flex",flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${Image404})`, textAlign: "center"}}>
            <ThemeProvider theme={theme}>
                <img src={LogoWhiteWide} alt={"logo"} width={"40%"}/>
                <Typography style={{color: "white"}} variant={"h2"}>404 Not Found</Typography>
                <Typography variant={"h4"} style={{color: "white"}}>You got lost.</Typography>
                <Button href={"/"} variant={"contained"} style={{color: "white", backgroundColor: "#27ae60", marginTop: "10px"}}>GO BACK TO HOMEPAGE</Button>
            </ThemeProvider>
        </div>
    )
}