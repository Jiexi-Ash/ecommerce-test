import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import {
  Squares2X2Icon,
  ArchiveBoxIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

import { motion } from "framer-motion";
import SideNav from "~/components/admin/SideNav";
import AdminNav from "~/components/admin/AdminNav";

const Admin: NextPage = () => {
  // const user = useUser();
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  // const user = useUser();

  const MenuVariant = {
    hidden: { width: 0 },
    visible: {
      width: 300,
    },
  };

  const listItemVariant = {};

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminNav />
      <main className="flex min-h-screen w-full"></main>
    </>
  );
};

export default Admin;
