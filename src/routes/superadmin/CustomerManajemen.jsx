import { Box, Flex, Heading, Text, Input, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Textarea, InputGroup, InputLeftElement, useToast} from "@chakra-ui/react";
import SidebarSuperAdmin from "../../components/SidebarSuperAdmin";
import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from "@chakra-ui/icons";
import { useCallback } from "react";
import debounce from "lodash.debounce";

const CustomerManajemen = () => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    // toast
    const toast = useToast();

    // Second Modal Delete Data
    const [secondModal, setSecondModal] = useState(false);

    const closeSecondModal = () => setSecondModal(false);
    const openSecondModal = () => setSecondModal(true);

    // Third Modal Add Data Customer
    const [thirdModal, setThirdModal] = useState(false);

    const closeThirdModal = () => setThirdModal(false);
    const openThirdModal = () => setThirdModal(true);

    // state to save response data all customer
    const [dataCust, setDataCust] = useState([]);

    // state save id cust 
    const [custId, setCustId] = useState();

    // data cust by id 
    const [custById, setCustById] = useState();

    // search name bar 
    const [searchName, setSearchName] = useState("");

    // state for paginated 
    const [page, setPage] = useState(1);

    // get all customer data 
    const getAllCust = async () => {
        try {
            const response = await api.get(`/api/v4/cust/pages/page?page=${page}`);
            setDataCust(response.data.payload);
        } catch (error) {
            console.log(error);
        }
    };

    // post new data customers to db 
    const addDataCust = async (e) => {
        try {
            e.preventDefault();

            // get data from event 
            const newData = {
                    name: e.target.name.value,
                    contact: e.target.contact.value,
                    address: e.target.address.value,
            };

            // console.log(newData)

            const response = await api.post('/api/v4/cust', newData);
            // console.log(response)

            if (response.data.status_code === 200) {
                toast({
                    title: 'Data created.',
                    description: "You Have Created New Customer",
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                    position: "top",
                })
                    
                getAllCust();
                closeThirdModal();
            };
        } catch (error) {
            if (error.response.data.status_code === 400) {
                toast({
                    title: 'Data Cannot Create',
                    description: `${error.response.data.message}`,
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position: "top",
                });
            };
            console.log("Error", error);
        };
    };

    // get data customers by id 
    const getCustById = async (Id) => {
        try {
            const response = await api.get(`/api/v4/cust/${Id}`);

            // delete zero first data contact
            const updatedContact = response.data.payload.contact.slice(1);
            const data = {...response.data.payload, contact: updatedContact};

            setCustById(data);
        } catch (error) {
            console.log(error)
            toast({
                title: 'Cannot Show Data',
                description: `Internal Server Error`,
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: "top",
            });
        }
    }

    // get cust by name 
    const getCustByName = async (newName) => {
        try{
            const name = newName;

            // console.log(name);

            const response = await api.get(`/api/v4/cust/search/name?name=${name}`);

            // console.log(response)

            if (response.data.status_code === 200) {
                setDataCust(response.data.payload);
            }
        } catch (error) {
            console.log(error);
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

    // update data customers 
    const updateDataCust = async (e) => {
        try {
            e.preventDefault();

            const newData = {
                name: e.target.name.value,
                contact: e.target.contact.value,
                address: e.target.address.value,
            };

            const custId = e.target.id.value;

            // update to db 
            const response = await api.put(`api/v4/cust/${custId}`, newData);

            if (response.data.status_code === 200) {
                toast({
                    title: 'Data updated.',
                    description: 'Successfully updated the customer data.',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                    position: 'top',
                });

                onClose();
                setCustById();
                getAllCust();
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Data Cannot Updated',
                description: `${error.response.data.message}`,
                status: 'warning',
                duration: 1500,
                isClosable: true,
                position: "top",
            });
        }
    }

    // delete data customers 

    // get the id 
    const handleDeleteClick = (custId) => {
        setCustId(custId);
        openSecondModal();
    }

    // delete data customers 
    const handleDeleteCust = async () => {
        try {
            if (!custId) {
                toast({
                    title: 'Data Cannot Delete',
                    description: `Id is unavailable`,
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position: "top",
                });
            }else{
                const response = await api.delete(`api/v4/cust/${custId}`);

                if (response.data.status_code === 200) {
                    toast({
                        title: `Customer with id ${custId} deleted.`,
                        description: 'You have successfully deleted the data.',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                        position: 'top',
                    });

                    closeSecondModal();
                    getAllCust();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle paginated 
    const handleNextPage = async() => {
        setPage(page +1)
    };

    const handlePreviousPage = async() => {
        if (page > 1) {
            setPage(page -1)
        }
    };

    // function for set timeout on change in search bar customer manajemen
    const searchNameRef = useRef();

    const handleSearchName = useCallback(
        debounce( async (e) => {
            const newName = e.target.value;
            setSearchName(newName);

            if (searchNameRef.current) {
                searchNameRef.current.value = newName;
            }

            if (newName !== "") {
                await getCustByName(newName);
            }
        }, 1000), [],
    );
    
    useEffect(() => {
        if (searchName === "") {
            getAllCust();
        }
    }, [page, searchName]);
    
    return(
        <>
            
            <Box bgColor={"#F5F7FA"} bgSize={"cover"} height={"100vh"} display={"flex"}>
                <SidebarSuperAdmin/>

                <Box margin={"50px"} width={"7xl"} display={"flex"} flexDirection={"column"} marginLeft={"280px"}>
                    
                    <Box marginLeft={"10px"} marginTop={"20px"} >
                        <Heading>Customer Manajemen</Heading>
                    </Box>

                    <Box padding={"30px"} display={"flex"} flexDirection={"column"} bgColor={"#FFFFFF"} borderRadius={"30px"} marginTop={"30px"} minHeight={"78vh"} >
                        <Flex flexDir={"row"} gap={860}>
                            <Box width={"190px"} alignSelf={"flex-start"}>
                                <Text marginBottom={"15px"}>Customer Name</Text>
                                <InputGroup>
                                    <InputLeftElement> 
                                        <SearchIcon/>
                                    </InputLeftElement>

                                    <Input placeholder="Name" name="name" onChange={handleSearchName} ref={searchNameRef}></Input>
                                </InputGroup>
                            </Box>

                            <Box alignSelf={"flex-end"}>
                                <Button bgColor={"#4CAF4F"} borderRadius={"10px"} onClick={openThirdModal}>+ Add</Button>
                            </Box>
                        </Flex>

                        <Box bgColor={"whitesmoke"} boxSize={"6xl"} marginTop={"25px"} borderRadius={"20px"} marginLeft={"10px"} paddingBottom={"20px"} minHeight={"51.5vh"} maxHeight={"51.5vh"}>
                            <TableContainer>
                                <Table variant={"striped"}>
                                    <Thead>
                                        <Tr>
                                            <Th>Id</Th>
                                            <Th>Name</Th>
                                            <Th>Contact</Th>
                                            <Th>Address</Th>
                                            <Th paddingLeft={"55px"}>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataCust.data && dataCust.data.map((cust) => (
                                        <Tr key={cust.id}>
                                            <Td>{cust.id}</Td>
                                            <Td>{cust.name}</Td>
                                            <Td>{cust.contact}</Td>
                                            <Td>{cust.address}</Td>
                                            <Td>
                                                <Flex gap={"2"}>
                                                    <Button onClick={() => {onOpen(); getCustById(cust.id)}} size={"sm"} colorScheme="blue" borderRadius={"40px"}>Edit</Button>
                                                    <Button onClick={() => handleDeleteClick(cust.id)} size={"sm"} colorScheme="red" borderRadius={"40px"}>Delete</Button>
                                                </Flex>    
                                            </Td>                                
                                        </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>    

                        <Flex marginTop={"20px"} gap={"10px"} marginLeft={"15px"}>
                            <Box as="div" marginTop={"7px"} justifyContent={"flex-start"}>
                                <Text fontSize={"sm"} fontWeight={"semibold"}>Current Pages : {dataCust.currentPages}</Text>
                            </Box>

                            <Box as="div" marginTop={"7px"}>
                                <Text fontSize={"sm"} fontWeight={"semibold"}>Total Pages : {dataCust.totalPages}</Text>
                            </Box>

                            <Button marginLeft={"240px"} bgColor={"#b6e1e0"} alignItems={"center"} display={"flex"} marginBottom={"5px"} onClick={handlePreviousPage} justifyContent={"center"} size={"sm"}>
                                <ArrowLeftIcon/> 
                                <Text marginLeft={"5px"} marginBottom={"3px"}>
                                    Prev
                                </Text>
                            </Button>

                            <Button onClick={handleNextPage} marginBottom={"5px"} bgColor={"#b6e1e0"} alignItems={"center"} display={"flex"} justifyContent={"center"} size={"sm"}>
                                <ArrowRightIcon/>
                                <Text marginLeft={"5px"} marginBottom={"3px"}>
                                    Next
                                </Text>
                            </Button>
                        </Flex>

                    </Box>
                </Box>
            </Box>   
            
            {/* Modal Add Data Customers */}
            <Modal isOpen={thirdModal} onClose={closeThirdModal} size={"2xl"}>
                <ModalOverlay backdropBlur={"2px"} backdropInvert={"80%"}/>

                <ModalContent>
                    <ModalHeader>Add Data Customers</ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody >
                        <FormControl isRequired width={"100%"}>
                            <form onSubmit={(e) => {addDataCust(e)}}>
                                <Box width={"55%"}>
                                    <FormLabel>Name</FormLabel>
                                    <Input placeholder="Name" type="text" name="name" marginBottom={"20px"} ></Input>

                                    <FormLabel>Contact</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement color={"GrayText"}>+62</InputLeftElement>
                                        <Input placeholder="81215267243" type="number" name="contact" marginBottom={"20px"}></Input>
                                    </InputGroup>

                                    <FormLabel>Address</FormLabel>
                                    <Textarea placeholder="Address" type="text" name="address" marginBottom={"20px"} resize={"horizontal"}></Textarea>
                                        
                                    <Button marginTop={"15px"} marginBottom={"15px"} type="submit">Add</Button>
                                </Box>        
                            </form>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Modal Edit  */}

            <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
                <ModalOverlay backdropBlur={"2px"} backdropInvert={"80%"}/>

                <ModalContent>
                    <ModalHeader>Edit Data Customer</ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody >
                        {custById && (
                            <form key={custById.id} onSubmit={(e) => updateDataCust(e)}>
                        <FormControl isRequired width={"100%"}>
                                <Box width={"55%"}>
                                    <FormLabel>Id</FormLabel>
                                    <Input placeholder="Id" type="text" name="id" value={custById.id} readOnly marginBottom={"20px"}></Input>

                                    <FormLabel>Name</FormLabel>
                                    <Input placeholder="Name" type="text" name="name" defaultValue={custById.name} marginBottom={"20px"}></Input>

                                    <FormLabel>Contact</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement color={"GrayText"}>+62</InputLeftElement>
                                        <Input placeholder="81215267243" type="text" name="contact" defaultValue={custById.contact.replace(/^62/, '')} marginBottom={"20px"}></Input>
                                    </InputGroup>

                                    <FormLabel>Address</FormLabel>
                                    <Textarea placeholder="Address" marginBottom={"20px"} name="address" defaultValue={custById.address} resize={"horizontal"}></Textarea>
                                    

                                    <Button marginTop={"15px"} marginBottom={"15px"} type="submit">Edit</Button>
                                </Box>
                        </FormControl>
                            </form>
                        )}
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
                    Are you sure to delete this customer ?
                </ModalBody>
                <ModalFooter>
                    <Flex gap={"2"}>
                        <Button colorScheme="blue" onClick={closeSecondModal}>No</Button>
                        <Button colorScheme="green" onClick={() => handleDeleteCust()}>Yes</Button>
                    </Flex>
                </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
};

export default CustomerManajemen;