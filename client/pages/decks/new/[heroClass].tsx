import type { NextPage } from "next";
import {
  Text,
  Card,
  Col,
  Button,
  Container,
  Grid,
  Pagination,
  Center,
  TextInput,
} from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { forwardRef, useEffect, useState } from "react";
import { CardType, hsClassType } from "../../../types/hearthstone.types";
import { useForm } from "@mantine/form";
import axios from "axios";
import { getDeckCode } from "../../../services/hearthstone/deck.service";
import { SearchCardForm } from "../../../components/hearthstone/SearchCardForm";
import { HsCardStack } from "../../../components/hearthstone/HsCardStack";
import { CardList } from "../../../components/hearthstone/CardList";
import { searchCard } from "../../../services/hearthstone/card.service";

const NewDeck: NextPage = ({ metadata }: any) => {
  const router = useRouter();
  const { heroClass, mode } = router.query;
  const [code, setCode] = useState("");
  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [nbPerPage, setNbPerPage] = useState(36);
  const [hsClass, setHsClass] = useState<hsClassType>({
    id: 0,
    slug: "",
    name: "",
    blizzard_id: 0,
  });
  const [deckCards, setDeckCards] = useState<CardType[]>([]);
  const [activePage, setPage] = useState(1);
  const form = useForm({
    initialValues: {
      name: "",
      cost: -1,
      rarity: "",
      keyword: "",
      cardType: "",
      minionType: "",
    },
    validate: {},
  });
  const search = (values: any, resetPage?: boolean) => {
    if (resetPage) setPage(1);
    searchCard({
      ...form.values,
      cardClass: heroClass,
      activePage,
      setGroup: mode,
    }).then((res) => {
      setHsClass(res.data?.hsClass);
      setCards(res.data?.cards);
      setCardCount(res.data?.count);
    });
  };

  useEffect(() => {
    if (heroClass && activePage > 0) {
      search(form.values);
    }
  }, [activePage, heroClass, mode, searchCard]);
  return (
    <>
      <Head>
        <title>Decks</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container size="xl">
        <Card withBorder>
          <Card.Section withBorder={true} inheritPadding py="xs">
            <Text align={"center"} weight={500}>
              Review pictures
            </Text>
          </Card.Section>
          <Card.Section withBorder={true} inheritPadding py="xs">
            <SearchCardForm
              searchCallback={search}
              metadata={metadata}
              form={form}
              setPage={setPage}
            />
          </Card.Section>
          <Card.Section p="xs">
            <Grid>
              <Col span={9}>
                <Card withBorder>
                  <Card.Section withBorder={true}>
                    <Text align={"center"} weight={500} py="xs">
                      Cards - Neutral and {hsClass?.name}
                    </Text>
                  </Card.Section>
                  <Card.Section
                    sx={{ overflowY: "auto", overflowX: "hidden", height: 600 }}
                    py="xs"
                    px="xs"
                  >
                    <CardList
                      deckCards={deckCards}
                      setDeckCards={setDeckCards}
                      cards={cards}
                    />
                  </Card.Section>
                  <Card.Section withBorder={true}>
                    <Center py="md">
                      <Pagination
                        page={activePage}
                        onChange={(nb) => {
                          setPage(nb);
                        }}
                        total={Math.ceil(cardCount / nbPerPage)}
                        radius="md"
                      />
                    </Center>
                  </Card.Section>
                </Card>
              </Col>
              <Col span={3}>
                <Card withBorder={true}>
                  <Card.Section withBorder={true}>
                    <Text align={"center"} weight={500} py="xs">
                      Deck - ({deckCards.length} / 30)
                    </Text>
                  </Card.Section>
                  <Card.Section
                    sx={{ overflowY: "auto", height: 600 }}
                    py="xs"
                    px="xs"
                  >
                    <HsCardStack
                      setDeckCards={setDeckCards}
                      deckCards={deckCards}
                    />
                  </Card.Section>
                  <Card.Section withBorder={true} px={"sm"} py={"sm"}>
                    <TextInput
                      onChange={() => {}}
                      my={"sm"}
                      placeholder="deckCode"
                      value={code}
                      contentEditable={false}
                    />
                    <Button
                      onClick={async () => {
                        const response = await getDeckCode(deckCards, hsClass);
                        setCode(response?.data?.code);
                      }}
                      mr={"sm"}
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan" }}
                    >
                      Encode
                    </Button>
                  </Card.Section>
                </Card>
              </Col>
            </Grid>
          </Card.Section>
        </Card>
      </Container>
    </>
  );
};

NewDeck.getInitialProps = () => {
  return fetch("http://localhost:8000/api/hearthstone/metadata").then((res) =>
    res.json()
  );
};

export default NewDeck;
