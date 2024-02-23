import { Box, Flex, Heading, Select, Text, Input, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, useToast} from "@chakra-ui/react";
import SidebarSuperAdmin from "../../components/SidebarSuperAdmin";
import { useState } from "react";
import api from "../../services/api";
import { useEffect } from "react";

const SalesInformation = () => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();

    // Second Modal Delete Data
    const [secondModal, setSecondModal] = useState(false);

    const closeSecondModal = () => setSecondModal(false);
    const openSecondModal = () => setSecondModal(true);

    // state to paginated 
    const [page, setPage] = useState(1);

    // state to save data all recaps 
    const [dataRecaps, setDataRecaps] = useState([]);

    // get all recaps 
    const getAllRecaps = async() => {
        try {
            const response = await api.get(`/api/v6/recap/page?page=${page}`);
            setDataRecaps(response.data.payload.data);
        } catch (error) {
            console.log("Error Fetching Data", error);
            toast({
                title: 'Error.!',
                description: `${error.response.data.message}`,
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'top',
            });
        }
    };

    console.log(dataRecaps);

    useEffect(() => {
        getAllRecaps();
    }, []);
    
    return(
        <>
            <Box bgColor={"#F5F7FA"} bgSize={"cover"} height={"100vh"} display={"flex"}>
                <SidebarSuperAdmin/>

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

                            <Box marginLeft={"400px"}>
                                <Button size={"md"} bgColor={"#4CAF4F"} borderRadius={"10px"} marginTop={"38px"} onClick={() => {window.location.href= '/backoffice/addDataSale'}}>+ Add</Button>
                            </Box>
                        </Flex>

                        <Box bgColor={"whitesmoke"} boxSize={"6xl"} marginTop={"25px"} borderRadius={"20px"} marginLeft={"10px"}>
                            <TableContainer>
                                <Table variant={"striped"}>
                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>Date</Th>
                                            <Th>Customer</Th>
                                            <Th>Fish Name</Th>
                                            <Th>Total Fish</Th>
                                            <Th>Total Price</Th>
                                            <Th>Status</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataRecaps && dataRecaps.map((recap, index) => (
                                            <Tr>
                                                <Td>{recap.id}</Td>
                                                <Td>{new Date(recap.createdAt).toLocaleDateString('id-ID')}</Td>
                                                <Td>{recap.customer.name}</Td>
                                                <Td>{recap.fish.name}</Td>
                                                <Td>{recap.total_product}Kg</Td>
                                                <Td>{`Rp. ${recap.total_price.toLocaleString('id-ID')}`}</Td>
                                                <Td>{recap.status}</Td>  
                                                <Td>
                                                    <Flex gap={"2"}>
                                                        <Button size={"sm"} colorScheme="blackAlpha" borderRadius={"40px"}>Detail</Button>
                                                        <Button onClick={onOpen} size={"sm"} colorScheme="blue" borderRadius={"40px"}>Edit</Button>
                                                        <Button onClick={openSecondModal} size={"sm"} colorScheme="red" borderRadius={"40px"}>Delete</Button>
                                                    </Flex>    
                                                </Td>                                
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>    
                    </Box>
                </Box>
            </Box>   
            

            {/* Modal Edit  */}

            <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
                <ModalOverlay backdropBlur={"2px"} backdropInvert={"80%"}/>

                <ModalContent>
                    <ModalHeader>Edit Data</ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody >
                        <FormControl isRequired width={"100%"}>
                            <Flex flexDir={"row"} gap={10}>
                                <Box width={"40%"}>
                                    <FormLabel>Id</FormLabel>
                                    <Input placeholder="Id" type="text" marginBottom={"20px"}></Input>

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
                                
                                    <Button marginTop={"15px"} marginBottom={"15px"}>Edit</Button>
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
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Second modal Delete */}
            <Modal isOpen={secondModal} onClose={closeSecondModal} size="sm">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Are you sure ?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure to delete this data ?
                </ModalBody>
                <ModalFooter>
                    <Flex gap={"2"}>
                        <Button colorScheme="blue" onClick={closeSecondModal}>No</Button>
                        <Button colorScheme="green" onClick={closeSecondModal}>Yes</Button>
                    </Flex>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default SalesInformation;