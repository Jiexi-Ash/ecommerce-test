import { type NextPage } from "next";
import Head from "next/head";

import { SignUp } from "@clerk/nextjs";

const SignUpPage: NextPage = () => {
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
