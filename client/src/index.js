import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ClerkProvider } from "@clerk/clerk-react";
import {createTheme, MantineProvider  } from "@mantine/core";
import { MantineEmotionProvider } from "@mantine/emotion";
import '@mantine/core/styles.css';

const myColor = [
  '#eef3ff',
  '#dce4f5',
  '#b9c7e2',
  '#94a8d0',
  '#748dc1',
  '#5f7cb8',
  '#5474b4',
  '#44639f',
  '#39588f',
  '#2d4b81'
];
const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    myColor,
  }
});

// Import your publishable key
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <MantineProvider>
        <MantineEmotionProvider theme={theme}>
        <App />
        </MantineEmotionProvider>
      </MantineProvider>
    </ClerkProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
