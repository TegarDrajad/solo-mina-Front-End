import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import NavBar from "../components/Navigasi";
import Footer from "../components/Footer";


const About = () => {
    
    return(
        <>
        <NavBar/>
        <Box h={"100vh"} bgColor={"#F5F7FA"} bgSize={"cover"}>
            <Flex gap={"10"} paddingTop={"170px"} flexDirection={"column"} paddingLeft={"80px"} paddingRight={"80px"}>
                <Heading fontWeight={"bold"} fontSize={"40px"}>~ WHO WE ARE</Heading>

                <Heading fontWeight={"semibold"} fontSize={"xl"}>We Help To Get You Well.</Heading>

                <Text fontWeight={"medium"} fontSize={"xl"}>Solo Mina is a supplier of fresh fish for consumption located in Solo, Central <br/>
                    Java. Solo Mina plays an important role in supplying high quality fresh fish <br/>
                    both within the city and outside the city. With a focus on quantity, quality <br/>
                    and timeliness.
                </Text>

                <Text fontWeight={"medium"} fontSize={"xl"}>
                Solo Mina has built a strong reputation as a trusted fish provider in the Solo <br/>
                area and surrounding areas. With various types of fresh fish provided, Solo <br/>
                Mina has become one of the main sources for fish food enthusiasts who <br/>
                appreciate the quality and freshness of fish in their dishes. <br/>
                </Text>
            </Flex>
        </Box>   
        <Footer/> 
        </>
    )
};

export default About;