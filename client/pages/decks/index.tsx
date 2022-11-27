import type { NextPage } from "next";
import {
  Button,
  Card,
  Center,
  Col,
  Container,
  Grid,
  Pagination,
  Switch,
  Text,
} from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import Link from "next/link";
import Head from "next/head";
import { customStyles } from "../../themes/styles";
import { ApiService } from "../../services/api.service";
import React, { useEffect, useState } from "react";
import { Deck } from "../../types/hearthstone.types";
import Image from "next/image";
import { IconBorderAll, IconColumns, IconLayoutGrid } from "@tabler/icons";

const Decks: NextPage = (data: any) => {
  const { classes, cx } = customStyles();
  const [decks, setDecks] = useState<Array<{ deck: Deck; cost: number }>>();
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    fetch(ApiService.BASE_URL + ApiService.GET_DECKS + `?page=${activePage}`)
      .then((res) => res.json())
      .then((r) => {
        setDecks(r.decks);
      });
  }, [activePage]);
  const deckHtml = decks?.map((deck, index: number) => {
    console.log(deck);
    return (
      <Col span={2} key={index} className={"hvr-grow"}>
        <Link href={`/decks/${deck.deck.id}`}>
          <a>
            <div
              style={{ position: "relative" }}
              className={"container-overlay"}
            >
              <Image
                style={{ borderRadius: "20px" }}
                src={`/images/hearthstone/classes/${deck.deck.class.slug}.webp`}
                width={"200"}
                height={"100%"}
                alt="Norway"
              />
              <div
                style={{
                  borderRadius: "0px 0px 20px 20px",
                  float: "left",
                  position: "absolute",
                  bottom: 0,
                  zIndex: 1000,
                  width: "100%",
                  textAlign: "center",
                  color: "white",
                }}
                className={`${classes.primary} ${classes.shadow}`}
              >
                {deck.deck.name}
              </div>
              <div className={"overlay"}>
                <Text style={{ whiteSpace: "pre-line" }}>
                  {deck.deck.description}
                </Text>
              </div>
            </div>
          </a>
        </Link>
      </Col>
    );
  });
  console.log(deckHtml);
  return (
    <>
      <Head>
        <title>Deck</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container size="lg">
        <Card className={classes.themeBackgroundColor} radius={25}>
          <Card.Section withBorder inheritPadding py="md">
            <div style={{ position: "absolute", right: 10, marginRight: 10 }}>
              <ActionIcon style={{ float: "left" }}>
                <IconColumns size={32} />
              </ActionIcon>
              <ActionIcon style={{ float: "left", marginLeft: 10 }}>
                <IconBorderAll size={32} />
              </ActionIcon>
            </div>
            <Center>
              <Text className={classes.textColor} weight={500}>
                Decks list
              </Text>
            </Center>
          </Card.Section>
          <Card.Section py={"md"} px={"lg"}>
            <Grid>{deckHtml}</Grid>
          </Card.Section>
          <Card.Section withBorder inheritPadding py="xs">
            <Center>
              <Pagination
                page={activePage}
                onChange={(nb) => {
                  setActivePage(nb);
                }}
                total={10}
                //total={Math.ceil(cardCount / nbPerPage)}
                radius="md"
              />
            </Center>
          </Card.Section>
        </Card>
      </Container>
    </>
  );
};

Decks.getInitialProps = async () => {
  const res = await fetch("http://localhost:8000/api/hearthstone/classes");

  if (!res.ok) return { classes: [] };
  return await res.json();
};

export default Decks;
