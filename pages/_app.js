import { Provider } from "next-auth/react";

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
        <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
