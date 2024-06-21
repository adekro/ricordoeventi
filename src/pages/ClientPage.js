import React,{useState} from "react";
import { LoadingOverlay,Button, Container, FileButton,Text, Center, Divider } from "@mantine/core";
import ListDoc from "../components/ListDoc";
import { createClient } from '@supabase/supabase-js'
import classes from "./page.module.css"

const ClientPage = ({event}) => {

    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)
    const [loading,setLoading] = useState(false)


    const uploadFile =(evt)=>{
        setLoading(true)
        const form_data = new FormData();
        form_data.append('name_camera',evt);
        uplFile(evt)
        
    }

    // Upload file using standard upload
    const uplFile = async (file) =>{
       
        const { data, error } = await supabase.storage.from('ricordoeventi').upload(`${event}/${file.name}`, file)
        if (error) {
            // Handle error
            console.log(error)
        } else {
            // Handle success
            console.log(data)
            setLoading(false)
            
        }
        

    }

    return (    
        <Container>  
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2, bottom:0,top:0}} />            
        <Center className={classes.margintop10}>
            <FileButton onChange={uploadFile} accept="image/png,image/jpeg" >
                {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
        </Center>
        <ListDoc event={event} loading={loading}  />
        </Container>

     
    )
    
};
export default ClientPage;
