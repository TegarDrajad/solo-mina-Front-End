import { Box, Flex, Text, Center, Image, Heading } from "@chakra-ui/react";
import NavBar from "../../components/Navigasi";
import Footer from "../../components/Footer";
import income from "../../assets/income.png";
import notPaid from "../../assets/outcome.png";
import alreadyPaid from "../../assets/incomeblue.png";
import Sidebar from "../../components/Sidebar";

const Home = () => {
    
    return(
        <>
            <Box bgColor={"#F5F7FA"} bgSize={"cover"} height={"100vh"} display={"flex"}>

                <Sidebar/>  

                <Box margin={"50px"} width={"7xl"} height={{base: "120%", md: "90%"}} marginBottom={"2%"}  display={"flex"} flexDirection={"column"} marginLeft={"280px"}> 
                    
                    <Box>
                        <Heading marginLeft={"10px"} marginTop={"20px"}>Dashboard</Heading>
                    </Box>

                    <Box padding={"30px"} bgColor={"#FFFFFF"} width={{base: "90%", md: "100%"}} height={{base: "120%", md: "90%"}} borderRadius={"2xl"} marginTop={"40px"}>
                        <Center fontSize={"3xl"} fontWeight={"semibold"} paddingTop={"50px"}>Income Information Daily</Center>

                        <Flex direction={{base: "column", md: "row"}} justifyContent={"space-between"} marginTop={{base: "4", md: "8"}} marginLeft={{base: "4", md: "8"}} marginRight={{base: "4", md: "8"}}>
                            <Box bgColor={"#F5F7FA"} width={{base: "100%", md: "30%"}} height={{base: "150px", md: "100px"}} borderRadius={"20px"} display={"flex"} marginBottom={{base: "4", md: "0"}}>
                                <Image src={income} width={"76px"} height={"76px"} marginTop={"10px"} marginLeft={"20px"}/>
                                <Box marginTop={"25px"} marginLeft={"20px"}>
                                    <Text fontWeight={"semibold"} fontSize={{base: "xl", md: "2xl"}}>Total Income</Text>
                                    <Text fontWeight={"medium"} fontSize={{base: "md", md: "lg"}}>XXXXXXXXXX</Text>
                                </Box>
                            </Box>

                            <Box bgColor={"#F5F7FA"} width={{base: "100%", md: "30%"}} height={{base: "150px", md: "100px"}} borderRadius={"20px"} display={"flex"} marginBottom={{base: "4", md: "0"}}>
                                <Image src={notPaid} width={"76px"} height={"76px"} marginTop={"10px"} marginLeft={"20px"}/>
                                <Box marginTop={"25px"} marginLeft={"20px"}>
                                    <Text fontWeight={"semibold"} fontSize={{base: "xl", md: "2xl"}}>Not Yet Paid</Text>
                                    <Text fontWeight={"medium"} fontSize={{base: "md", md: "lg"}}>XXXXXXXXXX</Text>
                                </Box>
                            </Box>      

                            <Box bgColor={"#F5F7FA"} width={{base: "100%", md: "30%"}} height={{base: "150px", md: "100px"}} borderRadius={"20px"} display={"flex"} marginBottom={{base: "4", md: "0"}}>
                                <Image src={alreadyPaid} width={"76px"} height={"76px"} marginTop={"10px"} marginLeft={"20px"}/>
                                <Box marginTop={"25px"} marginLeft={"20px"}>
                                    <Text fontWeight={"semibold"} fontSize={{base: "xl", md: "2xl"}}>Already Paid</Text>
                                    <Text fontWeight={"medium"} fontSize={{base: "md", md: "lg"}}>XXXXXXXXXX</Text>
                                </Box>
                            </Box>   
                        </Flex>
                    </Box>
                </Box>    
            </Box>   
        </>
    )
};

export default Home;