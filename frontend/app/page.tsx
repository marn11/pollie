import Image from "next/image";
import Link from "next/link";
import { HatGlasses, CircleDot } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SocialProof from "./components/SocialProof";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen text-text w-full">
        {/* <header className="py-6"> */}
        <nav className="p-6 sticky top-0 backdrop-blur-sm flex items-center justify-around border-b border-border/30">
          <Link href={"/"}>
            <div className="flex gap-2 items-center">
              <Image src={"/Logo.svg"} width={38} height={38} alt="logo" />
              <span className="text-2xl font-semibold text-text">Pollie</span>
            </div>
          </Link>
          <Link href={"/dashboard"}>
            <button
              className="bg-primary cursor-pointer text-black font-semibold px-5 py-3 rounded-xl 
              shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              Go to dashboard
            </button>
          </Link>
        </nav>
        {/* </header> */}

        <main className="flex flex-col items-center flex-1 w-full text-text">
          <h1 className="mt-10 mb-4 text-6xl/18  text-center font-semibold max-w-4xl">
            <span className="text-primary font-bold">Pollie,</span> where the
            best <br />
            <span className="text-primary font-bold"> Polls </span>
            are created!
          </h1>
          <p className="text-lg/5 text-text/70 max-w-2xl text-center mb-5">
            Create anonymous or public polls and allow everyone <br />
            to vote on them in seconds.
          </p>
          <div className="flex gap-2">
            <Link href={"/dashboard"}>
              <button
                className="hover:bg-primary/80 bg-primary text-bg-dark cursor-pointer font-semibold p-2 px-4
              inset-shadow-sm inset-shadow-border
              rounded-2xl hover:-translate-y-1 transition-all ease-in-out"
              >
                Try it now
              </button>
            </Link>
            <Link href={"https://en.wikipedia.org/wiki/Poll"} target="blank">
              <button
                className="border border-border rounded-2xl text-text p-2 px-4 text-sm
                font-semibold cursor-pointer
                shadow-sm shadow-black hover:-translate-y-1 transition-all ease-in-out"
              >
                Learn more
              </button>
            </Link>
          </div>
          <Image
            src={"/hero.jpg"}
            width={760}
            height={420}
            className="mt-10 rounded-3xl shadow-2xl border"
            alt="Pollie preview"
          />
          {/* <AnimatePresence></AnimatePresence> */}
          <section className="flex flex-col gap-3 items-center my-5">
            <h2 className="text-primary font-bold text-5xl mb-5">Features:</h2>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 border rounded-xl border-border/30 bg-bg-dark p-4 hover:-translate-y-0.5 transition ease-in-out">
                <HatGlasses size={224} color="#e3fb3e" />
                <div className="flex flex-col max-w-50">
                  <h4 className="text-primary text-xl font-medium h-9">Anonymous Polls:</h4>
                  <p className="h-50 ">We guarantee you at Pollie that if you create an anonymous poll, no one (not even the admins) will know that that poll was created by you.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 border rounded-xl border-border/30 bg-bg-dark p-4 hover:-translate-y-0.5 transition ease-in-out">
                <CircleDot size={224} color="#e3fb3e" />
                <div className="flex flex-col max-w-50">
                  <h4 className="text-primary text-xl font-medium h-9">One vote per user:</h4>
                  <p className="h-50">To ensure a fair voting process, and to ensure that the results are not falsified, we only allow each user one vote per poll.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 border rounded-xl border-border/30 bg-bg-dark p-4 hover:-translate-y-0.5 transition ease-in-out">
                <Image
                  src={"/anon.svg"}
                  width={224}
                  height={224}
                  alt="anonymous voting"
                />
                <div className="flex flex-col max-w-50">
                  <h4 className="text-primary text-xl font-medium h-9">Anonymous votes:</h4>
                  <p className="h-50">At Pollie we care about privacy, so if you decide to vote anonymously, we can assure you that no one will find out what was your vote.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col my-5 py-4 px-10 gap-4 border items-center rounded-xl border-border/30 bg-bg-dark">
          <SocialProof/>
            <h3 className="text-5xl/15 font-medium text-center">They loved it. <br /> Why not you?</h3>
            <Link href={"/dashboard"}>
            <button
              className="hover:bg-primary/80 w-fit bg-primary text-bg-dark cursor-pointer font-semibold p-2 px-4
              inset-shadow-sm inset-shadow-border
              rounded-2xl hover:-translate-y-1 transition-all ease-in-out"
            >
              Start now!
            </button>
            </Link>
          </section>
        </main>

        <footer className="w-full border-t border-border/30 mt-2 backdrop-blur py-6">
          <div className="w-11/12 max-w-6xl mx-auto flex items-center justify-between text-sm">
            <span>Pollie — Technical assessment project.</span>
            <span>
              <Link
                href={"https://www.linkedin.com/in/marin-benchellal/"}
                target="blank"
              >
                Made by Marin Benchellal
              </Link>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
