import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import "./App.css";
import Layout from "./pages/Layout";
import { Card, Center, Container,Group,Image ,Text} from "@mantine/core";

const App = () => {
  return (
    <header>
      <SignedOut>
        <Center>
          <Card shadow="sm" padding="lg" radius="md" withBorder w={400}>
            <Card.Section>
              <Image src="https://picsum.photos/700" height={400}  />
            </Card.Section>
            <Container color="blue" fullWidth mt="md" radius="md">
              <Group>
              <Text>ricordo eventi</Text>
              <SignInButton />
              </Group>
              
            </Container>
            
          </Card>
          </Center>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Layout />
      </SignedIn>
    </header>
  );
};

export default App; 
