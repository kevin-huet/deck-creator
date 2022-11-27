import type { NextPage } from "next";
import { Button, Card, Center, Container, Grid, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { customStyles } from "../../themes/styles";
import Head from "next/head";

const Admin: NextPage = () => {
  const { classes, cx } = customStyles();

  return (
    <>
      <Head>
        <title>Tuto</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container size="lg">
        <Card className={classes.themeBackgroundColor} radius={25}>
          <Card.Section withBorder inheritPadding py="md">
            <Center>
              <Text className={classes.textColor} weight={500}></Text>
            </Center>
          </Card.Section>
          <Card.Section py={"md"} px={"lg"}>
            <Grid>a</Grid>
          </Card.Section>
          <Card.Section withBorder inheritPadding py="xs"></Card.Section>
        </Card>
      </Container>
    </>
  );
};

export default Admin;
