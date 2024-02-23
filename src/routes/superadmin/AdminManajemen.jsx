import { Box, Flex, Heading, Select, Text, Input, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Avatar, useToast} from "@chakra-ui/react";
import SidebarSuperAdmin from "../../components/SidebarSuperAdmin";
import { useEffect, useState } from "react";
import api from "../../services/api"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const AdminManajemen = () => {

    //toast 

    const toast = useToast()
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Second Modal Delete Data
    const [secondModal, setSecondModal] = useState(false);

    const closeSecondModal = () => setSecondModal(false);
    const openSecondModal = () => setSecondModal(true);

    // Third Modal Add Data Admin
    const [thirdModal, setThirdModal] = useState(false);

    const closeThirdModal = () => setThirdModal(false);
    const openThirdModal = () => setThirdModal(true);

    // state to save data all users if data is selected
    const [allDataUsers, setAllDataUsers] = useState([]);

    // state data to save data users
    const [dataUsers, setDataUsers] = useState([]);
    
    // state to paginated 
    const [page, setPage] = useState(1);

    // state to save edit data 
    const [dataUsersEdit, setDataUsersEdit] = useState([]);

    // get all users data from axios 

    const getUser = async () => {
        try {
            const response = await api.get(`/api/v1/users/pages/page?page=${page}`);
            setDataUsers(response.data.payload); 
            setAllDataUsers(response.data.payload);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };   

    // get data users by id 

    const getUserId = async (userId) => {
        try {
            if (userId !== undefined) {
                const response = await api.get(`/api/v1/users/${userId}`);
                setDataUsersEdit(response.data.payload.data);
            }else{
                console.error("UserId is undefined");
            }
        } catch (error) {
            console.error("Error fetching data:", error )
        }
    };

    // Post data users 

    // State untuk menyimpan data yang di inputkan 
    const [formData, setFormData]= useState({full_name: '', username: '', password: '', role: ''});

    // function untuk handle perubahan inputan form
    const handleFormChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // function untuk post to api dan menambahkan ke dalam database

    const handlePostUsers = async () => {
        try {
            const response = await api.post(`api/v1/users`, formData);

            // cek apakah berhasil post data
            if (response.data.status_code === 200) {
                toast({
                    title: 'Account created.',
                    description: "You Have Created Account",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                closeThirdModal();
                getUser();
            } else{
                toast({
                    title: 'Error.!',
                    description: "You Can't Created New Account",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error adding user', error);
        }
    }

    // state to save id before delete and update  
    const [selectedUserId, setSelectedUserId] = useState();

    // function to handle click delete 
    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        openSecondModal();
    }

    // function untuk delete data users
    const handleDeleteUsers = async () => {
        try {
            if (selectedUserId !== undefined) {
                const response =  await api.delete(`api/v1/users/${selectedUserId}`);
                
                // cek apakah response code 200
                if (response.data.status_code === 200) {
                    // kirimkan notifikasi atau toast
                    toast({
                        title: 'Account deleted.',
                        description: 'You have successfully deleted the account.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',
                    });
                }

                // close modal
                closeSecondModal();

                // refresh page 
                getUser();
            } else{
                toast({
                    title: 'Error.!',
                    description: 'Unable to delete account.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                });
            }

            // set state id undefined
            setSelectedUserId(undefined)
        } catch (error) {
            console.error(error);
        }
    }

    // Update data users

    // Function for get the id 
    const handleUpdateClick = async (userId) => {
        // set state yang sudah dibuat diatas untuk update dan delete
        setSelectedUserId(userId);

        await getUserId(userId);
        onOpen();
    }

    const handleUpdateSet = async (e) => {
        try {
            e.preventDefault();
    
            const updatedValues = {
                username: e.target.username.value,
                password: e.target.password.value,
                full_name: e.target.full_name.value,
                role: e.target.role.value,
            };
    
            const userId = e.target.id.value;
            // console.log(userId)

            // pastikan updatevalues sudah ada nilanya baru diadakan update data pada database
    
            if (updatedValues !== null) {
                // console.log(updatedValues)
                const response = await api.put(`api/v1/users/${userId}`, updatedValues);

                // cek apakah berhasil
                if (response.data.status_code === 200) {
                    toast({
                        title: 'Account updated.',
                        description: 'Successfully updated the account.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',
                    });

                    onClose();
                    getUser();
                }else{
                    toast({
                        title: 'Error.!',
                        description: 'Unable to update account.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // set paginated 
    const handleNextPage = async() => {
        setPage(page + 1);
    };

    const handlePreviousPage = async() => {
        if (page > 1) {
            setPage(page -1)
        }
    };
    

    // Component did mount start method
    useEffect(() => {
       getUser();       
    },[page]);

    // set show or hide password 
    const [showPassword] = useState(false);
    
    return(
        <>
            
            <Box bgColor={"#F5F7FA"} bgSize={"cover"} height={"100vh"} display={"flex"}>
                <SidebarSuperAdmin/>

                <Box margin={"50px"} width={"7xl"} display={"flex"} flexDirection={"column"} marginLeft={"280px"}>
                    
                    <Box marginLeft={"10px"} marginTop={"20px"} >
                        <Heading>Users Manajemen</Heading>
                    </Box>

                    <Box padding={"30px"} display={"flex"} flexDirection={"column"} bgColor={"#FFFFFF"} borderRadius={"30px"} marginTop={"40px"} minHeight={"77vh"}>
                        
                        <Box alignSelf={"flex-end"} marginRight={"50px"}>
                            <Button bgColor={"#4CAF4F"} borderRadius={"10px"} onClick={openThirdModal}>+ Add</Button>
                        </Box>
                        

                        <Box bgColor={"whitesmoke"} boxSize={"6xl"} marginTop={"30px"} borderRadius={"20px"} marginLeft={"10px"} paddingBottom={"20px"} minHeight={"51.5vh"} maxHeight={"51.5vh"}>
                            <TableContainer>
                                <Table variant={"striped"}>
                                    <Thead>
                                        <Tr>
                                            <Th>Id</Th>
                                            <Th>Profile</Th>
                                            <Th>Username</Th>
                                            <Th>Password</Th>
                                            <Th>Full_name</Th>
                                            <Th>Role</Th>     
                                            <Th paddingLeft={"55px"}>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataUsers.data && dataUsers.data.map(user => (
                                            <Tr key={user.id}>
                                                <Td>{user.id}</Td>
                                                <Td>
                                                    <Avatar size={"sm"} name={user.full_name} bgColor={"Highlight"}></Avatar>
                                                </Td>
                                                <Td>{user.username}</Td>
                                                <Td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={user.password}>
                                                    {user.password.substring(0, user.password.length / 2)}
                                                </Td>
                                                <Td>{user.full_name.length > 20 ? `${user.full_name.substring(0, 15)}...` : user.full_name}</Td>
                                                <Td>{user.role}</Td>
                                                <Td>
                                                    <Flex gap={"2"}>
                                                        <Button onClick={() => handleUpdateClick(user.id)} size={"sm"} colorScheme="blue" borderRadius={"40px"}>Edit</Button>
                                                        <Button onClick={() => handleDeleteClick(user.id)} size={"sm"} colorScheme="red" borderRadius={"40px"}>Delete</Button>
                                                    </Flex>    
                                                </Td>                                
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>    

                        <Flex marginTop={"25px"} gap={"10px"} marginLeft={"15px"}>
                            <Box as="div" marginTop={"7px"} justifyContent={"flex-start"}>
                                <Text fontWeight={"semibold"} fontSize={"sm"}>Current Pages : {allDataUsers.currentPages}</Text>
                            </Box>

                            <Box as="div" marginTop={"7px"}>
                                <Text fontWeight={"semibold"} fontSize={"sm"}>Total Pages : {allDataUsers.totalPages}</Text>
                            </Box>

                            <Button onClick={handlePreviousPage} marginLeft={"280px"} bgColor={"#b6e1e0"} alignItems={"center"} display={"flex"} marginBottom={"5px"} justifyContent={"center"} size={"sm"}>
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
            

            {/* Modal Edit  */}

            <Modal isOpen={isOpen} onClose={() => {onClose(); getUser();}} size={"5xl"}>
                <ModalOverlay backdropBlur={"2px"} backdropInvert={"80%"}/>

                <ModalContent>
                    <ModalHeader>Edit Data Admin</ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody >
                            <form key={dataUsersEdit.id} onSubmit={(e) => handleUpdateSet(e)}>
                            <FormControl key={dataUsersEdit.id} isRequired width={"100%"}>
                                <Flex flexDir={"row"} gap={10}>
                                    <Box>
                                        <Avatar size={"xl"} name={dataUsersEdit.full_name} ></Avatar>
                                    </Box>

                                    <Box width={"40%"}>
                                        <FormLabel>Id</FormLabel>
                                        <Input placeholder="id" type="text" marginBottom={"20px"} readOnly name="id" defaultValue={dataUsersEdit.id}></Input>

                                        <FormLabel>Username</FormLabel>
                                        <Input placeholder="username" type="text" marginBottom={"20px"} name="username" defaultValue={dataUsersEdit.username} ></Input>

                                        <FormLabel>Password</FormLabel>
                                        <Input placeholder="Password" type={showPassword ? "text" : "password"} marginBottom={"20px"} name="password" defaultValue={dataUsersEdit.password} ></Input>

                                        <Button marginTop={"15px"} marginBottom={"15px"} type="submit">Edit</Button>
                                    </Box>

                                    <Box width={"40%"}>
                                        <FormLabel>Full Name</FormLabel>
                                        <Input placeholder="Full Name" type="text" marginBottom={"20px"} name="full_name" defaultValue={dataUsersEdit.full_name} ></Input>

                                        <FormLabel>Pick-Role</FormLabel>
                                        <Select name="role" placeholder={dataUsersEdit.role} marginBottom={"20px"} defaultValue={dataUsersEdit.role} >
                                            <option value="admin">Admin</option>
                                            <option value="superAdmin">Super Admin</option>
                                        </Select>
                                    </Box>
                                </Flex>               
                            </FormControl>
                            </form>
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
                    Are you sure to delete this admin ?
                </ModalBody>
                <ModalFooter>
                    <Flex gap={"2"}>
                        <Button colorScheme="blue" onClick={closeSecondModal}>No</Button>
                        <Button colorScheme="green" onClick={() => handleDeleteUsers(selectedUserId)}>Yes</Button>
                    </Flex>
                </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal Add Data Admin */}
            <Modal isOpen={thirdModal} onClose={closeThirdModal} size={"5xl"}>
                <ModalOverlay backdropBlur={"2px"} backdropInvert={"80%"}/>

                <ModalContent>
                    <ModalHeader>Add Data Admin</ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody >
                        <FormControl isRequired width={"100%"}>
                            <Flex flexDir={"row"} gap={10}>

                                <Box width={"40%"}>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input name="full_name" placeholder="Full Name" type="text" pattern="[A-Z-z\s]*" title="Only letters and spaces are allowed" marginBottom={"20px"} value={formData.full_name} onChange={handleFormChange}></Input>

                                    <FormLabel>Username</FormLabel>
                                    <Input name="username" placeholder="Username" type="text" marginBottom={"20px"} value={formData.username} onChange={handleFormChange}></Input>

                                    <FormLabel>Password</FormLabel>
                                    <Flex> 
                                        <Input name="password" placeholder="Password" type={showPassword ? "text" : "password"} marginBottom={"20px"} value={formData.password} onChange={handleFormChange}></Input>
                                    </Flex>

                                    <Button marginTop={"15px"} marginBottom={"15px"} onClick={handlePostUsers}>Add</Button>
                                </Box>

                                <Box width={"40%"}>
                                    <FormLabel>Role</FormLabel>
                                    <Select name="role" placeholder="Pick Role" marginBottom={"20px"} value={formData.role} onChange={handleFormChange}>
                                        <option value="admin">Admin</option>
                                        <option value="superAdmin">Super Admin</option>
                                    </Select>
                                </Box>
                            </Flex>               
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};

export default AdminManajemen;