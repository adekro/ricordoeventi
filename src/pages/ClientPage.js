import React,{useState} from "react";
import { Button, Container, FileButton,Text } from "@mantine/core";
import ListDoc from "../components/ListDoc";
import { createClient } from '@supabase/supabase-js'

const ClientPage = ({event}) => {

    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)
    const [loading,setLoading] = useState(false)

    const uploadFile =(evt)=>{
        console.log(evt)
        const form_data = new FormData();
        form_data.append('name_camera',evt);
        uplFile(evt)
    }

    // Upload file using standard upload
    const uplFile = async (file) =>{
        setLoading(true)
        const { data, error } = await supabase.storage.from('ricordoeventi').upload(`${event}/${file.name}`, file)
        if (error) {
            // Handle error
            console.log(error)
        } else {
            // Handle success
            console.log(data)
            
        }
        setLoading(false)

    }

    return (    
        <Container>              
        <ListDoc event={event} loading={loading}  />
        <FileButton onChange={uploadFile} accept="image/png,image/jpeg" >
            {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
        </Container>

     
    )
    
};
export default ClientPage;
