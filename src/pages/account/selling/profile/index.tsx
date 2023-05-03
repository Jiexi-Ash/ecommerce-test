import { type NextPage } from "next";
import Head from "next/head";

import Navbar from "~/components/Navbar";
import Search from "~/components/Search";

import Products from "~/components/Product/Products";

const Profile: NextPage = () => {
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
        <div className="flex h-full w-full">
          <div className="mt-6 px-6">
            <div className="">Your Account</div>
          </div>
        </div>
        <div></div>
      </main>
    </>
  );
};

export default Profile;
