import { type NextPage } from "next";
import Head from "next/head";

import Navbar from "~/components/Navbar";
import Search from "~/components/Search";

// import { useUser, SignIn, SignOutButton } from "@clerk/nextjs";
// import { SignInButton } from "@clerk/nextjs";

import Products from "~/components/Product/Products";

import { api } from "~/utils/api";
import { SignIn, SignUp } from "@clerk/nextjs";

const SignUpPage: NextPage = () => {
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

      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <SignUp
          path="/sign-up"
          afterSignInUrl="/"
          appearance={{
            layout: {
              logoPlacement: "inside",
            },
          }}
        />
      </main>
    </>
  );
};

export default SignUpPage;
