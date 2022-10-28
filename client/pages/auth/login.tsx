import type {NextPage} from 'next'
import {Button, Container, Card, Text, TextInput, PasswordInput, Grid, Col, Center} from '@mantine/core';
import {useForm, UseFormReturnType} from "@mantine/form";
import axios from "axios";
import Head from "next/head";
import {IconArrowAutofitWidth, IconSwitchHorizontal} from "@tabler/icons";
import {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {AuthContext, AuthUser} from "../../lib/providers/auth.provider";

const Login: NextPage = () => {
    const router = useRouter();
    const {auth, setAuth, login} = useContext(AuthContext);
    const socials = [
        {name: 'Google', href: 'http://localhost:8000/auth/social/google'},
        {name: 'Discord', href: 'https://discord.com/api/oauth2/authorize?client_id=909446763650383933&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify'},
        {name: 'Twitter', href: 'http://localhost:3000/auth/test'},
    ];

    useEffect(() => {
        if (auth.isLogged) {
            router.push('/').then();
        }
    })
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Container>
                <Card withBorder>
                    <Card.Section withBorder={true} inheritPadding py="xs">
                        <Text align={"center"}>Login</Text>
                    </Card.Section>
                    <Card.Section m={'sm'}>
                        <Grid>
                            <Col span={5}>
                                <LoginForm/>
                            </Col>
                            <Col span={2}>
                                <Center style={{height: 150}}>
                                    <IconSwitchHorizontal/>
                                </Center>
                            </Col>
                            <Col span={5}>
                                <LoginSocial socials={socials}/>
                            </Col>
                        </Grid>
                    </Card.Section>
                </Card>
            </Container>
        </>
    )
}

const LoginSocial = ({socials}: any) => {
    const loginRequest = async (href: any) => {
        axios.get(href).then((res) => console.log(res))
        //await new SocialAuthService().googleAuth();
    }
    const {auth, setAuth, login} = useContext(AuthContext);
    useEffect(() => {

    }, []);
    return (
        <>
            <Grid>
                {socials.map((social: any) => (
                    <Col key={social.name}>
                        <a href={social.href}>
                            <Button variant="gradient" gradient={{from: 'indigo', to: 'cyan'}}>{social.name}</Button>
                        </a>
                    </Col>
                ))}
            </Grid>
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
    const {login} = useContext(AuthContext);
    const auth = async (values: any) => {
        axios.post('http://localhost:3000/auth/login', {
            email: values.email,
            password: values.password
        }, {
            withCredentials: true,
        }).then(r => {
            login({ isLogged: true, username: r.data.user.username } as AuthUser)
        }).catch();
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