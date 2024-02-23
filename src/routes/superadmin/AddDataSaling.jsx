import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightAddon, InputRightElement, Select, Textarea, useToast} from "@chakra-ui/react";
import SidebarSuperAdmin from "../../components/SidebarSuperAdmin";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import api from "../../services/api";

const AddDataSaling = () => {

    const toast = useToast();

    // state to save name after search name customers 
    const [custName, setCustName] = useState({});

    // debounce to get customer name 
    const handleSearchCustName = useCallback(
        debounce(async (e) => {
            const newName = e.target.value;

            if (newName !== "") {
                await getCustByName(newName)
            }
        }, 1000), [],
    );

    // get cust by name
    const getCustByName = async(name) => {
        try {
            if (custName !== "") {
                const responses = await api.get(`/api/v4/cust/search/name?name=${name}`);
                setCustName(responses.data.payload.data[0]);
            }
        } catch (error) {
            console.log("Error Fetching data", error);
            if (error.response.data.status_code !== 200) {
                    toast({
                        title: 'Cannot Show Data',
                        description: `${error.response.data.message}`,
                        status: 'error',
                        duration: 1500,
                        isClosable: true,
                        position: "top",
                    });
            }
        }
    }
    return(
        <>
            <Box bgColor={"#F5F7FA"} bgSize={"cover"} height={"100vh"} display={"flex"}>
                <SidebarSuperAdmin/>

                <Box margin={"50px"} width={"7xl"} display={"flex"} flexDirection={"column"} marginLeft={"280px"}>

                    <Box marginLeft={"10px"} marginTop={"20px"} >
                        <Heading>Add Data Saling</Heading>
                    </Box>
                    
                    <Box padding={"30px"} bgColor={"#FFFFFF"} borderRadius={"30px"} marginTop={"30px"} minHeight={"75vh"}>
                        <form>
                            <FormControl isRequired width={"100%"}>
                                <Flex flexDir={"row"} gap={10}>
                                    <Box width={"40%"}>
                                        <FormLabel>Customer Name</FormLabel>
                                        <Input placeholder="Name" type="text" marginBottom={"20px"} onChange={handleSearchCustName}></Input>

                                        <FormLabel>Select Customer</FormLabel>
                                        <Select placeholder="Select Cust" marginBottom={"20px"}>
                                            <option key={custName.id} value={custName.id} name="custName">{custName.name}</option>
                                        </Select>

                                        <FormLabel>Fish Name</FormLabel>
                                        <Input placeholder="Name" type="text" marginBottom={"20px"}></Input>
                                    
                                        <FormLabel>Select Fish</FormLabel>
                                        <Select placeholder="Select Fish" marginBottom={"20px"}>
                                            <option></option>
                                        </Select>

                                        <FormLabel>Price</FormLabel>
                                        <InputGroup marginBottom={"20px"}>
                                            <InputRightAddon borderLeftRadius={"7px"}>
                                                <Button>Get Price</Button>
                                            </InputRightAddon>
                                            <Input placeholder="Price" borderEndRadius={"7px"}></Input>
                                        </InputGroup>

                                        <Button>Add</Button>
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

                                        <FormLabel>Notes</FormLabel>
                                        <Textarea placeholder="Notes" marginBottom={"20px"}></Textarea>
                                    </Box>
                                </Flex>               
                            </FormControl>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    )
};

export default AddDataSaling;