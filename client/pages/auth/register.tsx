import type { NextPage } from "next";
import {
  Button,
  Container,
  Stepper,
  Group,
  Card,
  Center,
  TextInput,
  Grid,
  PasswordInput,
  Col,
  Text,
  Alert,
} from "@mantine/core";
import { useEffect, useState } from "react";
import OtpInput from "react18-input-otp";
import axios, { AxiosError } from "axios";
import { useForm, UseFormReturnType } from "@mantine/form";
import Link from "next/link";
import { RegisterFormType } from "../../types/form.types";
import { useRouter } from "next/router";
import { IconAlertCircle } from "@tabler/icons";
import { ApiService } from "../../services/api.service";
import { customStyles } from "../../themes/styles";

const Register: NextPage = () => {
  const router = useRouter();
  const { verify, email } = router.query;
  const [active, setActive] = useState(0);
  const [code, setCode] = useState("");
  const [csrf, setCsrf] = useState("");
  const [error, setError] = useState("");
  const { classes, cx } = customStyles();
  const [registerForm, setRegisterForm] =
    useState<UseFormReturnType<RegisterFormType>>();
  const handleChange = (code: string) => setCode(code);
  const nextStep = () =>
    setActive((current: number) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current: number) => (current > 0 ? current - 1 : current));
  useEffect(() => {
    if (verify && email) {
      setActive(1);
      sendAnotherMailCode();
    }
  }, []);

  const sendAnotherMailCode = () => {
    axios
      .post(ApiService.BASE_URL + ApiService.POST_SEND_NEW_CODE, {
        email: email,
      })
      .then(() => {});
  };

  function sendCode() {
    axios
      .post(
        ApiService.BASE_URL + ApiService.POST_VERIFY_CODE,
        {
          email: email && verify ? email : registerForm?.values.email,
          code,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        nextStep();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <Container>
        <Card
          radius={25}
          className={classes.themeBackgroundColor}
          px="md"
          sx={{ minHeight: 500 }}
        >
          <Card.Section p="md" withBorder>
            <Stepper active={active}>
              <Stepper.Step label="Create Account" description="" />
              <Stepper.Step label="Verify" description="" />
              <Stepper.Step label="Completed" description="" />
            </Stepper>
          </Card.Section>
          <Card.Section py={20} px={20}>
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
            {active === 1 ? (
              <>
                <Center mt="md">
                  <Text align={"center"}>
                    A code has been sent to your inbox. Please enter it to
                    continue your registration
                  </Text>
                </Center>
                <Center mt="md">
                  <CodeInput
                    code={code}
                    handleChange={handleChange}
                  ></CodeInput>
                </Center>
                <Center mt="md">
                  <Text>
                    Code non reçu ?{" "}
                    <Link href={""}>
                      <a style={{ color: "slateblue" }}>
                        Envoyer un nouveau code
                      </a>
                    </Link>
                  </Text>
                </Center>
              </>
            ) : active === 0 ? (
              <Grid>
                <Col span={10} offset={1} sm={6} offsetSm={3}>
                  <RegisterForm
                    csrf={csrf}
                    setErrorCallback={setError}
                    setForm={setRegisterForm}
                    nextStep={nextStep}
                  />
                </Col>
              </Grid>
            ) : (
              <></>
            )}
          </Card.Section>
          <Group position={"center"}>
            <Group style={{ position: "absolute", bottom: 15 }}>
              <Button
                disabled={!!(email && verify)}
                variant="default"
                onClick={prevStep}
              >
                Back
              </Button>
              {active === 0 && (
                <Button type={"submit"} form={"register"}>
                  Next step
                </Button>
              )}
              {active !== 0 && (
                <Button onClick={active === 1 ? sendCode : nextStep}>
                  Next step
                </Button>
              )}
            </Group>
          </Group>
        </Card>
      </Container>
    </>
  );
};

export const CodeInput = (
  { code, handleChange }: any,
  props: { size: number }
) => {
  return (
    <>
      <OtpInput
        value={code}
        onChange={handleChange}
        numInputs={6}
        separator={<span style={{ width: "8px" }}></span>}
        isInputNum={true}
        shouldAutoFocus={true}
        inputStyle={{
          border: "1px solid transparent",
          backgroundColor: "gray",
          borderRadius: "8px",
          width: "50px",
          height: "50px",
          fontSize: "14px",
          color: "#000",
          fontWeight: "400",
        }}
        focusStyle={{
          border: "1px solid #CFD3DB",
          outline: "none",
        }}
      />
    </>
  );
};

export const RegisterForm = ({
  setForm,
  csrf,
  nextStep,
  setErrorCallback,
}: {
  setForm: Function;
  csrf: string;
  nextStep?: Function;
  setErrorCallback: Function;
}) => {
  const form = useForm<RegisterFormType>({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function registerRequest(values: RegisterFormType) {
    axios
      .post(
        ApiService.BASE_URL + ApiService.POST_REGISTER,
        {
          ...values,
        },
        {
          withCredentials: true,
          headers: {
            "CSRF-Token": csrf,
          },
        }
      )
      .then((r) => {
        if (nextStep) nextStep();
        setErrorCallback("");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        if (err.code) {
          setErrorCallback(err.response?.data);
        }
      });
  }

  return (
    <>
      <form
        id={"register"}
        onSubmit={form.onSubmit(async (values) => {
          await registerRequest(values);
        })}
      >
        <TextInput
          placeholder="email"
          label="Email"
          {...form.getInputProps("email")}
          required
        />
        <TextInput
          placeholder="username"
          label="Username"
          {...form.getInputProps("username")}
          required
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          {...form.getInputProps("password")}
          required
        />
        <PasswordInput
          placeholder="Password"
          label="Confirm Password"
          {...form.getInputProps("confirmPassword")}
          required
        />
      </form>
    </>
  );
};

export default Register;
