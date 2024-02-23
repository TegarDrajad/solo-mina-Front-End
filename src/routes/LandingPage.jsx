import { Box, Button, Heading, SimpleGrid, Image, Center, Flex, Card, CardBody, Stack, Text} from "@chakra-ui/react";
import { ArrowDownIcon } from '@chakra-ui/icons'
import React from "react";
import NavBar from "../components/Navigasi";
import Footer from "../components/Footer";
import fish from "../assets/fish.png";
import arrow from "../assets/arrow.png";
import lotte from "../assets/lottemart.png";
import cianjur from "../assets/cianjur.png";
import pandowo from "../assets/pandowo.png";
import orient from "../assets/orient.png";
import mangEngking from "../assets/mangengking.png";
import nila from "../assets/ikan-nila.png";
import mas from "../assets/ikan-mas.png";
import gurame from "../assets/ikan-gurame.png";

const LandingPage = () => {

    //images 
    const fadeImages = [
        {
            url: lotte,
            alt: "lottemart",
        },
        {
            url: cianjur,
            alt: 'cianjur'
        },
        {
            url: pandowo,
            alt: "pandowo"
        },
        {
            url: orient,
            alt: "orient"
        },
        {
            url: mangEngking,
            alt: "mangEngking"
        },
    ];

    return(
        <>
        <NavBar/>
        {/* <Box height="100vh" position="relative" bgSize="cover" bgImage="linear-gradient(to bottom, #F5F7FA , transparent)"> */}
        <Box height="100vh" bgSize="cover" bgColor="#F5F7FA" marginTop={"10vh"}>
            <SimpleGrid columns={2} spacing={10}>
                <Box paddingLeft='60px' >
                    <Heading fontSize='8xl' paddingTop='52' as='h1' textColor="#4D4D4D"> Solo Mina Fish </Heading>
                    <Heading paddingTop='6' size='2xl' as='h3' textColor='#4CAF4F'> 21 years journey</Heading>
                    <Heading paddingTop='8' as='h3' size={"xl"}>Fish Consumption Supplier</Heading>
                    <Box paddingTop='10'>
                        <Button size='lg' bgColor='#4CAF4F' textColor='white'>Contact</Button>
                    </Box>
                </Box>
                <Box paddingTop='44' paddingLeft='32'>
                    <Image src={fish} alt="fish assets" width='450px' height='450px'></Image>
                </Box>
            </SimpleGrid>
            {/* <Flex justifyContent='flex-end' marginTop='60px'>
                <Image src={arrow} boxSize="40px"></Image>
            </Flex> */}
        </Box>

        <Box height='130vh'position="relative" bgColor="#FFFFFF" bgSize="cover" marginTop='20px'>
            <Center textColor="#4D4D4D" fontWeight='semibold' fontSize='2xl'>
                Our Customers
            </Center>
            <Center textColor="#4D4D4D" fontWeight='normal' fontSize='xl'>
                We have been supplied with some 100+ customers
            </Center>

            <Box display="flex" justifyContent="space-between" marginTop="60px">
                    {fadeImages.map((image, index) => (
                        <Image key={index} src={image.url} alt={image.alt} width="220px" height="140px"></Image>
                    ))}
            </Box>

            <Box marginTop="70px">
                <Center textColor='#4D4D4D' fontSize='xl' fontWeight='semibold'>
                    Helping a local business with
                </Center>
                <Center textColor='#4CAF4F' fontSize='xl' fontWeight='semibold'>
                    supply fish such as our product <ArrowDownIcon marginTop={"5.5px"} color={"blackAlpha.700"}/>
                </Center>
            </Box>

            <Box>
                <Flex marginLeft={"100px"} marginRight={"100px"} marginTop={"50px"} justifyContent={"space-between"}>
                    <Card size="sm" borderRadius={"30px"} variant={"outline"} borderWidth={"3px"} borderColor={"blackAlpha.700"}>
                        <CardBody>
                            <Box  w={"330px"} h={"230px"}>
                                <Image src={nila} alt="ikan-nila" borderRadius="2xl" textAlign={"center"}></Image>
                            </Box>
                           
                            <Stack>
                                <Heading textAlign={"center"} fontSize={"x-large"} marginBottom={"10px"} marginTop={"-10px"}>Red Snapper</Heading>
                                <Text textAlign={"center"} marginBottom={"30px"}>Red snapper is a type of fish <br/>
                                    which is easy to develop and many <br/>
                                    people are interested in it.</Text>
                            </Stack>
                        </CardBody>
                    </Card>

                    <Card size="sm" borderRadius={"30px"} variant={"outline"} borderWidth={"3px"} borderColor={"blackAlpha.700"}>
                        <CardBody>
                            <Image src={mas} alt="ikan-mas" marginTop={"45px"} w={"330px"} h={"150px"} textAlign={"center"}></Image>

                            <Stack>
                                <Heading textAlign={"center"} fontSize={"x-large"} marginBottom={"20px"} marginTop={"25px"}>Gold Fish</Heading>
                                <Text textAlign={"center"} marginBottom={"30px"}>In Indonesia, goldfish are widespread <br/>
                                    cultivated by local cultivators<br/> </Text>
                            </Stack>
                        </CardBody>
                    </Card>

                    <Card size="sm" borderRadius={"30px"} variant={"outline"} borderWidth={"3px"} borderColor={"blackAlpha.700"}>
                        <CardBody>
                                <Image src={gurame} alt="ikan-gurame" marginTop={"15px"}  w={"330px"} h={"210px"}></Image>
                            <Stack>
                                <Heading textAlign={"center"} fontSize={"x-large"} marginBottom={"2 0px"} marginTop={"-10px"}>Carp Fish</Heading>
                                <Text textAlign={"center"} marginBottom={"30px"}>Gourami or gourami (Osphronemus <br/>
                                    gouramy) is a type of freshwater fish<br/>
                                    which is popular as food fish in <br/>
                                    Southeast Asia and South Asia</Text>
                            </Stack>
                        </CardBody>
                    </Card>
                </Flex>

                <Center marginTop={"20px"}>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>etc.</Text>
                </Center>
            </Box>
        </Box>
        <Footer/>
        </>
    )
};

export default LandingPage;