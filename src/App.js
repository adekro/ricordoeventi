import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import "./App.css";
import Test from "./pages/Test";

const App = () => {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Test></Test>
      </SignedIn>
    </header>
  );
};

export default App;
