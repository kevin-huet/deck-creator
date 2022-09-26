import type {NextPage} from 'next'
import {
    BackgroundImage,
    Stack,
    Text,
    Card,
    Box,
    Col,
    Button,
    Container,
    Grid,
    Pagination,
    Center,
    Skeleton, TextInput
} from '@mantine/core';
import Head from "next/head";
import {useRouter} from "next/router";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {CardMenu} from "../../../components/hearthstone/CardMenu";
import {CardType, hsClassType} from "../../../types/hearthstone.types";
import {Input} from "postcss";

const NewDeck: NextPage = () => {
    const router = useRouter();
    const {heroClass} = router.query;
    const [cards, setCards] = useState([]);
    const [hsClass, setHsClass] = useState<hsClassType>();
    const [deckCards, setDeckCards] = useState<CardType[]>([]);
    const [activePage, setPage] = useState(1);

    useEffect(() => {
        if (heroClass && activePage > 0)
            fetch(`http://localhost:3000/hearthstone/cards?page=${activePage}&cardClass=${heroClass}`)
                .then((res) => res.json())
                .then((data) => {
                    setCards(data?.cards)
                    setHsClass(data?.hsClass)
                })
    }, [activePage, heroClass])
    return (
        <>
            <Head>
                <title>Decks</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Container size="xl">
                <Card withBorder>
                    <Card.Section withBorder={true} inheritPadding py="xs">
                        <Text align={"center"} weight={500}>Review pictures</Text>
                    </Card.Section>
                    <Card.Section p="xs">
                        <Grid>
                            <Col span={9}>
                                <Card withBorder>
                                    <Card.Section withBorder={true}>
                                        <Text align={"center"} weight={500} py="xs">Cards - Neutral
                                            and {hsClass?.name}</Text>
                                    </Card.Section>
                                    <Card.Section sx={{overflowY: 'auto', overflowX: "hidden", height: 600}} py="xs"
                                                  px="xs">
                                        <CardList setDeckCards={setDeckCards} cards={cards}/>
                                    </Card.Section>
                                    <Card.Section withBorder={true}>
                                        <Center py="md"><Pagination page={activePage} onChange={(nb) => {
                                            setPage(nb);
                                        }} total={10} radius="md"/></Center>
                                    </Card.Section>
                                </Card>
                            </Col>
                            <Col span={3}>
                                <Card withBorder={true}>
                                    <Card.Section withBorder={true}>
                                        <Text align={"center"} weight={500} py="xs">Deck</Text>
                                    </Card.Section>
                                    <Card.Section sx={{overflowY: 'auto', height: 600}} py="xs" px="xs">
                                        <HsCardStack setDeckCards={setDeckCards} deckCards={deckCards}/>
                                    </Card.Section>
                                    <Card.Section withBorder={true} px={'sm'} py={'sm'}>
                                            <TextInput my={'sm'} placeholder="deckCode" value={'Generate your deck code'} contentEditable={false}/>
                                            <Button mr={'sm'} variant="gradient"
                                                    gradient={{from: 'indigo', to: 'cyan'}}>Encode</Button>
                                    </Card.Section>
                                </Card>
                            </Col>
                        </Grid>
                    </Card.Section>
                </Card>
            </Container>
        </>
    )
}

export const HsCardStack = ({deckCards, setDeckCards}: any) => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [cardTarget, setTarget] = useState(undefined);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0})
    const removeCardFromDeck = (card: CardType) => {
        setDeckCards(deckCards.filter((item: CardType) => item.blizzard_id !== card.blizzard_id))
        setMenuOpened(false)
    }
    const moveMenu = (e: MouseEvent) => {
        setMenuPosition({x: e.clientX, y: e.clientY});
    }
    useEffect(() => {
        const concernedElement = document.querySelector(".click-event-deck");
        document.addEventListener("mousedown", (event) => {
            if (!concernedElement?.contains((event.target as Node))) {
                setMenuOpened(false);
            }
        });
    }, [])
    return (
        <>
            <CardMenu menuType={'menu-deck'} removeCardFromDeck={removeCardFromDeck} position={menuPosition}
                      card={cardTarget} opened={menuOpened}/>

            <Stack>
                {deckCards?.map((card: any, index: number) => {
                    return (
                        <Box className={'click-event-deck'} onClick={(e: any) => {
                            setMenuOpened(true);
                            setTarget(card);
                            moveMenu(e)
                        }} sx={{width: "100%"}} mx="auto" key={index}>
                            <BackgroundImage
                                src={(card.cropImage) ? card.cropImage : card.image}
                                radius="sm"
                                sx={{height: 45}}
                                style={{alignItems: "center", display: "flex"}}
                            >
                                <Box sx={{background: 'black', width: 'max-content', borderRadius: 10}} mx="xs" px="xs"
                                     py={2}>
                                    <Text align={"left"}>{card.manaCost}</Text>
                                </Box>
                                <Box sx={{background: 'black', width: 'max-content', borderRadius: 10}} px="xs"
                                     py={2}>
                                    <Text align={"center"}>{card.name}</Text>
                                </Box>
                            </BackgroundImage>
                        </Box>
                    )
                })}
            </Stack>
        </>
    )
}

export const CardList = ({cards, setDeckCards}: any) => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [target, setTarget] = useState(undefined);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0})
    const moveMenu = (e: MouseEvent) => {
        setMenuPosition({x: e.clientX, y: e.clientY});
    }
    const addCardToDeck = (card: CardType) => {

        setDeckCards((oldArray: CardType[]) => [...oldArray, card])
        setMenuOpened(false)
    }
    useEffect(() => {
        const concernedElement = document.querySelector(".click-event-card");
        document.addEventListener("mousedown", (event) => {
            if (!concernedElement?.contains((event.target as Node))) {
                setMenuOpened(false);
            }
        });
    }, [])
    return (
        <>
            <CardMenu menuType={'menu-card'} addCardToDeck={addCardToDeck} position={menuPosition}
                      card={target} opened={menuOpened}/>
            <Grid gutter="md" className={'click-event-card'}>
                {cards?.map((card: any) => {
                    return (
                        <Col onClick={(e) => {
                            setMenuOpened(true)
                            setTarget(card);
                            moveMenu(e as any);
                        }} span={6} sm={4} md={3} lg={2} key={card.id} className={'hvr-grow'}>
                            <HsCard card={card}/>
                        </Col>
                    )
                })}
            </Grid>
        </>
    )
}

export const HsCard = ({card}: any) => {
    const [isLoaded, setIsLoaded] = useState(false)
    return (
        <Skeleton visible={!isLoaded}>
            <Image
                onLoadingComplete={() => {
                    setIsLoaded(true)
                }}
                alt={card.name}
                src={card.image}
                layout={'responsive'}
                width={'100%'}
                height={'150'}
            />
        </Skeleton>
    )
}

export default NewDeck