import type {NextPage} from 'next'
import {Button, Text, Center, Card, Col, Container, Grid, Box, useMantineColorScheme, Switch} from '@mantine/core';
import Image from "next/image";
import Head from "next/head";
import {useEffect, useState} from "react";
import {hsClassType} from "../types/hearthstone.types";
import Link from "next/link";

const Home: NextPage = ({classes}: any) => {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const [checked, setChecked] = useState(true);
    const elements = classes?.map((e: hsClassType) => {
        if (e.slug !== 'neutral')
            return classElement(e, checked)
    });

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Container>
                <Card withBorder={(colorScheme !== 'dark')}>
                    <Card.Section withBorder inheritPadding py="xs">
                        <Center>
                            <Text weight={500}>Hero Class Selection</Text>
                        </Center>
                    </Card.Section>
                    <Card.Section  p={'sm'}>
                        <Grid>
                            {elements}
                        </Grid>
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="xs">
                        <Center>
                            <Switch
                                onChange={(event) => setChecked(event.currentTarget.checked)}
                                checked={checked} onLabel="Standard" offLabel="Wild" size={'lg'}
                            />
                        </Center>
                    </Card.Section>
                </Card>
            </Container>
        </>
    )
}

const classElement = (hsClass: hsClassType, checked: boolean) => {
    return (
        <Grid.Col span={6} xs={4} sm={4} md={3} lg={3} key={hsClass.id} className={'hvr-grow'}>
            <Link href={`/decks/new/${hsClass.slug}?mode=${checked ? 'standard' : 'wild'}`} className={'hvr-grow'}>
                <a>
                    <Image
                        src={`/images/hearthstone/classes/${hsClass.slug}.webp`}
                        layout={'responsive'}
                        width={'250'}
                        height={'100%'}
                        alt="Norway"
                    />
                    <div style={{
                        width: '250',
                        background: 'royalblue',
                        textAlign: 'center',
                        paddingTop: '10'
                    }}>{hsClass.name}</div>
                </a>
            </Link>
        </Grid.Col>
    );
}

Home.getInitialProps = () => {
    return fetch('http://localhost:8000/api/hearthstone/classes')
        .then(res => res.json())
}

export default Home
