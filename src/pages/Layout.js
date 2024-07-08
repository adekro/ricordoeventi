import React, { useState, useEffect,useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { SignIn, useUser,UserButton } from "@clerk/clerk-react";
import { Box, Button,Card,Center,Container,Flex,Input,List,ListItem,Paper,Text } from "@mantine/core";
import {createStyles} from "@mantine/emotion"
import ClientPage from "./ClientPage"
import AdminPage from "./AdminPage";
import {getQueryVariable} from "../utils/Uti"
import { IconPaywall, IconSearch, IconSettings } from "@tabler/icons-react";
import UserCongrats from "./UserCongrats";



const Layout = () => {
  const [userType, setUserType] = useState([]);

  const profilo = getQueryVariable("f");
  const pagamento = getQueryVariable("p");

  const [root,setRoot] = useState(pagamento==="success"?"pagamento":"clientpage");
  const [evento,setEvento] = useState(profilo===undefined?"":profilo)
  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
  );

  const useStyles = createStyles((theme) => ({
    top: {
      display:"flex",
      width:"100vw",
      flexDirection:"row",
      justifyContent:"left"
    },
    topleft:{
      display:"flex",
      width:"20%",
      justifyContent:"space-between",
      minWidth:"200px",
      padding:"10px"
    },
    topright:{
      display:"flex",
      width:"60%",
      justifyContent:"center",
      minWidth:"200px",
      padding:"10px"
    },
    container:{
      display:"flex"
    }
  }));


  const { user } = useUser();
  const {classes} = useStyles();

  useEffect(() => {
    getUserType();
  }, []);

  if (!user) {
    return <SignIn />;
  }
 
  async function getUserType() {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("user_id", user.id);
    setUserType(data);
  }

  const goAdmin = () =>{


  }

  const goPaypal = async ()=>{
    
    window.location.href=process.env.REACT_APP_URL_STRIPE;

    getUserType();

    
  }

  const eventBlur = (evt) =>{
    
    setEvento(evt.target.value) 
  }

  console.log(evento,"evento")



  return (
    <>
      <Box flex={true} className={classes.top}>
          <div className={classes.topleft}>
            <UserButton />
            {userType[0]?.user_type === 10 && <Button variant="filled" onClick={goAdmin}><IconSettings size={20} /> AREA ADMIN</Button>}
            {userType[0]?.user_type !== 10 && <Button variant="filled" onClick={goPaypal}><IconPaywall size={20} /></Button>}
          </div>
          <div className={classes.topright}>
            <Text>{evento}</Text>
          </div>
      </Box>
      <Paper shadow="xl" p="xl" withBorder >
        {root==="pagamento"?<UserCongrats />:null}
        {evento===""?<Container>
                      <div className={classes.container}>
                       <Input placeholder="Insert event code" onBlur={eventBlur} ></Input>
                       <Button><IconSearch size={20} /></Button>
                      </div>
                     </Container>
        :root==="clientpage"?<ClientPage event={evento} />:null}
        {root==="adminpage"?<AdminPage />:null}
      </Paper>
    </>
  );
};
export default Layout;
