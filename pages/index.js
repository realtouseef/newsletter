import { useState } from "react";
import Head from "next/head";
import Paper from "/public/paper-plane.svg";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Home() {
  const [sendEmail, setSendEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const emailRef = collection(db, "emails");

  async function handleSubmit(e) {
    e.preventDefault();

    setSubscribing(true);
    await addDoc(emailRef, { email: sendEmail });
    setSuccessMessage(true);
    setSubscribing(false);

    setTimeout(() => {
      setSuccessMessage(false);
      setSendEmail("");
    }, 7000);
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
        id="form"
        onSubmit={handleSubmit}
        className="grid place-content-center h-screen"
      >
        <center className="flex items-center justify-center">
          <input
            onChange={(e) => setSendEmail(e.currentTarget.value)}
            type="email"
            value={sendEmail}
            placeholder="joe@joe.com"
            className="w-44 px-4 py-2 rounded-l-md focus:outline-none"
            required
          />
          <button
            disabled={subscribing}
            className={`${
              subscribing && "bg-violet-900 cursor-not-allowed"
            } h-10 bg-violet-500 hover:bg-violet-700  pr-2 py-1 rounded-r-md`}
          >
            <Paper className="ml-2 w-6 h-6" />
          </button>
        </center>
        <small className="mt-1 text-white">
          {successMessage && "Thank you for subscribing"}
        </small>
      </form>
    </>
  );
}
