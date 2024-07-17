import React, { useState, useEffect,useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { SignIn, useUser,UserButton } from "@clerk/clerk-react";
import { Box, Button,Card,Center,Container,Flex,Input,List,ListItem,Paper,Text } from "@mantine/core";
import {createStyles} from "@mantine/emotion"
import ClientPage from "./ClientPage"
import AdminPage from "./AdminPage";
import {getQueryVariable} from "../utils/Uti"
import { IconLogin, IconPaywall, IconSearch, IconSettings } from "@tabler/icons-react";
import UserCongrats from "./UserCongrats";

const Layout = ({event}) => {
  const [userType, setUserType] = useState([]);

  console.log(event,"event -xx-");

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

/*   if (!user) {
    return <SignIn />;
  } */
 
  async function getUserType() {
    if (!user) {
      setUserType(-1);
    }else{
      const { data } = await supabase
      .from("users")
      .select()
      .eq("user_id", user.id).single();

      setUserType(data?.user_type);

    }
    

    
    

  }

  const goAdmin = () =>{
    setRoot((prec)=>{return prec==="adminpage"?"":"adminpage"});

  }

  const goLogin = () =>{
    setRoot("login");

  }

  const goPaypal = async ()=>{
    
    window.location.href=String(process.env.REACT_APP_URL_STRIPE).replace("{userid}",user.id);

    getUserType();

    
  }

  return (
    <>
      <Box flex={true} className={classes.top}>
          <div className={classes.topleft}>
            {!user?
            <Button variant="filled" onClick={goLogin}><IconLogin size={20} /> Login</Button>
            :<><UserButton />
            
            {userType === 10 && <Button variant="filled" onClick={goAdmin}><IconSettings size={20} /> AREA ADMIN</Button>}
            {userType !== 10 && <Button variant="filled" onClick={goPaypal}><IconPaywall size={20} /></Button>}
            </>
          }
          </div>
          <div className={classes.topright}>
            <Text>{event?.event_name}</Text>
          </div>
      </Box>
      <Paper shadow="xl" p="xl" withBorder >
        {root==="pagamento"?<UserCongrats />:null}
        {root==="adminpage"?<AdminPage />:root==="login"?<Center><SignIn /></Center>:<ClientPage event={evento} />}
    

      </Paper>
    </>
  );
};
export default Layout;
