import type {NextPage} from 'next'
import {Button, Card, Col, Container, Grid, Box, useMantineColorScheme, Radio, Switch} from '@mantine/core';
import Image from "next/image";
import Head from "next/head";
import {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";

const UserPage: NextPage = () => {
    const [user, setUser]: any = useState(null)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        fetch('http://localhost:8000/api/auth/user')
            .then((res) => res.json())
            .then((data) => {
                setUser(data?.user);
                setLoading(true);
            })
    })
    return (
        <>
            <Head>
                <title>Account</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Container>
                <Card>
                    {user?.username}
                </Card>
            </Container>
        </>
    )
}


export default UserPage;
