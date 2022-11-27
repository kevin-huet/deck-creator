import type { NextPage } from "next";
import {
  Button,
  Container,
  Card,
  Text,
  TextInput,
  PasswordInput,
  Grid,
  Col,
  Center,
  Alert,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import ReCAPTCHA, { ReCAPTCHAProps } from "react-google-recaptcha";
import {
  IconAlertCircle,
  IconArrowAutofitWidth,
  IconSwitchHorizontal,
} from "@tabler/icons";
import {
  createRef,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../lib/providers/auth.provider";
import { ApiService } from "../../services/api.service";
import { customStyles } from "../../themes/styles";

const Login: NextPage = () => {
  const router = useRouter();
  const { auth, setAuth, login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const { classes, cx } = customStyles();
  const socials = [
    { name: "Google", href: "http://localhost:8000/auth/social/google" },
    {
      name: "Discord",
      href: "https://discord.com/api/oauth2/authorize?client_id=909446763650383933&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify",
    },
    { name: "Twitter", href: "http://localhost:3000/auth/test" },
  ];
  const sendLogin = (values: any) => {
    console.log(values);
    axios
      .post(ApiService.BASE_URL + ApiService.POST_LOGIN, { ...values })
      .then((res) => {
        login(res.data);
      })
      .catch((e: AxiosError) => {
        console.log(e.response?.status);
        if (e.response?.status === 403) {
          router
            .push(`/auth/register?verify=true&email=${values.email}`)
            .then();
        }
        //setError(e.response?.data);
      });
  };
  useEffect(() => {
    if (auth.isLogged) {
      router.push("/").then();
    }
  }, [auth]);
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <Card radius={25} className={classes.themeBackgroundColor}>
          <Card.Section withBorder={true} inheritPadding py="xs">
            <Text align={"center"}>Login</Text>
          </Card.Section>
          <Card.Section m={"sm"}>
            {error ? (
              <Alert
                mb={20}
                icon={<IconAlertCircle size={16} />}
                title="Error"
                color="red"
              >
                {error}
              </Alert>
            ) : (
              <></>
            )}
            <Grid>
              <Col span={5}>
                <LoginForm loginCallback={sendLogin} />
              </Col>
              <Col span={2}>
                <Center style={{ height: 150 }}>
                  <IconSwitchHorizontal />
                </Center>
              </Col>
              <Col span={5}>
                <LoginSocial socials={socials} />
              </Col>
            </Grid>
          </Card.Section>
        </Card>
      </Container>
    </>
  );
};

const LoginSocial = ({ socials }: any) => {
  const { auth, setAuth, login } = useContext(AuthContext);
  useEffect(() => {}, []);
  return (
    <>
      <Grid>
        {socials.map((social: any) => (
          <Col key={social.name}>
            <a href={social.href}>
              <Button
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
              >
                {social.name}
              </Button>
            </a>
          </Col>
        ))}
      </Grid>
    </>
  );
};

const LoginForm = ({ loginCallback }: any) => {
  //const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      captcha: "",
    },
  });
  const { login } = useContext(AuthContext);
  const recaptchaRef = useRef<any>(null);
  return (
    <form
      onSubmit={form.onSubmit(async () => {
        loginCallback({
          ...form.values,
          captcha: await recaptchaRef.current?.execute(),
        });
        recaptchaRef.current?.reset();
      })}
    >
      <TextInput
        placeholder="email"
        label="Email"
        {...form.getInputProps("email")}
        required
      />
      <PasswordInput
        placeholder="Password"
        label="Password"
        {...form.getInputProps("password")}
        required
      />
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey="6LelcPkiAAAAAE8tD0hp5N5KJ2VOcGUak_tyGTkB"
      />
      <Button
        my={12}
        type="submit"
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
