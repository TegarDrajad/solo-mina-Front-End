import { Box, Text, Button, FormControl, TableContainer, Heading, Thead, Tr, Th, Td, Table, Flex, Tbody, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, FormLabel, Input, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, InputGroup, InputLeftElement, useToast } from "@chakra-ui/react";
import SidebarSuperAdmin from "../../components/SidebarSuperAdmin";
import api from "../../services/api";
import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const FishData = () => {

    // toast
    const toast = useToast();

    // modal open close 
    const { isOpen, onClose, onOpen } = useDisclosure();
    const cancelRef = React.useRef();

    // confirmation modal open 
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    
    // edit
    const [openModalEdit, setOpenModalEdit] = useState(false);

    // confirmation alert open 
    // delete
    const [openAlertDelete, setOpenAlertDelete] = useState(false);

    // state data to save response data fish
    const [dataFish, setDataFish] = useState([]);

    // state data to save response data fish by Id
    const [dataFishById, setDataFishById] = useState([]);

    // state to save id before delete data 
    const [fishId, setFishId] = useState();

    // state to save data before udd data
    const [formData, setFormData] = useState({name: '', min_price: 0, max_price: 0});

    // state for paginated 
    const [page, setPage] = useState(1);

    // handle paginated
    const handleNextPage = async() => {
        setPage(page + 1);
    };

    const handlePreviousPage = async() => {
        if (page > 1) {
            setPage(page -1)
        }
    };

    // fetching data from axios to get all fish data
    const getFish = async () => {
        try {
            const response = await api.get(`/api/v3/fish/pages/page?page=${page}`);
            setDataFish(response.data.payload);
        } catch (error) {
            console.log(error);
        }
    }

    // fetching data from axios get fish by id 
    const getFishById = async (fishId) => {
        try {
            const response = await api.get(`/api/v3/fish/${fishId}`);
            setDataFishById(response.data.payload);
            // console.log(response.data.payload)
        } catch (error) {
            console.log("Error Fetching data", error);
        }
    }

    // add data function

    // set data to state
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        
        // Conversion to integer
        const updatedValue = name === 'min_price' || name === 'max_price' ? parseInt(value, 10) : value;
        setFormData({...formData, [name]: updatedValue, });

        // console.log(formData)
    };

    // function add data to db 
    const postDataFish = async () => {
        // console.log(formData)
        try {
            // checking data min price must < max price 
            if (formData.min_price > formData.max_price) {
                toast({
                    title: 'Data Cannot Create',
                    description: "Min price must be less than max price",
                    status: 'warning',
                    duration: 1500,
                    isClosable: true,
                    position: "top",
                });
                return;
            }

            const response = await api.post(`api/v3/fish`, formData);

            // check if succes and show toast
            if (response.data.status_code === 200) {
                toast({
                    title: 'Data created.',
                    description: "You Have Created New Fish ",
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                    position: "top",
                })

                getFish();

                // set form data to default 
                setFormData({ name: '', min_price: 0, max_price: 0 });
            } else {
                toast({
                    title: 'Error.!',
                    description: "You Can't Created New Data",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error.!',
                description: "You Can't Created New Data",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    }

    // update data fish 
    const updateDataFish = async (e) => {
        try {
            e.preventDefault();

            // checking data min price and max price 

            const updatedValues = {
                name: e.target.name.value,
                min_price: parseInt(e.target.min_price.value, 10),
                max_price: parseInt(e.target.max_price.value, 10),
            };
            // console.log(updatedValues)

            const fishId = e.target.id.value;
            // console.log(fishId)

            if (updatedValues !== null) {
                if (updatedValues.min_price < updatedValues.max_price) {
                    const response = await api.put(`api/v3/fish/${fishId}`, updatedValues);

                    if (response.data.status_code === 200) {
                        toast({
                            title: 'Data updated.',
                            description: 'Successfully updated the fish data.',
                            status: 'success',
                            duration: 1500,
                            isClosable: true,
                            position: 'top',
                        });
    
                        setOpenModalEdit(false);
                        getFish();
                    }
                }else{
                    toast({
                        title: 'Data Cannot Updated',
                        description: "Min price must be less than max price",
                        status: 'warning',
                        duration: 1500,
                        isClosable: true,
                        position: "top",
                    });
                    return;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Delete data 

    // get fish id to delete 
    const handleDeleteClick = (fishId) => {
        setFishId(fishId);
        setOpenAlertDelete(true);
    }

    // fetch to delete fish 
    const handleDeleteFIsh = async () => {
        try {
            if (fishId !== undefined) {
                const response = await api.delete(`api/v3/fish/${fishId}`);

                // cek if response status_code = 200
                if (response.data.status_code === 200) {
                    // send notifikasi sukses 
                    toast({
                        title: `Fish with id ${fishId} deleted.`,
                        description: 'You have successfully deleted the data.',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                        position: 'top',
                    });

                    getFish();
                }
            }else{
                toast({
                    title: 'Error.!',
                    description: 'Unable to delete data.',
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position: 'top',
                });
            }

            // setDataFish(undefined);
        } catch (error) {
            console.log(error);
        }
    }


    // console.log(dataFish);

    useEffect(() => {
        getFish();
    }, [page]);

    return(
        <>
            <Box bgColor={"#F5F7FA"} bgSize={"cover"} height={"100vh"} display={"flex"}>
                <SidebarSuperAdmin/>

                <Box margin={"50px"} width={"7xl"} display={"flex"} flexDirection={"column"} marginLeft={"280px"}>
                   
                   <Box marginLeft={"10px"} marginTop={"20px"} >
                        <Heading>Fish Data</Heading>
                    </Box>

                    <Box padding={"30px"} display={"flex"} flexDirection={"column"} bgColor={"#FFFFFF"} borderRadius={"30px"} marginTop={"40px"} minHeight={"75vh"}>
                        <Box>
                            <Button marginLeft={"90%"} bgColor={"#4CAF4F"} borderRadius={"10px"} onClick={() => setConfirmationOpen(true)}>+ Add</Button>
                        </Box>
                        
                        <Box bgColor={"whitesmoke"} boxSize={"6xl"} marginTop={"25px"} borderRadius={"20px"} marginLeft={"10px"} paddingBottom={"20px"} minHeight={"51.5vh"} maxHeight={"51.5vh"}>
                        <TableContainer>
                                <Table variant={"striped"} >
                                    <Thead>
                                        <Tr>
                                            <Th>Id</Th>
                                            <Th>Name</Th>
                                            <Th>Minimal Price</Th>
                                            <Th>Maximal Price</Th>
                                            <Th paddingLeft={"55px"}>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataFish.data && dataFish.data.map((fish) => (
                                        <Tr key={fish.id}>
                                            <Td>{fish.id}</Td>
                                            <Td>{fish.name}</Td>
                                            <Td>{`Rp. ${fish.min_price.toLocaleString('id-ID')}`}</Td>
                                            <Td>{`Rp. ${fish.max_price.toLocaleString('id-ID')}`}</Td>
                                            <Td>
                                                <Flex gap={"2"}>
                                                    <Button size={"sm"} colorScheme="blue" borderRadius={"40px"} onClick={() => {getFishById(fish.id); setOpenModalEdit(true)}}>Edit</Button>
                                                    <Button size={"sm"} colorScheme="red" borderRadius={"40px"} onClick={() => handleDeleteClick(fish.id)}>Delete</Button>
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
                                <Text fontSize={"sm"} fontWeight={"semibold"}>Current Pages : {dataFish.currentPages}</Text>
                            </Box>

                            <Box as="div" marginTop={"7px"}>
                                <Text fontSize={"sm"} fontWeight={"semibold"}>Total Pages : {dataFish.totalPages}</Text>
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

            {/* Modal Add Data Fish */}

            <Modal isOpen={confirmationOpen} onClose={() => setConfirmationOpen(false)} size={"xl"}>
                <ModalOverlay backdropBlur={"2px"} backdropInvert={"80%"}>
                    <ModalContent>
                        <ModalHeader>Add Data Fish</ModalHeader>
                        <ModalCloseButton/>

                        <ModalBody>
                            <FormControl isRequired width={"100%"}>
                                <Box width={"70%"}>
                                    <Flex flexDir={"column"} gap={5}>
                                        <Box>
                                            <FormLabel>Fish Name</FormLabel>
                                            <Input placeholder="Enter name" type="text" name="name" value={formData.name} onChange={handleFormChange}></Input>
                                        </Box>

                                        <Box>
                                            <FormLabel>Minimal Price</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none">
                                                    Rp.
                                                </InputLeftElement>
                                                <Input placeholder="ex (10000)" type="number" name="min_price" value={formData.min_price} onChange={handleFormChange}></Input>
                                            </InputGroup>
                                        </Box>

                                        <Box>
                                            <FormLabel>Maximal Price</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none">
                                                    Rp.
                                                </InputLeftElement>
                                                <Input placeholder="ex (10000)" type="number" name="max_price" value={formData.max_price} onChange={handleFormChange}></Input>
                                            </InputGroup>
                                        </Box>

                                        <Box marginBottom={"15px"}>
                                            <Button onClick={() => {postDataFish(); setConfirmationOpen(false) }}>Add</Button>
                                        </Box>
                                    </Flex>
                                </Box>
                            </FormControl>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            {/* Modal for edit data fish */}

            <Modal isOpen={openModalEdit} onClose={() => setOpenModalEdit(false)} size={"xl"}>
                <ModalOverlay backdropBlur="xl" backdropInvert="80%" backgroundBlendMode="darken"> 
                    <ModalContent>
                        <ModalHeader>Edit Data Fish</ModalHeader>
                        <ModalCloseButton/>

                        <ModalBody>
                            {dataFishById && (
                            <form key={dataFishById.id} onSubmit={(e) => updateDataFish(e)}>
                                <FormControl isRequired>
                                    <Box width={"70%"}>
                                        <Flex flexDir={"column"} gap={5}>
                                            <Box>
                                                <FormLabel>Id</FormLabel>
                                                <Input readOnly defaultValue={dataFishById.id} name="id"></Input>
                                            </Box>

                                            <Box>
                                                <FormLabel>Name</FormLabel>
                                                <Input type="text" name="name" defaultValue={dataFishById.name}></Input>
                                            </Box>

                                            <Box>
                                                <FormLabel>Minimal Price</FormLabel>
                                                <InputGroup>
                                                    <InputLeftElement pointerEvents="none">
                                                        Rp.
                                                    </InputLeftElement>
                                                    <Input type="number" name="min_price" defaultValue={dataFishById.min_price}></Input>
                                            </InputGroup>
                                            </Box>

                                            <Box>
                                                <FormLabel>Maximal Price</FormLabel>
                                                <InputGroup>
                                                    <InputLeftElement pointerEvents="none">
                                                        Rp.
                                                    </InputLeftElement>
                                                    <Input type="number" name="max_price" defaultValue={dataFishById.max_price}></Input>
                                            </InputGroup>
                                            </Box>

                                            <Box marginBottom={"15px"}>
                                                <Button type="submit">Edit</Button>
                                            </Box>
                                        </Flex>                                 
                                    </Box>
                                </FormControl>
                            </form>
                            )}
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            {/* Alert dialog for delete data */}
            <AlertDialog isOpen={openAlertDelete} leastDestructiveRef={cancelRef} onClose={() => setOpenAlertDelete(false)}> 
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Delete data
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure to Delete data fish ?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setOpenAlertDelete(false)} marginRight={"10px"}>
                                Cancel
                            </Button>

                            <Button colorScheme="red" onClick={() => {setOpenAlertDelete(false); handleDeleteFIsh()}}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default FishData;

