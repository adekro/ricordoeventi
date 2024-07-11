import { Button, Container,Flex,Modal,Portal,Table,Text, TextInput } from "@mantine/core";
import { IconAlarm, IconAlertTriangle, IconEdit, IconPdf, IconPlus, IconQrcode, IconX } from "@tabler/icons-react";
import React,{useState,useRef,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
import { useUser} from "@clerk/clerk-react";
import useClerkSupabase from "../hooks/useClerkSupabase";
import {createStyles} from "@mantine/emotion"
import { QRCodeSVG } from "qrcode.react";


const AdminPage = () => {
    const { user } = useUser();
    const {getUserId} = useClerkSupabase(user.id);
    const [listEvent,setListEvent] = useState([]);
    const [editNameEvent,setEditNameEvent] = useState({name:"",id:""});
    const [openAddEvent,setOpenAddEvent]=useState(false)
    const [openDeleteEvent,setOpenDeleteEvent]=useState(false)
    const [openQrCodeEvent,setOpenQrCodeEvent]=useState(false)
    const useStyles = createStyles((theme) => ({
        flex:{
            display:"flex",
            justifyContent:"space-between",
            padding:"10px"
        },
    }));
    
    const supabase = createClient(
        process.env.REACT_APP_SUPABASE_URL,
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );


    const nameEvent = useRef();
    const delEvent = useRef();

    const {classes} = useStyles();

    const openEvent =(edit)=>{

        

        if(edit===""){
            setEditNameEvent({name:"",id:""})
        }else{
            setEditNameEvent({name:listEvent.filter((item)=>item.id===edit)[0].event_name,id:edit})
        }

        setOpenAddEvent(true);
    }
    const editEvent = async ()=>{
        const iduser= await getUserId();
        const {data,error}=await supabase.from("events")
        .update({event_name:nameEvent.current.value})
        .eq("id",editNameEvent.id)
        .select();

        loadGrid();

        setOpenAddEvent(false);
    }
    const deleteEvent = async ()=>{
     
        setOpenDeleteEvent(true)
     
    }
    const confirmDeleteEvent = async ()=>{

        if(delEvent.current.value==="eliminaevento"){
            const iduser= await getUserId();
            const {data,error}=await supabase.from("events")
            .delete()
            .eq("id",editNameEvent.id)
    
            loadGrid();
            setOpenAddEvent(false);
            setOpenDeleteEvent(false)
        }       

       
    }


    const generaPdfQrcode = (idEvent) =>{

        alert(idEvent)

    }
 

    const addEvent =async ()=>{
        
        const iduser= await getUserId();

        const {data,error}=await supabase.from("events").insert({user_admin:iduser,event_name:nameEvent.current.value}).select();

        loadGrid();

        setOpenAddEvent(false);
    }

    const rows = listEvent?.map((element) => (
        <Table.Tr key={element.id}>
          <Table.Td>{element.event_name}</Table.Td>
          <Table.Td><Button onClick={()=>{openEvent(element.id)}}><IconEdit /></Button></Table.Td>
          <Table.Td><Button onClick={()=>{generaPdfQrcode(element.id)}}><IconQrcode /></Button></Table.Td>
        </Table.Tr>
      ));

      const loadGrid=async ()=>{
        const iduser= await getUserId();

        const {data,error}=await supabase.from("events")
        .select("*")
        .eq("user_admin",iduser);
        setListEvent(data);

      }
      const generaQrcodePdf=()=>{

      }
    
      useEffect(()=>{

        loadGrid()

      },[])


    return(
    <Container>
        <QRCodeSVG value="https://reactjs.org/" />
        <Table>
            <Table.Thead>
            <Table.Tr>
            <Table.Th>i tuoi eventi</Table.Th>
            <Table.Th><Button onClick={()=>{openEvent("")}}><IconPlus /></Button></Table.Th>            
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Portal>
        <Modal opened={openAddEvent} onClose={setOpenAddEvent} title="Dai un nome al tuo evento" >
            <TextInput id="nameevent" ref={nameEvent} placeholder="dai un nome al tuo evento" defaultValue={editNameEvent.name} />
            {editNameEvent.id===""?<Button onClick={addEvent}><IconPlus /></Button>:
            <div className={classes.flex}>
                <Button onClick={editEvent}><IconEdit /></Button>
                <Button onClick={deleteEvent}><IconX /></Button>
            </div>}
            
        </Modal>
        <Modal opened={openDeleteEvent} onClose={setOpenDeleteEvent} title="ATTENZIONE! eliminazione evento" >
                        
            
                <Text>Vuoi cancellare definitivamente il tuo evento? tutte le immagini caricate verranno perse, scrivi "eliminaevento" qui sotto per procedere con l'eliminazione</Text>
                <TextInput id="testElimina" ref={delEvent}></TextInput>
                <Button onClick={confirmDeleteEvent}><IconAlertTriangle /></Button>
            
            
        </Modal>

        </Portal>
    </Container>
    )
};
export default AdminPage;
