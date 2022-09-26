import type {NextPage} from 'next'
import {Button, Card, Col, Container, Grid, Box, useMantineColorScheme} from '@mantine/core';
import Image from "next/image";
import Head from "next/head";
import {useEffect, useState} from "react";
import {hsClassType} from "../types/hearthstone.types";
import Link from "next/link";

const Home: NextPage = ({data}: any) => {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const elements = data?.classes?.map((e: hsClassType) => {
        if (e.slug !== 'neutral')
            return classElement(e)
    });

    useEffect(() => {
            return () => {
            };
        },
    );

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Container>
                <Card withBorder={(colorScheme !== 'dark')}>
                    <Grid>
                        {elements}
                    </Grid>
                </Card>
            </Container>
        </>
    )
}

const classElement = (hsClass: hsClassType) => {
    return (
        <Col span={6} xs={4} sm={4} md={3} lg={3} key={hsClass.id} className={'hvr-grow'}>
            <Link href={`/decks/new/${hsClass.slug}`} className={'hvr-grow'}>
                <a>
                    <Image
                        src={`/images/hearthstone/classes/${hsClass.slug}.webp`}
                        layout={'responsive'}
                        width={'250'}
                        height={'100%'}
                        alt="Norway"
                    />
                    <div style={{width: '250', background: 'royalblue', textAlign: 'center', paddingTop: '10'}}>{hsClass.name}</div>
                </a>
            </Link>
        </Col>
    );
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/hearthstone/classes`)
    const data = await res.json()

    // Pass data to the page via props
    return {props: {data}}
}

export default Home
