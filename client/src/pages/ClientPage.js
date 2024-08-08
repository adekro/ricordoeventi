import React,{useState,useEffect,useRef, memo} from "react";
import { LoadingOverlay,Button, Container, FileButton,Text, Center, Divider, Portal, Modal, TextInput, Textarea } from "@mantine/core";
import ListDoc from "../components/ListDoc";
import { createClient } from '@supabase/supabase-js'
import classes from "./page.module.css"
import NullPage from "../components/NullPage";
import { useUser} from "@clerk/clerk-react";
import useClerkSupabase from "../hooks/useClerkSupabase";
import { IconPencil } from "@tabler/icons-react";

const ClientPage = ({event}) => {

    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)
    const [loading,setLoading] = useState(false);
    const [checkEvent,setCheckEvent] = useState(false);
    const [openMemory,setOpenMemory] = useState(false);
    const { user } = useUser();
    const {getUserId} = useClerkSupabase(user?.id);

    const memoRef=useRef();

    const enabledEvent=async()=>{
        const { data, error } = await supabase.from('events').select('*').eq("id",event).eq("enabled",true).single();
        if(data){
            setCheckEvent(data.enabled);
        }
    }

    const uploadFile =(evt)=>{
        setLoading(true)
        const form_data = new FormData();
        form_data.append('name_camera',evt);
        uplFile(evt)
    }

    // Upload file using standard upload
    const uplFile = async (file) =>{

        const unicName=new Date().getTime() + "" + parseInt(Math.random()*100);
        console.log(unicName,"QIOOOOO");
       
        const { data, error } = await supabase.storage.from('ricordoeventi').upload(`${event}/${unicName}`, file)
        if (error) {
            // Handle error
            console.log(error)
        } else {

            let userID =null;
            if(user){
                userID= await getUserId();
            }else{
                userID=null;
            }
   
            const { data, error } = await supabase.from('events_memory').insert({
                user_id:userID,
                event_id:event,
                memory:event+"/"+unicName,
                type:1
            }).select()
            if (error) {
                // Handle error
                console.log(error)
            } else {
                // Handle success
                console.log(data)
                setLoading(false)
            }
        }
    }

    const writeMemory = ()=>{
        setOpenMemory(true);
    }
    const saveMemory= async ()=>{
        setLoading(true);
        let userID =null;
        if(user){
            userID= await getUserId();
        }else{
            userID=null;
        }

        const { data, error } = await supabase.from('events_memory').insert({
            user_id:userID,
            event_id:event,
            memory:memoRef.current.value,
            type:2
        }).select()
        if (error) {
            // Handle error
            console.log(error)
        } else {
            // Handle success
            console.log(data)
            setOpenMemory(false);
            setLoading(false);
        }
    }

    useEffect(()=>{
        enabledEvent();
    },[]);

    return (    
        <Container>  
        {checkEvent?<>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2, bottom:0,top:0}} />            
        <Center className={classes.margintop10}>
            <FileButton onChange={uploadFile} accept="image/png,image/jpeg" >
                {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
            <Button onClick={writeMemory}>
                <IconPencil />                
            </Button>
        </Center>
        <ListDoc event={event} loading={loading}  />
        </>
        :
        <NullPage />
        }
        <Portal>
            <Modal opened={openMemory} onClose={setOpenMemory} title="Scrivi un dedica">
                <Textarea ref={memoRef}>

                </Textarea>
                <Button onClick={saveMemory}>Dedica!</Button>

            </Modal>
        </Portal>
        </Container>

     
    )
    
};
export default ClientPage;
