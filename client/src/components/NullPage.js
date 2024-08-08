import { Container,Text } from "@mantine/core";
import { IconNetworkOff } from "@tabler/icons-react";

const NullPage = ()=>{

    return(
        <Container>
            <IconNetworkOff size={100}/>
            <Text>
                Attenzione nessun evento trovato.                
            </Text>
        </Container>
    )
}
export default NullPage;