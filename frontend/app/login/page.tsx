import Image from "next/image";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16">
        <Image src={"/logo.png"} width={64} height={64} alt="logo"></Image>
        <h1 className="font-bold text-3xl text-white m-2">Welcome Back!</h1>
        <h2 className="mb-6 text-white/60">
          click on "continue with google" to login to your account.
        </h2>
        <div
          className="border border-white/20 rounded-xl w-110
        shadow-xl/30 bg-white/10"
        >
          <div className="border-b border-white/20 rounded-xl bg-bg-dark/70">
            <div className="flex flex-col p-4 gap-2">
              <h3 className="font-semibold">Email address</h3>
              <div className="flex border p-2 rounded-xl gap-2 border-white/10">
                <Image
                  className="aspect-square object-contain mx-2"
                  src="envelope.svg"
                  width={20}
                  height={20}
                  alt="envelope icon"
                ></Image>
                <input
                  type="text"
                  className="focus:outline-none w-full placeholder:text-white/50"
                  placeholder="Soon"
                  disabled
                />
              </div>
              <button
                disabled
                className="px-4 py-2 bg-secondary rounded-xl 
              text-bg font-semibold cursor-pointer 
              transition-all ease-in-out  inset-shadow-sm inset-shadow-black/70"
              >
                Send magic link
              </button>
            </div>
            <div className="flex items-center px-4 my-1">
              <div
                className="flex-1 h-px bg-white/10
              bg-linear-to-r from-transparent via-white/10 to-transparent rounded"
              ></div>
              <h4 className="text-center mx-2 text-white/50 text-sm">
                OR CONTINUE WITH
              </h4>
              <div
                className="flex-1 h-px bg-white/10
              bg-linear-to-r from-transparent via-white/10 to-transparent rounded"
              ></div>
            </div>
            <div className="flex flex-col gap-2 my-1 p-4">
              <div
                className="flex text-bg-dark hover:bg-primary/80 bg-primary p-2 gap-2 justify-center rounded-xl cursor-pointer
              inset-shadow-sm inset-shadow-border font-semibold transition-all ease-in-out"
              >
                <Image
                  src="google.svg"
                  width={24}
                  height={24}
                  alt="google logo"
                ></Image>
                <button className="cursor-pointer">Continue with Google</button>
              </div>
            </div>
          </div>
          <div className="p-4 text-sm">
            <span className="text-center text-white/60">
              By clicking sign in, you agree to our{" "}
              <span className="underline cursor-pointer text-white transition ease-in-out">
                Terms of Service{" "}
              </span>
              and{" "}
              <span className="underline cursor-pointer text-white transition ease-in-out">
                Privacy Policy
              </span>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
