import { useState } from "react";
import Head from "next/head";
import Paper from "/public/paper-plane.svg";

export default function Home() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(email);
  }

  return (
    <>
      <Head>
        <title>Newsletter w/ Firebase as Backend</title>
        <meta
          name="description"
          content="Newsletter w/ Firebase as Backend made by @realtouseef on github"
        />
      </Head>
      <form
        onSubmit={handleSubmit}
        className="grid place-content-center h-screen"
      >
        <center className="flex items-center justify-center">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="joe@joe.com"
            className="w-44 px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button className="h-10 bg-violet-500 hover:bg-violet-700  pr-2 py-1 rounded-r-md">
            <Paper className="ml-2 w-6 h-6" />
          </button>
        </center>
      </form>
    </>
  );
}
