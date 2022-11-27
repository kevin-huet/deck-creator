import type { NextPage } from "next";
import {
  Card,
  Center,
  Container,
  Grid,
  Switch,
  Text,
  useMantineColorScheme,
  Transition,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Head from "next/head";
import React, { useState } from "react";
import { hsClassType } from "../types/hearthstone.types";
import Link from "next/link";
import { customStyles } from "../themes/styles";
import { useToggle } from "@mantine/hooks";

const Home: NextPage = (data: any) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [checked, setChecked] = useState(true);
  const [opened, openedToggle] = useToggle([true, false]);
  const elements = data?.classes?.map((e: hsClassType) => {
    console.log(e);
    if (e.slug !== "neutral") return classElement(e, checked, colorScheme);
  });
  const { classes, cx } = customStyles();
  const scaleY = {
    in: { transform: "scaleY(1)" },
    out: { transform: "scaleY(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform",
  };
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container size="lg">
        <Card
          className={`${classes.themeBackgroundColor} container-overlay`}
          radius={25}
        >
          <>
            <Card.Section withBorder inheritPadding py="md">
              <Center>
                <Text className={classes.textColor} weight={500}>
                  Hero Selection
                </Text>
              </Center>
            </Card.Section>
            <Card.Section py={"md"} px={"lg"}>
              <Grid>{elements}</Grid>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
              <Center>
                <Switch
                  onChange={(event) => setChecked(event.currentTarget.checked)}
                  checked={checked}
                  onLabel="Standard"
                  offLabel="Wild"
                  size={"lg"}
                />
              </Center>
            </Card.Section>
          </>
          <Transition
            mounted={opened}
            transition={scaleY}
            duration={600}
            timingFunction="ease"
          >
            {(styles) => (
              <div
                onClick={() => openedToggle()}
                style={{
                  ...styles,
                  maskImage: "./",
                  float: "left",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  zIndex: 1000,
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "red",
                }}
              >
                <Center
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Title
                    style={{ position: "relative", bottom: "5%" }}
                    order={2}
                  >
                    Click here to start creating the deck
                  </Title>
                </Center>
                <svg
                  id="visual"
                  viewBox="0 0 960 540"
                  style={{ minHeight: "100%" }}
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                >
                  <rect
                    x="0"
                    y="0"
                    width="960"
                    height="540"
                    fill="#25262b"
                  ></rect>
                  <defs>
                    <linearGradient
                      id="grad1_0"
                      x1="43.8%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="14.444444444444446%"
                        stop-color="#715df2"
                        stop-opacity="1"
                      ></stop>
                      <stop
                        offset="85.55555555555554%"
                        stop-color="#715df2"
                        stop-opacity="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <defs>
                    <linearGradient
                      id="grad1_1"
                      x1="43.8%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="14.444444444444446%"
                        stop-color="#715df2"
                        stop-opacity="1"
                      ></stop>
                      <stop
                        offset="85.55555555555554%"
                        stop-color="#3a468d"
                        stop-opacity="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <defs>
                    <linearGradient
                      id="grad1_2"
                      x1="43.8%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="14.444444444444446%"
                        stop-color="#25262b"
                        stop-opacity="1"
                      ></stop>
                      <stop
                        offset="85.55555555555554%"
                        stop-color="#3a468d"
                        stop-opacity="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <defs>
                    <linearGradient
                      id="grad2_0"
                      x1="0%"
                      y1="0%"
                      x2="56.3%"
                      y2="100%"
                    >
                      <stop
                        offset="14.444444444444446%"
                        stop-color="#715df2"
                        stop-opacity="1"
                      ></stop>
                      <stop
                        offset="85.55555555555554%"
                        stop-color="#715df2"
                        stop-opacity="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <defs>
                    <linearGradient
                      id="grad2_1"
                      x1="0%"
                      y1="0%"
                      x2="56.3%"
                      y2="100%"
                    >
                      <stop
                        offset="14.444444444444446%"
                        stop-color="#3a468d"
                        stop-opacity="1"
                      ></stop>
                      <stop
                        offset="85.55555555555554%"
                        stop-color="#715df2"
                        stop-opacity="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <defs>
                    <linearGradient
                      id="grad2_2"
                      x1="0%"
                      y1="0%"
                      x2="56.3%"
                      y2="100%"
                    >
                      <stop
                        offset="14.444444444444446%"
                        stop-color="#3a468d"
                        stop-opacity="1"
                      ></stop>
                      <stop
                        offset="85.55555555555554%"
                        stop-color="#25262b"
                        stop-opacity="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <g transform="translate(960, 0)">
                    <path
                      d="M0 459C-54.7 444.9 -109.3 430.8 -171.1 413C-232.8 395.1 -301.7 373.6 -324.6 324.6C-347.4 275.6 -324.3 199.1 -339.1 140.4C-353.8 81.8 -406.4 40.9 -459 0L0 0Z"
                      fill="#2e365b"
                    ></path>
                    <path
                      d="M0 306C-36.4 296.6 -72.9 287.2 -114 275.3C-155.2 263.4 -201.1 249 -216.4 216.4C-231.6 183.7 -216.2 132.7 -226 93.6C-235.9 54.5 -270.9 27.3 -306 0L0 0Z"
                      fill="#4f53c0"
                    ></path>
                    <path
                      d="M0 153C-18.2 148.3 -36.4 143.6 -57 137.7C-77.6 131.7 -100.6 124.5 -108.2 108.2C-115.8 91.9 -108.1 66.4 -113 46.8C-117.9 27.3 -135.5 13.6 -153 0L0 0Z"
                      fill="#715df2"
                    ></path>
                  </g>
                  <g transform="translate(0, 540)">
                    <path
                      d="M0 -459C57.5 -450.2 115.1 -441.4 174.9 -422.2C234.7 -403 296.9 -373.5 324.6 -324.6C352.3 -275.6 345.5 -207.3 362.2 -150C378.8 -92.7 418.9 -46.3 459 0L0 0Z"
                      fill="#2e365b"
                    ></path>
                    <path
                      d="M0 -306C38.4 -300.1 76.7 -294.3 116.6 -281.5C156.5 -268.7 197.9 -249 216.4 -216.4C234.8 -183.8 230.3 -138.2 241.4 -100C252.5 -61.8 279.3 -30.9 306 0L0 0Z"
                      fill="#4f53c0"
                    ></path>
                    <path
                      d="M0 -153C19.2 -150.1 38.4 -147.1 58.3 -140.7C78.2 -134.3 99 -124.5 108.2 -108.2C117.4 -91.9 115.2 -69.1 120.7 -50C126.3 -30.9 139.6 -15.4 153 0L0 0Z"
                      fill="#715df2"
                    ></path>
                  </g>
                </svg>
              </div>
            )}
          </Transition>
        </Card>
      </Container>
    </>
  );
};

const classElement = (
  hsClass: hsClassType,
  checked: boolean,
  colorScheme: any
) => {
  const { classes, cx } = customStyles();
  return (
    <Grid.Col
      span={6}
      xs={4}
      sm={4}
      md={3}
      lg={3}
      key={hsClass.id}
      className={"hvr-grow"}
      p={"md"}
    >
      <Link
        href={`/decks/new/${hsClass.slug}?mode=${
          checked ? "standard" : "wild"
        }`}
        className={"hvr-grow"}
      >
        <a>
          <div style={{ position: "relative" }}>
            <Image
              style={{ borderRadius: "20px" }}
              src={`/images/hearthstone/classes/${hsClass.slug}.webp`}
              layout={"responsive"}
              width={"200"}
              height={"100%"}
              alt="Norway"
              className={colorScheme !== "dark" ? "shadow-2" : "shadow"}
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
              {hsClass.name}
            </div>
          </div>
        </a>
      </Link>
    </Grid.Col>
  );
};

Home.getInitialProps = async () => {
  const res = await fetch("http://localhost:8000/api/hearthstone/classes");

  if (!res.ok) return { classes: [] };
  return await res.json();
};

export default Home;
