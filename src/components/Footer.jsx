import { React } from "react";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import logo from "../assets/logo_2.png";
import whatsapp from "../assets/whatsapp.png";

const Footer = () => {

    const maps = "https://www.google.com/maps/place/Ikan+Segar+Pak+Erno/@-7.5406067,110.8163996,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a1769a6db8409:0x504a001f78b92138!8m2!3d-7.540612!4d110.8189745!16s%2Fg%2F11h6s09_7_?entry=ttu";
    const contact = "https://wa.me/6281215267243";
   
    return(
        <>
        <Box h={"35vh"} bgColor={"#263238"} bgSize={"cover"}>
            <Flex>
                <Box display={"flex"} flexDirection={"column"} marginTop={"40px"} marginLeft={"100px"}>
                    <Image src={logo} alt="Solo Mina Corp" width="460px" height="100px"></Image>
                    <Text color={"#FFFFFF"} fontSize={"lg"} fontWeight={"light"} marginTop={"50px"} marginLeft={"15px"}>Copyright © 2023 Solo Mina All rights reserved.</Text>
                </Box>

                <Box display={"flex"} flexDirection={"column"} marginTop={"70px"} marginLeft={"200px"} gap={"5px"}>
                    <Text color={"#FFFFFF"} fontSize={"xl"} fontWeight={"bold"} marginBottom={"10px"}>Company</Text>
                    <Link color={"#FFFFFF"} fontWeight={"light"}>About us</Link>
                    <Link color={"#FFFFFF"} fontWeight={"light"}>Contact us</Link>
                    <Link color={"#FFFFFF"} fontWeight={"light"}>Pricing</Link>
                    <Link color={"#FFFFFF"} fontWeight={"light"}>Blog</Link>
                </Box>

                <Box display={"flex"} flexDirection={"column"} marginTop={"70px"} marginLeft={"200px"} gap={"5px"}> 
                    <Text color={"#FFFFFF"} fontSize={"xl"} fontWeight={"bold"} marginBottom={"10px"}>Address</Text>
                    <Link href={maps} target="_blank" color={"#FFFFFF"} fontWeight={"light"}>
                        Jl. Singosari Tim. No.27, Nusukan, Kec.Banjarsari, Kota Surakarta,<br/>
                        Jawa Tengah 57136
                    </Link>
                    <Link href={contact} target="_blank" marginTop={"30px"} display={"flex"}>
                        <Image src={whatsapp} w={"32px"} h={"32px"}></Image>
                        <Text color={"#FFFFFF"} fontWeight={"normal"} marginLeft={"10px"}>+62 812 1526 7243</Text>
                    </Link>
                </Box>
            </Flex>
        </Box>
        </>
    )
};

export default Footer;