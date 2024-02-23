import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Box, Button, FormControl, TableContainer, Heading, Thead, Tr, Th, Td, Table, Flex, Tbody, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Input, InputGroup, InputLeftElement, useToast, Text, Select } from "@chakra-ui/react";
import SidebarSuperAdmin from "../../components/SidebarSuperAdmin";
import api from "../../services/api";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from "@chakra-ui/icons";
import debounce from "lodash.debounce";
import { useCallback } from "react";

const PriceByCustomer = () => {

    // state for paginations 
    const [dataPrice, setDataPrice] = useState([]);
    const [page, setPage] = useState(1);

    // state for save data customers
    const [nameCustomers, setNameCustomers] = useState([]);

    // state for save data fish 
    const [nameOfFish, setNameOfFish] = useState([]);

    // searchName for getAllPriceByCustomerName
    const [searchName, setSearchName] = useState("");

    // state for handle select name customer on add data
    const [selectedNameCust, setSelectedNameCust]= useState(0);

    // state for handle select name fish on add data
    const [selectedNameFish, setSelectedNameFish] = useState(0);

    // state for save range prices
    const [rangePriceMin, setRangePriceMin] = useState(0);
    const [rangePriceMax, setRangePriceMax] = useState(0);

    // state for save prices
    const [fixPrice, setFixPrice] = useState(0);

    // state id price by customers
    const [idPrice, setIdPrice] = useState();

    // state for save get data by id for updated
    const [dataPriceById, setDataPriceById] = useState();

    // modal open and close add
    const [openAddModal, setOpenAddModal] = useState(false);

    // modal open and close edit
    const [openEditModal, setOpenEditModal]= useState(false);

    // confirmation alert open 
    // delete
    const [openAlertDelete, setOpenAlertDelete] = useState(false);

    // toast for alert 
    const toast = useToast();


    // handle paginated
    const handleNextPage = async() => {
        setPage(page + 1);
        if (searchName !== "") {
            await getAllPriceByCustomerName(searchName, page + 1);
        }
    };

    const handlePreviousPage = async() => {
        if (page > 1) {
            setPage(page -1)
        }

        if (searchName !== "") {
            await getAllPriceByCustomerName(searchName, page - 1);
        }
    };

    // get all data price by customer 
    const getAllPriceData = async () => {
        try {
            const response = await api.get(`/api/v5/price/page?page=${page}`);
            setDataPrice(response.data.payload);
        } catch (error) {
            console.log("Error Fetching data", error);
            toast({
                title: 'Error.!',
                description: 'Internal Server Error',
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'top',
            });
        }
    };

    // get name before throwing name on function getCustomersByName 
    const handleSearchNameForAdd = useCallback(
        debounce((e) => {
            const name = e.target.value;

            if (name !== "") {
                getCustomersByName(name)
            }
        }, 1000),[]
    );

    // get data customers by name 
    const getCustomersByName = async (name) => {
        try {
            const response = await api.get(`/api/v4/cust/search/name?name=${name}`);
            setNameCustomers(response.data.payload.data);
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

    // get name before throwing name on function getFishByName 
    const handleSearchNameForAddFish = useCallback(
        debounce((e) => {
            const name = e.target.value;

            if (name !== "") {
                getFishByName(name);
            }
        }, 1000),[]
    );

    // get all fish name
    const getFishByName = async(name) => {
        try {
            const response = await api.get(`/api/v3/fish/search/name?name=${name}`);
            setNameOfFish(response.data.payload);
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

    // function for set timeout on change in search bar price by customers

    const searchNameRef = useRef();

    const handleSearchName = useCallback(
        debounce( async (e) => {
            const newName = e.target.value;
            setSearchName(newName);

            if (searchNameRef.current) {
                searchNameRef.current.value = newName;
            }

            if (newName !== "") {
                await getAllPriceByCustomerName(newName, page);
            }
        },1000),[],
    );

    // get price cust by name 

    const getAllPriceByCustomerName = async (name, page=1) => {
        try {
            // console.log(page)

            const response = await api.get(`/api/v5/price/name/page?name=${name}&page=${page}`)
            setDataPrice(response.data.payload)
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
    };

    // handle select customer name on add data 
    const handleSelectChangeCustomer = (e) => {
        setSelectedNameCust(e.target.value);
        // console.log(e.target.value)
    };

    // handle select fish name on add data 
    const handleSelectChangeFish = (e) => {
        setSelectedNameFish(e.target.value);
        // console.log(e.target.value)
    };

    // fetch data to get range price
    const GetPricesRange = async () => {
        try {
            // get data fish id
            const fishId = selectedNameFish;
            
            // checking data customers and fish must be valid 
            if (fishId !== 0) {
                const response = await api.get(`/api/v3/fish/${fishId}`);

                // set state for value price 
                if (response.data.status_code === 200){
                    setRangePriceMin(response.data.payload.min_price);
                    setRangePriceMax(response.data.payload.max_price);
                }
            };

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
    };

    // console.log(rangePriceMin)

    // handle get prices input
    const handlePriceInput = (e) => {
        setFixPrice(e.target.value);
    };

    // fetch data to post data price by customers 
    const postDataPrice =  async() => {
        try {
            // check condition and get new data
            if (selectedNameCust !== 0 && selectedNameFish !== 0 && fixPrice !== 0) {
                const newData = {
                    customerId: parseInt(selectedNameCust),
                    fishId: parseInt(selectedNameFish),
                    price: parseInt(fixPrice)   
                 }

                 console.log(newData)

                const response = await api.post(`/api/v5/price`, newData);

                if (response.data.status_code === 200) {
                    toast({
                        title: 'Data created.',
                        description: `${response.data.message}`,
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                        position: "top",
                    })
                        
                    getAllPriceData();
                    setOpenAddModal(false);
                    setSelectedNameCust(0);
                    setSelectedNameFish(0);
                    setRangePriceMin(0);
                    setRangePriceMax(0);
                };
            }
        } catch (error) {
            console.log("Error Fetching data", error);
            if (error.response.data.status_code !== 200) {
                toast({
                    title: 'Error',
                    description: `${error.response.data.message}`,
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position: "top",
                });
            }
        };
    };

    // func handle click before delete data 
    const handleClickDelete = (Id) => {
        setIdPrice(Id);
        setOpenAlertDelete(true);
    };
    // console.log(idPrice)

    // function to delete data 
    const handleDeletePriceByCust = async() => {
        try {
            if (idPrice !== undefined) {
                const response = await api.delete(`/api/v5/price/${idPrice}`);

                // cek if succes
                if (response.data.status_code === 200) {
                    toast({
                        title: `Price Customers with id ${idPrice} deleted.`,
                        description: 'You have successfully deleted the data.',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                        position: 'top',
                    });

                    getAllPriceData();
                }
            }
        } catch (error) {
            console.log("Error Fetching data", error);
            if (error.response.data.status_code !== 200) {
                toast({
                    title: 'Error',
                    description: `${error.response.data.message}`,
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    }

    // handle update click atau edit click
    const handleEditClick = async(Id) => {
        try {
            // check if id is not defind
            if (!Id) {
                toast({
                    title: 'Error',
                    description: `Error Edit Data Id Is Not Defind`,
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position: "top",
                });
            }

            // fetch api
            const response = await api.get(`/api/v5/price/search/${Id}`);

            // 
            if (response.data.status_code === 200) {
                setDataPriceById(response.data.payload[0]);
            }
        } catch (error) {
            console.log("Error Fetching data", error);
            if (error.response.data.status_code !== 200) {
                toast({
                    title: 'Error',
                    description: `${error.response.data.message}`,
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    };

    // get price set timeout
    const handleClickRangePriceEdit = (fishId) => {
        setSelectedNameFish(fishId);
        setTimeout(() => {
           GetPricesRange(); 
        }, 500);
    }

    // handle update data price by customer
    const updateDataPriceByCust = async() => {
        try {
            // get data from the state
            const custId = parseInt(dataPriceById.customerId);
            const fishId = parseInt(dataPriceById.fishId);
            const price = parseInt(fixPrice);
            const id = parseInt(dataPriceById.id);

            const newData = {
                customerId: custId,
                fishId: fishId,
                price: price
            }

            const response = await api.put(`/api/v5/price/${id}`, newData);

            if (response.data.status_code === 200) {
                toast({
                    title: 'Data updated.',
                    description: 'Successfully updated price data.',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                    position: 'top',
                });

                setOpenEditModal(false);
                setDataPriceById();
                setFixPrice(0);
                setRangePriceMin(0);
                setRangePriceMax(0);
            };
        } catch (error) {
            console.log("Error Fetching data", error);
            if (error.response.data.status_code !== 200) {
                toast({
                    title: 'Error',
                    description: `${error.response.data.message}`,
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    }

    // console.log(fixPrice);

    useEffect(() => {
        if (searchName === "") {
            getAllPriceData();
        }
    }, [page, searchName]);

    return(
        <>
        <Box bgColor={"#F5F7FA"} bgSize={"cover"} height={"100vh"} display={"flex"}>
                <SidebarSuperAdmin/>

                <Box margin={"50px"} width={"7xl"} display={"flex"} flexDirection={"column"} marginLeft={"280px"}>
                   
                   <Box marginLeft={"10px"} marginTop={"15px"} >
                        <Heading>Price By Customer</Heading>
                    </Box>

                    <Box padding={"30px"} display={"flex"} flexDirection={"column"} bgColor={"#FFFFFF"} borderRadius={"30px"} marginTop={"40px"} minHeight={"78vh"}>
                        <Flex flexDir={"row"} marginLeft={"13px"} gap={800}>
                            <Box alignSelf={"flex-start"} width={"190px"}>
                                <Text marginBottom={"10px"}>Customer Name</Text>
                                <InputGroup>
                                    <InputLeftElement>
                                        <SearchIcon/>
                                    </InputLeftElement>

                                    <Input placeholder="Customer Name" name="name" onChange={handleSearchName} ref={searchNameRef}></Input>
                                </InputGroup>
                                </Box>

                            <Box alignSelf={"flex-end"}>
                                <Button bgColor={"#4CAF4F"} borderRadius={"10px"} onClick={() => {setOpenAddModal(true)}}>+ Add</Button>
                            </Box>
                        </Flex>
                        
                        <Box bgColor={"whitesmoke"} boxSize={"6xl"} marginTop={"25px"} borderRadius={"20px"} marginLeft={"10px"} paddingBottom={"20px"} minHeight={"51.5vh"} maxHeight={"51.5vh"}>
                        <TableContainer>
                                <Table variant={"striped"} >
                                    <Thead>
                                        <Tr>
                                            <Th>Id</Th>
                                            <Th>Customer Name</Th>
                                            <Th>Fish Name</Th>
                                            <Th>Price</Th>
                                            <Th paddingLeft={"55px"}>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataPrice.data && dataPrice.data.map((prices, index) => (
                                        <Tr key={prices.id}>
                                            <Td>{prices.id}</Td>
                                            <Td>{prices.customer.name}</Td>
                                            <Td>{prices.fish.name}</Td>
                                            <Td>{`Rp. ${prices.price.toLocaleString('id-ID')}`}</Td>
                                            <Td>
                                                <Flex gap={"2"}>
                                                    <Button size={"sm"} colorScheme="blue" borderRadius={"40px"} onClick={() => {setOpenEditModal(true); handleEditClick(prices.id)}} >Edit</Button>
                                                    <Button size={"sm"} colorScheme="red" borderRadius={"40px"} onClick={() => handleClickDelete(prices.id)} >Delete</Button>
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
                                <Text fontWeight={"semibold"} fontSize={"sm"}>Current Pages : {dataPrice.currentPages}</Text>
                            </Box>

                            <Box as="div" marginTop={"7px"}>
                                <Text fontWeight={"semibold"} fontSize={"sm"}>Total Pages : {dataPrice.totalPages}</Text>
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

            {/* modal to add data price by customers  */}
            <Modal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} size={"3xl"}>
                <ModalOverlay backdropBlur={"2px"} backdropInvert={"80%"}>
                    <ModalContent>
                        <ModalHeader>Add Data Price By Customers</ModalHeader>
                        <ModalCloseButton/>
                        
                        <ModalBody>
                            <FormControl isRequired width={"100%"}>
                                <Box width={"70%"}>
                                    <Flex flexDir={"column"} gap={5}>
                                        <Flex gap={8} flexDir={"row"}>
                                            <Box>
                                                <FormLabel>Customer Name</FormLabel>
                                                <Input placeholder="Input Customer Name" type="text" onChange={handleSearchNameForAdd} marginBottom={"20px"}></Input>
                                                <Select placeholder="Select Customer Name" onChange={handleSelectChangeCustomer}> 
                                                    {nameCustomers && nameCustomers.map((customer, index) => (
                                                        <option key={index} value={customer.id}>{customer.name}</option>
                                                    ))}
                                                </Select>
                                            </Box>

                                            <Box> 
                                                <FormLabel>Fish Name</FormLabel>
                                                <Input placeholder="Input Fish Name" type="text" onChange={handleSearchNameForAddFish} marginBottom={"20px"}></Input>
                                                <Select placeholder="Select Fish Name" onChange={handleSelectChangeFish}>
                                                        {nameOfFish && nameOfFish.map((fish, index) => (
                                                            <option key={index} value={fish.id}>{fish.name}</option>
                                                        ))}
                                                </Select>
                                            </Box>
                                        </Flex>

                                        <Box display={"flex"} flexDirection={"row"} gap={8}>
                                            <Box>
                                                <FormLabel>Price Range {rangePriceMin} - {rangePriceMax}</FormLabel>
                                                <Input onChange={handlePriceInput}></Input>
                                            </Box>
                                           
                                            <Box>
                                                <Button marginTop={"31.5px"} onClick={GetPricesRange}>Get Price Range</Button>
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Button onClick={postDataPrice}>Add</Button>
                                        </Box>
                                    </Flex>
                                </Box>
                            </FormControl>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            {/* Alert dialog for delete data */}
            <AlertDialog isOpen={openAlertDelete} onClose={() => setOpenAlertDelete(false)}> 
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                            Delete data
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure to Delete this data ?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={() => setOpenAlertDelete(false)} marginRight={"10px"}>
                                Cancel
                            </Button>

                            <Button colorScheme="red" onClick={() => {setOpenAlertDelete(false); handleDeletePriceByCust();}}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* modal to edit data price by customers  */}
            <Modal isOpen={openEditModal} onClose={() => {setOpenEditModal(false); setRangePriceMin(0); setRangePriceMax(0); setSelectedNameFish(0);}} size={"3xl"}>
                <ModalOverlay backdropBlur={"2px"} backdropInvert={"80%"}>
                    <ModalContent>
                        <ModalHeader>Edit Data Price By Customers</ModalHeader>
                        <ModalCloseButton/>
                        
                        <ModalBody>
                            <FormControl isRequired width={"100%"}>
                                <Box width={"70%"}>
                                    <Flex flexDir={"column"} gap={5}>
                                        <Flex gap={8} flexDir={"row"}>
                                            <Box>
                                                <FormLabel>Customer Name</FormLabel>
                                                <Input type="text" marginBottom={"20px"} value={dataPriceById ? (dataPriceById.customer ? dataPriceById.customer.name : "") : ""}></Input>
                                            </Box>

                                            <Box> 
                                                <FormLabel>Fish Name</FormLabel>
                                                <Input type="text" marginBottom={"20px"} value={dataPriceById ? (dataPriceById.fish ? dataPriceById.fish.name : "") : ""}></Input>
                                            </Box>
                                        </Flex>

                                        <Box display={"flex"} flexDirection={"row"} gap={8}>
                                            <Box>
                                                <FormLabel>Price Range {rangePriceMin} - {rangePriceMax}</FormLabel>
                                                <Input onChange={handlePriceInput} defaultValue={dataPriceById ? (dataPriceById.price ? dataPriceById.price : "") : ""}></Input>
                                            </Box>
                                           
                                            <Box>
                                                <Button marginTop={"31.5px"} onClick={() => {handleClickRangePriceEdit(dataPriceById.fishId)}}>Get Price Range</Button>
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Button onClick={updateDataPriceByCust}>Edit</Button>
                                        </Box>
                                    </Flex>
                                </Box>
                            </FormControl>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}

export default PriceByCustomer;