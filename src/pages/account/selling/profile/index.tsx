import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import AccountHeader from "~/components/Account/AccountHeader";

import Navbar from "~/components/Navbar";
import Search from "~/components/Search";

const Profile: NextPage = () => {
  const [storeName, setStoreName] = useState<string>("");
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

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
          <div className="grid grid-cols-2 gap-10">
            <div className="w-full">
              <div className="flex flex-col space-y-1">
                <h2 className="text-xl font-medium">Create Store</h2>
                <p className="text-sm text-slate-400">
                  Enter the store name and press enter
                </p>
              </div>
              <form className="mt-6">
                <div className="mb-4">
                  <label className="text-sm text-slate-400">Store Name</label>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
                    placeholder="Store Name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>
                <button className="mt-4 rounded-md bg-black py-1 px-6 text-white">
                  Create
                </button>
              </form>
            </div>
            <div className="flex flex-col">
              <div>
                <h2 className="txet-xl font-medium">Terms and Conditions</h2>
                <p className="text-sm text-slate-400">
                  Please read the terms and conditions carefully before creating
                  a store.
                </p>
              </div>
              <div className="mt-12 max-w-xl">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  voluptatum, quibusdam, voluptate, quia voluptas quod
                  exercitationem quos voluptatibus quas quidem dolorum. Quisquam
                  voluptatum, quibusdam, voluptate, quia voluptas quod
                  exercitationem quos voluptatibus quas quidem dolorum. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit.
                  <br></br>
                  voluptatum, quibusdam, voluptate, quia voluptas quod
                  exercitationem quos voluptatibus quas quidem dolorum. Quisquam
                  voluptatum, quibusdam, voluptate, quia voluptas quod
                  exercitationem quos voluptatibus quas quidem dolorum.
                </p>
                <p className="mt-4 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  voluptatum, quibusdam, voluptate, quia voluptas quod
                  exercitationem quos voluptatibus quas quidem dolorum. Quisquam
                  voluptatum, quibusdam, voluptate, quia voluptas quod
                  exercitationem quos voluptatibus quas quidem dolorum. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit.
                  exercitationem quos voluptatibus quas quidem dolorum.
                </p>
                <div className="mt-6 flex items-center ">
                  <input
                    name="default-checkbox"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600  focus:ring-0"
                    checked={isTermsAccepted}
                    onChange={() => setIsTermsAccepted(!isTermsAccepted)}
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-400"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
