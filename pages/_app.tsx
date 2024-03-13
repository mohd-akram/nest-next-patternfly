import '@patternfly/react-core/dist/styles/base.css';

function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  return <Component {...pageProps} />;
}

export default App;
