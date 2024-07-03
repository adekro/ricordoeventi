import React from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import "./App.css";
import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <header>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <Layout />
      </SignedIn>
    </header>
  );
};

export default App; 
