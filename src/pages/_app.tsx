import { type AppType } from "next/app";
import { Provider } from "react-redux";
import store from "~/store/store";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
