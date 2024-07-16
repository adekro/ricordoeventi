import React,{useEffect,useState} from "react";
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


const App = () => {

  const profilo = getQueryVariable("f");
  const [event,setEvent]=useState("");

  const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)

  const checkEvent= async ()=>{
    const { data, error } = await supabase.from('events').select('*')
    .eq("id",profilo);

    setEvent(data?.data);

  }

  useEffect(()=>{
    if(profilo){
      checkEvent();
    }
  },[profilo])

  return (
    
        <div>
          {event!==""?
          <Layout event={event} />:
          <>
            <SignedOut>
              <LandingPage />
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
