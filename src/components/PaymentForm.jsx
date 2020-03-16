import React, {useState} from 'react';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from 'axios';
import {Grid} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Typography from "@material-ui/core/Typography";
import {ROOT_API} from '../api_endpoint';

function PaymentForm(props) {

    const stripe = useStripe();
    const elements = useElements();

    const _handleSubmit = async event => {
      event.preventDefault();

      if(!stripe || !elements) {
          return;
      }

      const cardElement = elements.getElement(CardElement);

      stripe.createToken(cardElement).then((token) => {
          axios.post(`${ROOT_API}/v1/subscription`, {token: token, plan_id: props.selectedPlan}, {
              headers: {
                  'Authorization': `Bearer ${props.userToken}`
              }
          }).then(res => {
              console.log(res.data);
          })
      });
    };

    if(props.selectedPlan === 0) {

        return (
         <div>
             You are using FREE plan so you don't need to add your card for now.
         </div>
        )

    } else {

        return (
            <div style={{width: "80%"}}>
                <form onSubmit={_handleSubmit}>
                    <Grid container justify={"center"}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant={"h6"} style={{marginBottom: "15px"}}>Card Details</Typography>
                            <CardElement/>
                        </Grid>
                    </Grid>
                    <Button style={{backgroundColor: "#27ae60", color: "white", marginTop: "15px"}} type={"submit"} disabled={!stripe}>Pay</Button>
                </form>
            </div>
        )

    }
}

export default PaymentForm;