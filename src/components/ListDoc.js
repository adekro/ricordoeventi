import React,{useEffect, useState} from "react"
import { Card, Container, Divider, Image } from "@mantine/core"
import { createClient } from '@supabase/supabase-js'
import classes from "../pages/page.module.css"
const ListDoc =  ({event,loading}) =>{
    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)
    const [list,setList] = useState(null);

    const readFile = async () =>{
         const { data, error } =  await supabase.storage.from('ricordoeventi').list(event)
         setList(data)
    }

    const getUrlFile = (nomeFile)=>{
        const { data } = supabase.storage.from('ricordoeventi').getPublicUrl(event+"/"+nomeFile)
        console.log(data.publicUrl)
        return(data.publicUrl)

    }

    useEffect(()=>{
        readFile()
    },[loading])

       
    
    console.log(list)
    return(
        <Container>
            {list?.map(item=>{
                return <>
                <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.margintop10} >
                    <Card.Section>
                        <Image
                            src={getUrlFile(item.name)}
                            
                        />
                    </Card.Section>
                </Card>
               
                </>        
            })}
            </Container>
        
    )
}
export default ListDoc