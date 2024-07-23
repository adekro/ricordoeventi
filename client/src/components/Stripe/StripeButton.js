import React, {useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import InfoSessions from './InfoSessions';
import './commons.css';
import { Button } from '@mantine/core';

const stripePromise = loadStripe('pk_test_51PdRGjFBu9R50VXtzxZEfnumXuL8iWV39jJK5Y1dpHOg7Q003lrHKmLXkghTkIIQNFfyohgNjjO5FblmeiyrPqaR00AbDa5ih9');

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

const StripeButton = () => {


  return (
    <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
      <ElementsConsumer>
      {({stripe, elements}) => (
        <> <Button onClick={()=>{

                    stripe.initCustomCheckout({
                      clientSecret: "cs_test_a1xJM4BgGI9RER5voUXnCmY11dk0xDBVPGJFtenP3qzS26S312N2gcNgbP",
                    }).then(function (checkout) {
                      var session = checkout.session();
              
                      console.log(session,"SESSION PAGAMENTO");
                   });
        }}>info</Button>
        <CheckoutForm stripe={stripe} elements={elements}/></>
        
        )}
      </ElementsConsumer>
      
    </Elements>
  );
};


export default StripeButton


