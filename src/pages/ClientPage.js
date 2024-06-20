import { Button, Container, FileButton } from "@mantine/core";
import React from "react";
import ListDoc from "../components/ListDoc";

const ClientPage = () => {

    const uploadFile =(evt)=>{
        console.log(evt)

    }

    return (    
        <Container>
        <ListDoc />

      
        <FileButton onChange={uploadFile} accept="image/png,image/jpeg" >
            {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
        </Container>

     
    )
    
};
export default ClientPage;
