import React from "react";
import { Card,Center,Image,Container,Group,Text, Button } from "@mantine/core";
import {
    SignInButton,
    
  } from "@clerk/clerk-react";


const LandingPage = ()=>{



    return (
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
    )
}
export default LandingPage;