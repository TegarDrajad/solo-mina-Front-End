import React, { useEffect, useState } from "react";
import { Flex, Box, Spacer, Link, Img, Button, IconButton } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import "../styles/NavBar.css";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

const NavBar = () => {

    const [display, changeDisplay] = useState('none');
    const contact = "https://wa.me/6281215267243";
   
    return(
        <>
        <Flex>
            <Flex position={"fixed"} top={"1rem"} right={"1rem"} align={"center"}>
                {/* Desktop */}
                <Flex display={['none','none', 'flex', 'flex']}>
                    <Flex top="0" left="0" right="0" zIndex="999" justifyContent='space-between' className="myNavBar">
                        <Box paddingLeft="40px" color="white" display="flex">
                            <Link href='/'>
                                <Img src={logo} alt="Solo Mina Corp" width="200px" height="200px" borderRadius="5px"></Img>
                            </Link>
                        </Box>
                        <Spacer/>
                        <Box display="flex" justifyContent="space-between" gap="20px" alignContent="flex-end" paddingRight="20px">
                            <Link color="black" href="/">
                                Home 
                            </Link>
                            <Link color="black" href="/aboutus">
                                About 
                            </Link>
                            <Link color='black' href="/faq">
                                FAQ
                            </Link>
                            <Link color='black' href={contact} target="blank">
                                Contact 
                            </Link>
                        </Box>
                        <Box display="flex" alignItems="center" gap="20px" justifyContent="space-between" paddingRight="40px">
                            <Link href="/login">
                                <Button bgColor="#4CAF4F" color="black" variant="solid">Login</Button> 
                            </Link>
                        </Box>
                    </Flex>
                </Flex>

                {/* Mobile */}
                <IconButton aria-label="Open Menu" size={"lg"} mr={2} icon={<HamburgerIcon/>} onClick={() => changeDisplay('flex')} display={['flex', 'flex', 'none', 'none']}></IconButton>
            </Flex>
            {/* Mobile Content */}
                <Flex direction={"column"} display={display} w={"100vw"} bgColor={"gray.50"} zIndex={20} h={"100vh"} pos={"fixed"} top={"0"} left={"0"} overflowY={"auto"}>
                    <Flex justify={"flex-end"}>
                        <IconButton mt={2} mr={2} aria-label="Open Menu" size={"lg"} icon={<CloseIcon/>} onClick={() => changeDisplay('none')}/>
                    </Flex>

                    <Flex direction={"column"} align={"center"}> 
                        <Link href="/">
                            <Button variant={"ghost"} aria-label="Home" my={5} w={"100%"}>
                                Home
                            </Button>
                        </Link>

                        <Link href="/aboutus">
                            <Button variant={"ghost"} aria-label="About" my={5} w={"100%"}>
                                About
                            </Button>
                        </Link>

                        <Link href="/faq">
                            <Button variant={"ghost"} aria-label="FAQ" my={5} w={"100%"}>
                                FAQ
                            </Button>
                        </Link>

                        <Link href={contact}>
                            <Button variant={"ghost"} aria-label="Contact" my={5} w={"100%"}>
                                Contact
                            </Button>
                        </Link>

                        <Link href="/login">
                            <Button variant={"ghost"} aria-label="Login" my={5} w={"100%"} textColor={"#4CAF4F"}>
                                Login ?
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
        </Flex>
        </>
    )
};

export default NavBar;