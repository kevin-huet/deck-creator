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
  Modal,
  Group,
  ColorScheme,
  Switch,
  useMantineTheme,
} from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {
  forwardRef,
  MutableRefObject,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { CardType, hsClassType } from "../../../types/hearthstone.types";
import {
  createDeck,
  getDeckCode,
} from "../../../services/hearthstone/deck.service";
import { SearchCardForm } from "../../../components/hearthstone/SearchCardForm";
import { HsCardStack } from "../../../components/hearthstone/HsCardStack";
import { CardList } from "../../../components/hearthstone/CardList";
import { searchCard } from "../../../services/hearthstone/card.service";
import { customStyles } from "../../../themes/styles";
import { AuthContext } from "../../../lib/providers/auth.provider";
import { useForm } from "@mantine/form";

const Deck: NextPage = ({ deck }: any) => {
  const { auth } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [nbPerPage, setNbPerPage] = useState(36);
  const [gameMode, setGameMode] = useState<string>("");
  const [hsClass, setHsClass] = useState<string>("");
  const modalRef = useRef<{ toggleOpenModal: Function }>(null);
  const [deckCards, setDeckCards] = useState<CardType[]>([]);
  const [activePage, setPage] = useState(1);
  const { classes, cx } = customStyles();
  const [lastSearchValues, setLastSearchValues] = useState({});
  const search = (values: any, resetPage?: boolean) => {
    if (resetPage) setPage(1);
    searchCard({
      ...values,
      cardClass: hsClass,
      activePage,
      setGroup: gameMode,
    }).then((res) => {
      setCards(res.data?.cards);
      setCardCount(res.data?.count);
      setLastSearchValues(values);
    });
  };
  useEffect(() => {
    console.log(deck);
    setDeckCards(deck.cards);
  }, []);
  return (
    <>
      <Head>
        <title>Deck - {deck.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container size="xl">
        <Card className={classes.themeBackgroundColor} radius={25}>
          <Card.Section withBorder={true} inheritPadding py="xs">
            <Text align={"center"} weight={500}>
              Deck - {deck.name}
            </Text>
          </Card.Section>
          <Card.Section withBorder={true} inheritPadding py="xs"></Card.Section>
          <Card.Section p="xs">
            <Grid>
              <Col span={9}>
                <Card radius={25} withBorder>
                  <Card.Section withBorder={true}>
                    <Text align={"center"} weight={500} py="xs">
                      Cards - Neutral and {hsClass}
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
                <Card radius={25} withBorder={true}>
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
                        getDeckCode(deckCards, hsClass).then((response) =>
                          setCode(response?.data?.code)
                        );
                      }}
                      mr={"sm"}
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan" }}
                    >
                      Encode
                    </Button>
                    {auth.isLogged ? (
                      <Button
                        onClick={() => modalRef?.current?.toggleOpenModal()}
                      >
                        Create Deck
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Card.Section>
                </Card>
              </Col>
            </Grid>
          </Card.Section>
        </Card>
        <CreateDeckModal
          cards={deckCards}
          heroClass={hsClass}
          modeSlug={gameMode}
          ref={modalRef}
        ></CreateDeckModal>
      </Container>
    </>
  );
};

const CreateDeckModal = forwardRef(
  (props: { cards: CardType[]; heroClass: string; modeSlug: string }, ref) => {
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
    const form = useForm({
      initialValues: {
        name: "",
        description: "",
        isPublic: true,
      },
    });
    useImperativeHandle(ref, () => ({
      toggleOpenModal() {
        setOpened((value) => !value);
      },
    }));
    return (
      <>
        <Modal
          opened={opened}
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[7]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          centered
          onClose={() => setOpened(false)}
          title="Create Deck"
        >
          <form
            onSubmit={form.onSubmit(async () => {
              createDeck(
                props.cards,
                props.heroClass,
                props.modeSlug,
                form.values
              ).then((r) => setOpened(false));
            })}
          >
            <TextInput
              label={"Deck name"}
              {...form.getInputProps("name")}
            ></TextInput>
            <TextInput
              label={"Description"}
              {...form.getInputProps("description")}
            ></TextInput>

            <Switch
              {...form.getInputProps("isPublic")}
              onChange={() => {}}
              onLabel="Public"
              offLabel="Private"
              size={"lg"}
            />
            <Button type={"submit"}>Save</Button>
          </form>
        </Modal>
      </>
    );
  }
);

Deck.getInitialProps = ({ query }) => {
  return fetch(`http://localhost:8000/api/hearthstone/deck/${query.pid}`).then(
    (res) => res.json()
  );
};

export default Deck;
