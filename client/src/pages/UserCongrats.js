import React,{useEffect} from "react";
import { Button, Container,Text } from "@mantine/core";
import { createClient } from "@supabase/supabase-js";
import { SignIn, useUser,UserButton } from "@clerk/clerk-react";
import StripeButton from "../components/Stripe/StripeButton";

const UserCongrats = ({idPagamento})=>{
    const { user } = useUser();
    const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
    ); 


    const insertUser = async () => {
        if(user?.id){
            const {data,error}=await supabase.from("users").insert({user_id:user.id,user_type:10}).select();
        }
        
    }

    

  useEffect(()=>{
    insertUser();
  },[]);

    
    return(
        <Container>
            <Text>
                Pagamento avvenuto con successo
                <Button onClick={()=>{document.location.href=document.location.href.split("?")[0]}}>torna alla home</Button>
                
                <StripeButton />
            </Text>
        </Container>
    );
}
export default UserCongrats;