import React,{useEffect, useState, useRef} from "react"
import { Button, Card, Container, Divider, Image, Modal, Portal,Text,TextInput } from "@mantine/core"
import { createClient } from '@supabase/supabase-js'
import classes from "../pages/page.module.css"
import { useUser} from "@clerk/clerk-react";
import useClerkSupabase from "../hooks/useClerkSupabase";
import { IconX,IconAlertTriangle } from "@tabler/icons-react";

const ListDoc =  ({event,loading}) =>{
    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)
    const [list,setList] = useState(null);
    const [openDeleteAnswer,setOpenDeleteAnswer] = useState(false);
    const [deleteId,setDeleteId] = useState(null);
    const delEvent = useRef();
    
    const { user } = useUser();
    const {getUserId} = useClerkSupabase(user?.id);

    const isVip=(user?true:false);

    const readFile = async () =>{
         const { data, error } =  await supabase.from('events_memory')
         .select("*")
         .eq("event_id",event)
         .order("created_at",{ascending:false})
         
         setList(data)
    }

    const getUrlFile = (nomeFile)=>{
        const { data } = supabase.storage.from('ricordoeventi').getPublicUrl(nomeFile)
        console.log(data.publicUrl)
        return(data.publicUrl)

    }

    const deleteAnswer = (item) =>{
        setDeleteId(item);
        setOpenDeleteAnswer(true);
    }
    const closeDeleteAnswer = () =>{
        setDeleteId(null);
        setOpenDeleteAnswer(false);
    }
    const confirmDeleteEvent = async ()=>{

        console.log("eliminaRicordo")
        
        if(delEvent.current.value==="eliminaricordo"){


            const { data, error:errsel } = await supabase.from('events_memory').delete().eq('id',deleteId.id);

            if (deleteId.type==1){
                const { error } = await supabase.storage.from('ricordoeventi').remove([`${deleteId.memory}`])
                if (error) {
                    // Handle error
                    console.log(error,"ERROR DELETE")
                }
            }

            readFile();
            
            setDeleteId(null);
            setOpenDeleteAnswer(false)
        }    
    }

    useEffect(()=>{
        readFile()
    },[loading])

      
    return(
        <Container>
            {list?.map(item=>{
                return <>
                <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.margintop10} >
                    {isVip?<Button onClick={()=>deleteAnswer(item)}><IconX /></Button>:null}
                    <Card.Section>
                        {item.type==1?
                        <Image
                            src={getUrlFile(item.memory)}
                            
                        />:
                        <Text>
                            {item.memory}
                        </Text>
                        }
                    </Card.Section>
                </Card>
               
                </>        
            })}
            <Portal>
                <Modal opened={openDeleteAnswer} onClose={closeDeleteAnswer} title="Eliminazione Ricordo">
                    <Text>Vuoi cancellare definitivamente il tuo ricordo? scrivi "eliminaricordo" qui sotto per procedere con l'eliminazione</Text>
                    <TextInput id="testElimina" ref={delEvent}></TextInput>
                    <Button onClick={confirmDeleteEvent}><IconAlertTriangle /></Button>
                </Modal>
            </Portal>
            </Container>
        
    )
}
export default ListDoc