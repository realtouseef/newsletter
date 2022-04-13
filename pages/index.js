import { useReducer } from "react";
import Head from "next/head";
import Paper from "/public/paper-plane.svg";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const initialState = {
  sendEmail: "",
  successMessage: false,
  subscribing: false,
};

function handleEmails(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.field]: action.value,
        sendEmail: action.value,
      };
    }

    case "successMessage": {
      return {
        ...state,
        successMessage: true,
      };
    }
    case "subscribing": {
      return {
        ...state,
        subscribing: true,
      };
    }
    case "setDefault": {
      return {
        ...state,
        sendEmail: "",
        subscribing: false,
        successMessage: false,
      };
    }
    default:
      throw new Error();
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(handleEmails, initialState);
  const { sendEmail, successMessage, subscribing } = state;
  const emailRef = collection(db, "emails");
  // second parameter in collection() comes from the firebase database where I have made the document called "emails"
  console.log(sendEmail);

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "subscribing" });

    await addDoc(emailRef, { email: sendEmail });

    dispatch({ type: "successMessage" });

    // dispatch({ type: ACTION.SEND_EMAILS });

    setTimeout(() => {
      dispatch({ type: "setDefault" });
    }, 3000);
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
            onChange={(e) =>
              dispatch({
                type: "field",
                value: e.target.value,
                field: "email",
              })
            }
            type="email"
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
