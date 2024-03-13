import {
  LoginForm,
  LoginMainFooterBandItem,
  LoginPage,
} from '@patternfly/react-core';
import { NextPage } from 'next';
import Head from 'next/head.js';
import { useState } from 'react';
import { useRouter } from 'next/router.js';

import { submitForm } from '../src/view/ui/utils.js';
import Link from 'next/link.js';

const Page: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidUsername, setValidUsername] = useState(true);
  const [isValidPassword, setValidPassword] = useState(true);
  const router = useRouter();
  const submit = submitForm(router);
  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <LoginPage
        loginTitle="Log in"
        signUpForAccountMessage={
          <LoginMainFooterBandItem>
            Need an account? <Link href="/sign-up">Sign up.</Link>
          </LoginMainFooterBandItem>
        }
        style={{
          backgroundColor: 'var(--pf-v5-global--BackgroundColor--dark-100)',
        }}
      >
        <LoginForm
          method="POST"
          usernameLabel="Email"
          usernameValue={username}
          passwordValue={password}
          onChangeUsername={(_, u) => {
            setValidUsername(true);
            setValidPassword(true);
            setUsername(u);
          }}
          onChangePassword={(_, p) => {
            setValidUsername(true);
            setValidPassword(true);
            setPassword(p);
          }}
          isValidUsername={isValidUsername}
          isValidPassword={isValidPassword}
          onSubmit={async (e) => {
            const form = e.currentTarget;
            const usernameField = form.elements.namedItem(
              'pf-login-username-id',
            ) as HTMLInputElement;
            const passwordField = form.elements.namedItem(
              'pf-login-password-id',
            ) as HTMLInputElement;
            if (usernameField) usernameField.name = 'email';
            if (passwordField) passwordField.name = 'password';
            const url = await submit(e);
            if (url == `${location.origin}${router.pathname}`) {
              setValidUsername(false);
              setValidPassword(false);
            }
          }}
        />
      </LoginPage>
    </>
  );
};

export default Page;
