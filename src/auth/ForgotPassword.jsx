import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Link, Text, Wrap } from "@chakra-ui/react";


const Login = () => {

    return(
        <>
            <Box height={"100vh"} bgColor={"#F5F7FA"} bgSize={"cover"}>
                <Center paddingTop={"7%"}>
                    <Box bgColor={"#FFFFFF"} padding={"50px"} display={"flex"} justifyContent={"space-between"} flexDir={"column"}>
                        <Heading textAlign={"center"} fontSize={"2xl"} color={"#00A551"}>Set New Password.!</Heading>
                        <Text marginTop={"10px"} color={"#474749"} fontWeight={"normal"} textAlign={"center"}>Please enter your new password and make sure you <br/>
                        remember the password</Text>

                        <FormControl marginTop={"30px"}>
                            <FormLabel color={"#7F7E83"} fontWeight={"normal"}>
                                Username
                            </FormLabel>
                            <Input type="text"></Input>

                            <FormLabel marginTop={"20px"} color={"#7F7E83"} fontWeight={"normal"}>
                                New Password
                            </FormLabel>
                            <Input type="text"></Input>

                            <FormLabel marginTop={"20px"} color={"#7F7E83"} fontWeight={"normal"}>
                                Confirm New Password
                            </FormLabel>
                            <Input type="text"></Input>

                            <Center marginTop={"30px"} >
                                <Button bgColor={"#00A551"} color={"#FFFFFF"} width={"120px"} height={"30px"} borderRadius={"15px"} alignContent={"center"}>
                                    Submit
                                </Button>
                            </Center>
                        </FormControl>
                    </Box>
                </Center>
            </Box>
        </>
    )
};

export default Login;