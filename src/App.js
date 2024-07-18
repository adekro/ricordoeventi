import React,{useEffect,useState} from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import CookieConsent, { Cookies } from "react-cookie-consent";

import "./App.css";
import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import { getQueryVariable } from "./utils/Uti";
import { createClient } from '@supabase/supabase-js'
import UserCongrats from "./pages/UserCongrats";




const App = () => {

  const profilo = getQueryVariable("f");
  const pagamento = getQueryVariable("p");
  const idpagamento = getQueryVariable("idu");
  const [event,setEvent]=useState("");

  const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)

  const checkEvent= async ()=>{
    const { data, error } = await supabase.from('events').select('*').single()
    .eq("id",profilo);

    console.log(data)

    if(data){
      setEvent(data);
    }
    

  }

  useEffect(()=>{
    if(profilo){
      checkEvent();
    }
  },[profilo])

  return (
        <div>
        {pagamento==="success"?
        <div>
          {idpagamento}
          <UserCongrats idPagamento={idpagamento} /> 
        </div>      
        :<>        
            <SignedOut>
              {event?
                <Layout event={event} />:
                <LandingPage />
              }
            </SignedOut>
            <SignedIn>
              <Layout />
            </SignedIn>
            </>
         }  
          <CookieConsent enableDeclineButton location="bottom"
            buttonText="Only necessary"
            onDecline={() => {
              alert("Attenzione alcune funzionalità saranno disabilitate");
            }}
            expires={150}>You are in control of your cookies. On our website we use strictly necessary (to ensure our site works properly), analytical (tells us how the site is used), functional (user preferences) cookies.
          </CookieConsent>
        </div>

      );    
  
};

export default App; 
