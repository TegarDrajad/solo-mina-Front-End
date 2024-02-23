import { Box, Flex, Heading, Select, Text, DatePicker, Input, TableContainer, Wrap, Table, Thead, Tr, Th, Tbody, Td, Button} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar"
import Footer from "../../components/Footer";


const SalesInformation = () => {
    
    return(
        <>
            
            <Box bgColor={"#F5F7FA"} bgSize={"cover"} height={"100vh"} display={"flex"}>
                <Sidebar/>

                <Box margin={"50px"} width={"7xl"} display={"flex"} flexDirection={"column"} marginLeft={"280px"}>
                    
                    <Box marginLeft={"10px"} marginTop={"20px"} >
                        <Heading>Sales Information</Heading>
                    </Box>

                    <Box padding={"30px"} display={"flex"} flexDirection={"column"} bgColor={"#FFFFFF"} borderRadius={"30px"} marginTop={"40px"} minHeight={"75vh"}>
                        <Flex flexDir={"row"} gap={5}>
                            <Box width={"190px"}>
                                <Text marginBottom={"15px"}>Customer</Text>
                                <Select variant={"outline"} placeholder="Name"></Select>
                            </Box>

                            <Box width={"190px"}>
                                <Text marginBottom={"15px"}>Date</Text>
                                <Input type="date" placeholder="Date"></Input>
                            </Box>

                            <Box width={"190px"}>
                                <Text marginBottom={"15px"}>Status</Text>
                                <Select variant={"outline"} placeholder="Status"></Select>
                            </Box>
                        </Flex>

                        <Box bgColor={"whitesmoke"} boxSize={"6xl"} marginTop={"10px"} borderRadius={"20px"} marginLeft={"10px"}>
                            <TableContainer>
                                <Table variant={"simple"}>
                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>Date</Th>
                                            <Th>Customer</Th>
                                            <Th>Fish Name</Th>
                                            <Th>Total Product</Th>
                                            <Th>Total Price</Th>
                                            <Th>Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>1</Td>
                                            <Td>20/11/2022</Td>
                                            <Td>Parno</Td>
                                            <Td>Nila</Td>
                                            <Td>20kg</Td>
                                            <Td>2.000.000</Td>
                                            <Td>Paid</Td>                                  
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>    
                    </Box>
                </Box>
            </Box>   
        
        </>
    )
};

export default SalesInformation;