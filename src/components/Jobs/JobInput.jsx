import React from 'react'
import { Typography, TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    inputLabel: {
        "&$cssFocused": {
          color: "grey",
        },
      },
      textOutlineInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `#000 !important`,      
        }
      },
      cssFocused: {},
      notchedOutline: {
        borderWidth: '1px',    
      },
}))

export default function JobInput(props) {

    const classes = useStyles()

    return (
        <div style={props.style}>
            <Typography variant="h6" style={{marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center"}}>
                {props.icon} <span style={{marginLeft: 10}}>{props.title}</span>
            </Typography>
            <b style={{color: "grey"}}>{props.extraMessage}</b>

            <TextField                  
            name="money_made"
            variant="outlined"
            value={props.value}
            multiline={props.multiline}
            rows={props.rows}
            onChange={(e) => props.setValue(e.target.value) }
            required
            fullWidth                    
            label={props.label}            
            color="primary"
            style={{marginTop: 15}}
            type={props.type}
            id="validation-outlined-input"
            InputLabelProps={{
                classes: {      
                root: classes.inputLabel,                                                          
                focused: classes.cssFocused,
                },
            }}
            InputProps={{
                classes: {
                root: classes.textOutlineInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                },                    
            }}
            />
        </div>
    )
}