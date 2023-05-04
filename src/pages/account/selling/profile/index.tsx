import type { Store } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";

import AccountHeader from "~/components/Account/AccountHeader";
import AddStore from "~/components/Account/Store/AddStore";
import EditStore from "~/components/Account/Store/EditStore";

import Spinner from "~/components/Spinner";

import Navbar from "~/components/Navbar";

import { api } from "~/utils/api";

const Profile: NextPage = () => {
  const store = api.store.getStore.useQuery();
  const storeData = store.data as Store;

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
      <main className="flex   w-full flex-col">
        <div className="px-6 py-6">
          <h1 className="text-2xl font-bold">My Account</h1>
        </div>
        <AccountHeader />

        {store.isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="mt-4 px-6">
            {store.data ? (
              <EditStore
                name={storeData.name}
                description={storeData.description}
                industry={storeData.industry}
              />
            ) : (
              <AddStore />
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Profile;
