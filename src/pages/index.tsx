import { type NextPage } from "next";
import Head from "next/head";

import Navbar from "~/components/Navbar";
import Search from "~/components/Search";

import Products from "~/components/Product/Products";

const Home: NextPage = () => {
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
      <main className="flex min-h-screen w-full max-w-9xl flex-col">
        <Search />
        <div className="flex w-full py-4 px-6 xl:px-10"></div>
        <Products />
      </main>
    </>
  );
};

export default Home;
