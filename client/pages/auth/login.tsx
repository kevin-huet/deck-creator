import type {NextPage} from 'next'
import {Button, Container, Card, Text, TextInput, PasswordInput, Grid, Col, Center} from '@mantine/core';
import {useForm, UseFormReturnType} from "@mantine/form";
import axios from "axios";
import Head from "next/head";

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                <Card withBorder>
                    <Card.Section withBorder>
                        <Text align={"center"}>Login</Text>
                    </Card.Section>
                    <Card.Section>
                        <Grid>
                            <Col offset={3} span={6}>
                                <LoginForm/>
                            </Col>
                        </Grid>
                    </Card.Section>
                </Card>
            </Container>
        </>
    )
}

const LoginForm = () => {
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        }
    });
    const auth = async (values: any) => {
        console.log(values);
        await axios.post('http://localhost:3000/auth/login', {
            email: values.email,
            password: values.password
        });
    }
    return (
        <form onSubmit={form.onSubmit(auth)}>
            <TextInput placeholder="email" label="Email" {...form.getInputProps('email')} required/>
            <PasswordInput placeholder="Password" label="Password" {...form.getInputProps('password')} required/>
            <Button my={12} type="submit" variant="gradient" gradient={{from: 'indigo', to: 'cyan'}}>Login</Button>
        </form>
    )
}

export default Login;