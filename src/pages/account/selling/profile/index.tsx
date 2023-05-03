import { type NextPage } from "next";
import Head from "next/head";

import AccountHeader from "~/components/Account/AccountHeader";
import AddStore from "~/components/Account/Store/AddStore";
import EditStore from "~/components/Account/Store/EditStore";

import Navbar from "~/components/Navbar";

import { api } from "~/utils/api";

const Profile: NextPage = () => {
  const store = api.store.getStore.useQuery();

  if (store.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>Fleemark</title>
        <meta
          name="description"
          content="Ecommerce app created using Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex  w-full flex-col">
        <div className="px-6 py-6">
          <h1 className="text-2xl font-bold">My Account</h1>
        </div>
        <AccountHeader />

        <div className="mt-4 px-6">
          {store.data ? (
            <EditStore
              name={store.data.name}
              description={store.data.description}
              industry={store.data.industry}
            />
          ) : (
            <AddStore />
          )}
        </div>
      </main>
    </>
  );
};

export default Profile;
