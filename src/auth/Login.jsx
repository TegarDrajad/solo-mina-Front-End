import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Link, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";


const Login = () => {

    const toast = useToast()

    // show and hide password 
    const [showPassword] = useState(false);

    // set username dan password disimpan pada state 
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    // console.log(credentials)
    // functions to input changes 
    const handleInputChanges = (event) => {
        const { name, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    // function untuk login 
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/v2/auth/login', credentials)
            
            // kondisional jika berhasil login
            if (response.status === 200) {
                const token = response.data.token;

                // simpan token pada localstorage 
                localStorage.setItem('access_token', token);
                
                if (response.data.role === 'superadmin') {
                    setTimeout(() => {
                        window.location.href = '/backoffice/dashboard'  
                    }, 2000);

                    // menampilkan alert
                    toast({
                        title: 'Login Succesfull!',
                        description: `Welcome ${response.data.role.charAt(0).toUpperCase()}${response.data.role.slice(1)}`,
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',
                    });
                } 
              
                if (response.data.role === 'admin') {
                    setTimeout(() => {
                        window.location.href = '/admin/dashboard'  
                    }, 2000);

                    // menampilkan alert
                    toast({
                        title: 'Login Succesfull!',
                        description: `Welcome ${response.data.role.charAt(0).toUpperCase()}${response.data.role.slice(1)}`,
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',
                    });
                }
            }else if (response.status === 401) {
                toast({
                    title: 'Invalid Username or Password!',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top'
                });
            }
          
        } catch (error) {
            console.log(error);
            toast({
                title: 'Invalid Username or Password!',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top'
            });
        }
    }

    return(
        <>
            <Box height={"100vh"} bgColor={"#F5F7FA"} bgSize={"cover"}>
                <Center paddingTop={"9%"}>
                    <Box bgColor={"#FFFFFF"} padding={"50px"} display={"flex"} justifyContent={"space-between"} flexDir={"column"}>
                        <Heading textAlign={"center"} fontSize={"2xl"} color={"#00A551"}>Welcome Admin.!</Heading>
                        <Text marginTop={"10px"} color={"#474749"} fontWeight={"normal"} textAlign={"center"}>Please Input Your Username and Password For Get Access</Text>

                        <FormControl marginTop={"30px"}>
                            <FormLabel color={"#7F7E83"} fontWeight={"normal"}>
                                Username
                            </FormLabel>
                            <Input type="text" name="username" value={credentials.username} onChange={handleInputChanges}></Input>

                            <FormLabel marginTop={"20px"} color={"#7F7E83"} fontWeight={"normal"}>
                                Password
                            </FormLabel>
                            <Input type={showPassword ? "text" : "password"} name="password" value={credentials.password} onChange={handleInputChanges}></Input>
                            
                            <Center marginTop={"30px"} >
                                <Button bgColor={"#00A551"} color={"#FFFFFF"} width={"120px"} height={"30px"} borderRadius={"15px"} alignContent={"center"} onClick={handleLogin}>
                                    Login
                                </Button>
                            </Center>
                        </FormControl>

                        <Center gap={"5px"} marginTop={"30px"}>
                            <Text color={"#474749"} fontWeight={"normal"}>Forgot Password ?</Text>
                            <Link color={"#00A551"} textDecoration={"underline"} href="/forgotPassword">Click here</Link>
                        </Center>
                    </Box>
                </Center>
            </Box>
        </>
    )
};

export default Login;