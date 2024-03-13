import {
  ActionGroup,
  Button,
  Form,
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  LoginMainFooterBandItem,
  LoginPage,
  TextInput,
} from '@patternfly/react-core';
import { NextPage } from 'next';
import Head from 'next/head.js';
import { useState } from 'react';
import { useRouter } from 'next/router.js';

import { submitForm } from '../src/view/ui/utils.js';
import Link from 'next/link.js';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

const Page: NextPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [disabled, setDisabled] = useState(false);

  const router = useRouter();
  const submit = submitForm(router, (pending) => {
    setDisabled(pending);
  });

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <LoginPage
        loginTitle="Sign Up"
        signUpForAccountMessage={
          <LoginMainFooterBandItem>
            Have an account? <Link href="/login">Sign in.</Link>
          </LoginMainFooterBandItem>
        }
        style={{
          backgroundColor: 'var(--pf-v5-global--BackgroundColor--dark-100)',
        }}
      >
        <Form
          method="POST"
          onSubmit={async (e) => {
            try {
              await submit(e);
            } catch (e) {
              const { cause } = e as {
                cause?: { email?: string; name?: string; password?: string };
              };
              if (cause) {
                setEmailError(cause.email);
                setNameError(cause.name);
                setPasswordError(cause.password);
              }
            }
          }}
        >
          <FormGroup label="Email" isRequired>
            <TextInput
              isRequired
              type="email"
              name="email"
              value={email}
              validated={emailError ? 'error' : 'default'}
              onChange={(_, email) => setEmail(email)}
            />
            {emailError && (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem
                    icon={<ExclamationCircleIcon />}
                    variant={'error'}
                  >
                    {emailError}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>
          <FormGroup label="Name" isRequired>
            <TextInput
              isRequired
              type="text"
              name="name"
              value={name}
              validated={nameError ? 'error' : 'default'}
              onChange={(_, name) => setName(name)}
            />
            {nameError && (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem
                    icon={<ExclamationCircleIcon />}
                    variant={'error'}
                  >
                    {nameError}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>
          <FormGroup label="Password" isRequired>
            <TextInput
              isRequired
              type="password"
              name="password"
              value={password}
              validated={passwordError ? 'error' : 'default'}
              onChange={(_, password) => setPassword(password)}
            />
            {passwordError && (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem
                    icon={<ExclamationCircleIcon />}
                    variant={'error'}
                  >
                    {passwordError}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>
          <ActionGroup>
            <Button
              variant="primary"
              type="submit"
              isBlock
              isDisabled={disabled}
            >
              Submit
            </Button>
          </ActionGroup>
        </Form>
      </LoginPage>
    </>
  );
};

export default Page;
