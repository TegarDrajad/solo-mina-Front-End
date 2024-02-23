import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select} from "@chakra-ui/react";
import SidebarSuperAdmin from "../../components/SidebarSuperAdmin";

const AddDataSaling = () => {
    return(
        <>
            <Box bgColor={"#F5F7FA"} bgSize={"cover"} height={"100vh"} display={"flex"}>
                <SidebarSuperAdmin/>

                <Box margin={"50px"} width={"7xl"} display={"flex"} flexDirection={"column"} marginLeft={"280px"}>

                    <Box marginLeft={"10px"} marginTop={"20px"} >
                        <Heading>Add Data Saling</Heading>
                    </Box>
                    
                    <Box padding={"30px"} bgColor={"#FFFFFF"} borderRadius={"30px"} marginTop={"30px"} minHeight={"75vh"}>
                        <FormControl isRequired width={"100%"}>
                            <Flex flexDir={"row"} gap={10}>
                                <Box width={"40%"}>
                                    <FormLabel>Date</FormLabel>
                                    <Input placeholder="Date" type="date" marginBottom={"20px"}></Input>

                                    <FormLabel>Customer</FormLabel>
                                    <Select placeholder="Select Cust Name" marginBottom={"20px"}>
                                        <option>Tegar</option>
                                    </Select>

                                    <FormLabel>Fish Name</FormLabel>
                                    <Select placeholder="Select Fish Name" marginBottom={"20px"}>
                                        <option>Ikan Mas</option>
                                    </Select>
                                
                                    <FormLabel>Price</FormLabel>
                                    <Input placeholder="Kg" type="text" marginBottom={"20px"}></Input>

                                    <Button marginTop={"20px"} >Add</Button>
                                </Box>

                                <Box width={"40%"}>
                                    <FormLabel>Total Product</FormLabel>
                                    <Input placeholder="Kg" type="text" marginBottom={"20px"}></Input>

                                    <FormLabel>Total Price</FormLabel>
                                    <Input placeholder="Rp." type="text" marginBottom={"20px"}></Input>

                                    <FormLabel>Status</FormLabel>
                                    <Select placeholder="Status Paid" marginBottom={"20px"}>
                                        <option>Paid</option>
                                    </Select>
                                </Box>
                            </Flex>               
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </>
    )
};

export default AddDataSaling;