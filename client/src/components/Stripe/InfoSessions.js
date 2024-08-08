import { Button } from "@mantine/core";
import {loadStripe} from '@stripe/stripe-js';

const InfoSessions = ({id_session,stripe})=>{
    
    const infoSession=()=>{
        stripe.initCustomCheckout({
            clientSecret: id_session,
          }).then(function (checkout) {
            var session = checkout.session();

            console.log(session,"SESSION PAGAMENTO");
          });
    }

    return (
        <Button onClick={infoSession}>info</Button>
    )




}
export default InfoSessions;