import { Button } from "@mantine/core";

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