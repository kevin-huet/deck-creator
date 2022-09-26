import type {NextPage} from 'next'
import {
    Button,
    Container,
    Stepper,
    Group,
    Card,
    Center,
    TextInput,
    Grid,
    PasswordInput,
    Col,
    Text,
} from '@mantine/core';
import {useEffect, useState } from "react";
import OtpInput from "react18-input-otp";
import axios, {AxiosError} from "axios";
import {useForm, UseFormReturnType} from "@mantine/form";
import Link from "next/link";
import {RegisterFormType} from "../../types/form.types";

const Register: NextPage = () => {
    const [active, setActive] = useState(0);
    const [code, setCode] = useState('');
    const [csrf, setCsrf] = useState('');
    const [registerForm, setRegisterForm] = useState<UseFormReturnType<RegisterFormType>>();
    const handleChange = (code: string) => setCode(code);
    const nextStep = () => setActive((current: number) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current: number) => (current > 0 ? current - 1 : current));
    useEffect(() => {
        axios.get('http://localhost:3000/csrf', {withCredentials: true})
            .then((r) => {
                setCsrf(r.data?.csrf);
            });
    }, []);

    function sendCode() {
        axios.post('http://localhost:3000/auth/code', {
            email: registerForm?.values.email,
            code
        }, {
            withCredentials: true,
            headers: {
                'CSRF-Token': csrf
            }
        }).then(() => {
            nextStep();
        })
    }
    return (
        <>
            <Container>
                <Card withBorder px="md" sx={{minHeight: 500}}>
                    <Card.Section p="md" withBorder>
                        <Stepper active={active}>
                            <Stepper.Step label="Create Account" description=""/>
                            <Stepper.Step label="Verify" description=""/>
                            <Stepper.Step label="Completed" description=""/>
                        </Stepper>
                    </Card.Section>
                    <Card.Section py={40} px={20}>
                        {active === 1 ?
                            <>
                                <Center mt='md'>
                                    <Text align={"center"}>A code has been sent to your inbox. Please enter it to continue your registration</Text>
                                </Center>
                                <Center mt='md'><CodeInput code={code} handleChange={handleChange}></CodeInput></Center>
                                <Center mt='md'>
                                    <Text>Code non reçu ? <Link href={''} ><a style={{ color: 'slateblue'}}>Envoyer un nouveau code</a></Link></Text>
                                </Center>
                            </>
                            : active === 0 ? <Grid><Col span={10} offset={1} sm={6} offsetSm={3}><RegisterForm csrf={csrf}
                                setForm={setRegisterForm} nextStep={nextStep}/></Col></Grid> : <></>
                        }
                    </Card.Section>
                    <Group position={"center"}>
                        <Group style={{position: 'absolute', bottom: 15}}>
                            <Button variant="default" onClick={prevStep}>Back</Button>
                            {active === 0 &&
                                <Button  type={'submit'} form={'register'}>Next step</Button>
                            }
                            {active !== 0 &&
                                <Button onClick={active === 1 ? sendCode : nextStep}>Next step</Button>
                            }
                        </Group>
                    </Group>
                </Card>
            </Container>
        </>
    )
}

export const CodeInput = ({code, handleChange}: any, props: { size: number }) => {
    return (
        <>
            <OtpInput
                value={code}
                onChange={handleChange}
                numInputs={6}
                separator={<span style={{width: "8px"}}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                inputStyle={{
                    border: "1px solid transparent",
                    backgroundColor: 'gray',
                    borderRadius: "8px",
                    width: "50px",
                    height: "50px",
                    fontSize: "14px",
                    color: "#000",
                    fontWeight: "400",
                }}
                focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none"
                }}/>
        </>
    )
}

export const RegisterForm = ({ setForm, csrf, nextStep } : {setForm: Function, csrf: string, nextStep?: Function}) => {
    const form = useForm<RegisterFormType>({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    });
    async function registerRequest(values: RegisterFormType) {
        console.log('test')
        try {
            await axios.post('http://localhost:3000/auth/register', {
                ...values
            }, {
                withCredentials: true,
                headers: {
                    'CSRF-Token': csrf
                }
            });

        } catch (e: any) {
            console.log(e.response.data)
        }
    }

    return (
        <>
            <form id={'register'} onSubmit={form.onSubmit(registerRequest)}>
                <TextInput placeholder="email" label="Email" {...form.getInputProps('email')} required/>
                <TextInput placeholder="username" label="Username" {...form.getInputProps('username')} required/>
                <PasswordInput placeholder="Password" label="Password" {...form.getInputProps('password')} required/>
                <PasswordInput placeholder="Password" label="Confirm Password" {...form.getInputProps('confirmPassword')} required/>
            </form>
        </>
    )
}

export default Register;