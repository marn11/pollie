import Link from "next/link";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="text-text h-full flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-2xl font-semibold">Latest polls created:</h1>
          <Link href={"/polls/create"}>
            <button
              className="flex items-center gap-2
												border border-border shadow-sm shadow-black
																hover:bg-primary/80 bg-primary text-bg-dark cursor-pointer
															font-semibold p-2 px-4
              inset-shadow-sm inset-shadow-border
              rounded-2xl hover:-translate-y-1 transition-all ease-in-out"
            >
              <Plus color="#0b1610" strokeWidth={3} />
              <span className="font-semibold">New poll</span>
            </button>
          </Link>
        </div>
        <div className="flex gap-3 flex-wrap overflow-auto min-h-0 p-4 rounded-2xl flex-1 shadow-inner">

        </div>
      </div>
    </>
  );
}
