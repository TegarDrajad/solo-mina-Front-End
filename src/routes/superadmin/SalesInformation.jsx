import { Box, Flex, Heading, Select, Text, Input, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter} from "@chakra-ui/react";
import SidebarSuperAdmin from "../../components/SidebarSuperAdmin";
import { useState } from "react";

const SalesInformation = () => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Second Modal Delete Data
    const [secondModal, setSecondModal] = useState(false);

    const closeSecondModal = () => setSecondModal(false);
    const openSecondModal = () => setSecondModal(true);
    
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
                                            <Th>Total Product</Th>
                                            <Th>Total Price</Th>
                                            <Th>Status</Th>
                                            <Th paddingLeft={"55px"}>Action</Th>
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
                                            <Td>
                                                <Flex gap={"2"}>
                                                    <Button onClick={onOpen} size={"sm"} colorScheme="blue" borderRadius={"40px"}>Edit</Button>
                                                    <Button onClick={openSecondModal} size={"sm"} colorScheme="red" borderRadius={"40px"}>Delete</Button>
                                                </Flex>    
                                            </Td>                                
                                        </Tr>
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