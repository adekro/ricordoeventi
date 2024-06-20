import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Box, Button,Card,Flex,List,ListItem,Paper } from "@mantine/core";
import ClientPage from "./ClientPage"
import AdminPage from "./AdminPage";
import {getQueryVariable} from "../utils/Uti"


const Layout = () => {
  const [userType, setUserType] = useState([]);
  const [root,setRoot] = useState("clientpage");
  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
  );

  const { user } = useUser();

  useEffect(() => {
    getUserType();
  }, []);

  if (!user) {
    return <SignIn />;
  }

  const profilo = getQueryVariable("f");

  console.log(user.id, "user");

  async function getUserType() {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("user_id", user.id);
    setUserType(data);
  }

  const goAdmin = () =>{

  }

  return (
    <>
      <Box flex={true}>
        <Flex mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap">
          {userType[0]?.user_type === 10 && <Button variant="filled" onClick={goAdmin}>AREA ADMIN</Button>}
          <label>{user.id}</label>
        </Flex>
        </Box>
        <Paper shadow="xl" p="xl" withBorder >
          {root==="clientpage"?<ClientPage event={profilo} />:null}
          {root==="adminpage"?<AdminPage />:null}
      </Paper>
    </>
  );
};
export default Layout;
