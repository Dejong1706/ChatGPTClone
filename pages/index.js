import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinSquint, faRobot } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const { isLoading, error, user } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>Chatty Pete - Login or Signup</title>
      </Head>
      <div className="flex min-h-screen w-full items-center justify-center bg-[url('/images/bg-4.jpg')] bg-cover text-center text-white">
        <div className="text-black">
          <div className="m-auto mt-24 w-48 rounded-sm bg-blue-600 p-4 shadow-md shadow-black/50">
            <FontAwesomeIcon
              icon={faRobot}
              className="text-6xl text-yellow-300"
            />
          </div>
          <h1 className="p-4 font-indie text-3xl font-bold">
            Welcome to chat GPT Clone(with Dejong1706)
          </h1>
          <p className="mt-2 font-indie text-2xl ">
            Log in with your account to continue
          </p>
          <div className="mt-4 flex justify-center gap-3">
            {!user && (
              <>
                <Link href="/api/auth/login" className="btn">
                  Login
                </Link>
                <Link href="/api/auth/signup" className="btn">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx.req, ctx.res);
  if (!!session) {
    return {
      redirect: {
        destination: "/chat",
      },
    };
  }

  return {
    props: {},
  };
};
