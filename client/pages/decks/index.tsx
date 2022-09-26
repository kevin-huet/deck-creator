import type {NextPage} from 'next'
import {Button, Container} from '@mantine/core';
import Head from "next/head";

const Decks: NextPage = () => {
    return (
        <>
            <Head>
                <title>Decks</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                <Button>Decks</Button>
            </Container>
        </>
    )
}

export default Decks