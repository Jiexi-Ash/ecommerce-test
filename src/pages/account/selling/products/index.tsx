import { type NextPage } from "next";
import Head from "next/head";

import AccountHeader from "~/components/Account/AccountHeader";
import Products from "~/components/Account/Store/Products/Products";

import Navbar from "~/components/Navbar";

const ProductsPage: NextPage = () => {
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

        <Products />
      </main>
    </>
  );
};

export default ProductsPage;
