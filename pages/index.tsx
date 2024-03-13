import { Button, Form, LoginPage } from '@patternfly/react-core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { submitForm } from 'src/view/ui/utils';

export default () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <LoginPage loginTitle="Welcome to the application.">
        <Form method="POST" action="/logout" onSubmit={submitForm(router)}>
          <Button type="submit">Log out</Button>
        </Form>
      </LoginPage>
    </>
  );
};
