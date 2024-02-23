import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, Image, Link, Text, useDisclosure, useToast } from "@chakra-ui/react";
import logo from "../assets/logo_2.png";
import logout from "../assets/logoutIcon.svg";
import { useLocation } from "react-router-dom";

// icon
import DashboardIcon from "../assets/dashboardIcon.svg";
import SalingInformation from "../assets/salingInformation.svg";
import AddDataSaling from "../assets/addDataSaling.svg";
import AdminData from "../assets/adminHandle.svg";
import CustomerData from "../assets/CustomerHandle.svg";
import fishData from "../assets/fish-data.svg";
import priceByCustomer from "../assets/priceByCustomer.svg";
import React from "react";

const Sidebar = () =>{

    // Sidebar Menus

    const SideBarMenusSuperAdmin = [
        {
            path: "/backoffice/dashboard",
            name: "Dashboard",
            icon: DashboardIcon,
        },
        {
            path: "/backoffice/salesInfo",
            name: "Selling Data",
            icon: SalingInformation,
        },
        {
            path: "/backoffice/addDataSale",
            name: "Add Selling Data",
            icon: AddDataSaling,
        },
        {
            path: "/backoffice/adminManajemen",
            name: "Users Data",
            icon: AdminData,
        },
        {
            path: "/backoffice/customerManajemen",
            name: "Customer Data",
            icon: CustomerData,
        },
        {
            path: "/backoffice/fishData",
            name: "Fish Data",
            icon: fishData,
        },
        {
            path: "/backoffice/priceByCustomer",
            name: "Price By Customer",
            icon: priceByCustomer,
        },
    ];

    const {pathname} = useLocation();

    const toast = useToast()

    // alert dialog
    const {isOpen, onOpen, onClose} = useDisclosure()
    const cancelRef = React.useRef()

    // logout function remove token 
    const handleLogout = async () => {
        // remove token from localstorage
        try {
            await localStorage.removeItem('access_token');
    
            onClose();
    
            // alert 
            toast({
                title: "You're Loggin Out!",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });
    
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000);
            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <Box height={"100vh"} bgColor={"black"} textColor={"white"} width={"220px"} position={"fixed"}>
           <Image src={logo} marginLeft={"10px"} marginTop={"65px"}></Image>

           <Flex direction={"column"} justifyContent={"space-between"}>
                <Box paddingTop={"80px"} paddingLeft={"30px"}>
                    {SideBarMenusSuperAdmin.map((menu) => (
                        <Link key={menu.path} href={menu.path}>
                            <Flex alignItems={"center"} gap={"3"} marginBottom={"9"} cursor={"pointer"}>
                                <Image src={menu.icon} alt={menu.name}></Image>
                                <Text color={pathname.includes(menu.path) ? "#3686F7" : "white"} fontWeight={pathname.includes(menu.path) ? "700" : "500"} > 
                                    {menu.name}
                                </Text>
                            </Flex>
                        </Link>
                    ))}
                </Box>
           </Flex>

           <Box marginTop={"50px"} paddingLeft={"30px"}>
                <Flex direction={"row"} gap={"3"} cursor={"pointer"}>
                    <Image src={logout} alt="logout"></Image>
                    <Text color={"#FF4B05"} fontWeight={"700"} onClick={onOpen}>Logout</Text>
                </Flex>
           </Box>
        </Box>

        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Logout
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure you want to log out?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>

                        <Button colorScheme="green" onClick={handleLogout} marginLeft={3}> 
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>
    )
};

export default Sidebar;