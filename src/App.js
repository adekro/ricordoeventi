import React from "react";
import {
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import CookieConsent, { Cookies } from "react-cookie-consent";

import "./App.css";
import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";


const App = () => {

  return (
    
        <div>
          <SignedOut>
            <LandingPage />
          </SignedOut>
          <SignedIn>
            <Layout />
          </SignedIn>
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
