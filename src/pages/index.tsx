import { type NextPage } from "next";
import Head from "next/head";

import Navbar from "~/components/Navbar";
import Search from "~/components/Search";

// import { useUser, SignIn, SignOutButton } from "@clerk/nextjs";
// import { SignInButton } from "@clerk/nextjs";

import Products from "~/components/Product/Products";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const user = useUser();
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  // const { data } = api.products.getAll.useQuery();

  // const user = useUser();

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
      <main className="flex min-h-screen w-full flex-col">
        <Search />
        <div className="flex w-full py-4 px-6 xl:px-10"></div>
        <Products />
      </main>
    </>
  );
};

export default Home;
